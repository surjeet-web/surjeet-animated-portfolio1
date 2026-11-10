'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    let disposed = false;
    let loading = false;
    let stop: (() => void) | undefined;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const enabled = () => !motion.matches && fine.matches;
    const disable = () => { stop?.(); stop = undefined; };
    async function update() {
      if (disposed) return;
      if (!enabled()) { disable(); return; }
      if (stop || loading) return;
      loading = true;
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]);
        if (disposed || !enabled()) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, wheelMultiplier: .9, anchors: { duration: 1.15, offset: -32 }, prevent: (node) => node.tagName === 'DIALOG' || node.closest('dialog[open]') !== null });
        const frame = (time: number) => lenis.raf(time * 1000);
        const scroll = () => ScrollTrigger.update();
        const syncLock = () => { if (document.body.style.overflow === 'hidden') lenis.stop(); else lenis.start(); };
        const observer = new MutationObserver(syncLock);
        const syncVisibility = () => { gsap.ticker.remove(frame); if (!document.hidden) gsap.ticker.add(frame); };
        lenis.on('scroll', scroll);
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
        document.addEventListener('visibilitychange', syncVisibility);
        syncLock();
        syncVisibility();
        stop = () => { observer.disconnect(); document.removeEventListener('visibilitychange', syncVisibility); gsap.ticker.remove(frame); lenis.off('scroll', scroll); lenis.destroy(); };
      } finally {
        loading = false;
      }
    }
    const changed = () => { void update().catch(() => { disable(); }); };
    motion.addEventListener('change', changed);
    fine.addEventListener('change', changed);
    changed();
    return () => { disposed = true; motion.removeEventListener('change', changed); fine.removeEventListener('change', changed); disable(); };
  }, [path]);
  return null;
}
