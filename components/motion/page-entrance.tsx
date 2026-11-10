'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const active = useRef(false);

  useLayoutEffect(() => {
    active.current = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const element = overlay.current;
    if (!element || preference.matches) return;
    const animations = [...element.querySelectorAll<HTMLElement>('.transition-band')].map((band, index) => band.animate([
      { transform: `translateX(0) rotate(${index % 2 ? -5 : 5}deg)` },
      { transform: `translateX(${index % 2 ? '-120%' : '120%'}) rotate(${index % 2 ? -5 : 5}deg)` },
    ], { duration: 680, delay: index * 65, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'both' }));
    const cancel = () => animations.forEach((animation) => animation.cancel());
    const changed = () => { if (preference.matches) cancel(); };
    preference.addEventListener('change', changed);
    return () => { preference.removeEventListener('change', changed); cancel(); };
  }, [pathname]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const element = overlay.current;
    let disposed = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let animations: Animation[] = [];
    let destination: string | undefined;
    let generation = 0;
    const clear = () => {
      generation++;
      clearTimeout(timeout);
      animations.forEach((animation) => animation.cancel());
      animations = [];
      active.current = false;
      if (element) delete element.dataset.exiting;
    };
    const changed = () => {
      if (!preference.matches) return;
      const pending = destination;
      destination = undefined;
      clear();
      if (pending && !disposed) router.push(pending);
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || preference.matches) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || !element) return;
      event.preventDefault();
      event.stopPropagation();
      if (active.current) return;
      active.current = true;
      destination = `${url.pathname}${url.search}${url.hash}`;
      element.dataset.exiting = 'true';
      const thisGeneration = ++generation;
      animations = [...element.querySelectorAll<HTMLElement>('.transition-band')].map((band, index) => {
        band.getAnimations().forEach((animation) => animation.cancel());
        return band.animate([
          { transform: `translateX(${index % 2 ? '120%' : '-120%'}) rotate(${index % 2 ? -5 : 5}deg)` },
          { transform: `translateX(0) rotate(${index % 2 ? -5 : 5}deg)` },
        ], { duration: 380, delay: index * 55, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
      });
      Promise.all(animations.map((animation) => animation.finished)).then(() => {
        if (disposed || generation !== thisGeneration || !destination) return;
        const pending = destination;
        destination = undefined;
        router.push(pending);
        timeout = setTimeout(clear, 1800);
      }).catch(() => { if (!disposed && generation === thisGeneration) { destination = undefined; clear(); } });
    };
    document.addEventListener('click', click, true);
    preference.addEventListener('change', changed);
    return () => { disposed = true; destination = undefined; document.removeEventListener('click', click, true); preference.removeEventListener('change', changed); clear(); };
  }, [router, pathname]);

  return <div className="page-entrance"><div className="transition-bands" ref={overlay} aria-hidden="true"><div className="transition-band band-one"><span>THINK. BUILD. REPEAT.</span></div><div className="transition-band band-two"><span>CODE WITH PURPOSE.</span></div><div className="transition-band band-three"><span>SURJEET / DEVELOPER.</span></div></div>{children}</div>;
}
