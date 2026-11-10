'use client';

import Link from 'next/link';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Arrow } from '@/components/primitives/ui';

const subscribeMotion = (notify: () => void) => { window.addEventListener('studio:motion', notify); return () => window.removeEventListener('studio:motion', notify); };
const readMotion = () => document.documentElement.dataset.motionPaused === 'true';

export function FloatingDock() {
  const paused = useSyncExternalStore(subscribeMotion, readMotion, () => false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { if (root.current) { const visible = window.scrollY > 550; root.current.dataset.visible = String(visible); root.current.inert = !visible; root.current.setAttribute('aria-hidden', String(!visible)); } }); };
    scroll(); window.addEventListener('scroll', scroll, { passive: true });
    return () => { window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, []);
  function toggleMotion() {
    const next = !readMotion();
    document.documentElement.dataset.motionPaused = String(next);
    window.dispatchEvent(new CustomEvent('studio:motion', { detail: next }));
  }
  return <div ref={root} className="floating-dock" data-visible="false" inert aria-hidden="true" aria-label="Quick actions"><Link href="/work">Projects <Arrow diagonal /></Link><Link className="dock-project" href="/contact">Let’s talk <Arrow diagonal /></Link><button type="button" onClick={toggleMotion} aria-pressed={paused} aria-label={paused ? 'Resume decorative motion' : 'Pause decorative motion'}>{paused ? '▶' : 'Ⅱ'}<span>{paused ? 'Play' : 'Pause'}</span></button></div>;
}
