'use client';

import { useEffect, useRef, useState } from 'react';
import { Star } from '@/components/primitives/ui';

export function HeroPlayground() {
  const root = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLButtonElement>(null);
  const [vibe, setVibe] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / 250));
        const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / 250));
        element.style.setProperty('--eye-x', `${x * 6}px`);
        element.style.setProperty('--eye-y', `${y * 7}px`);
        element.style.setProperty('--face-x', `${x * 10}px`);
        element.style.setProperty('--face-y', `${y * 10}px`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);
  function changeVibe() {
    setVibe((value) => (value + 1) % 3);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) face.current?.animate([{ transform: 'rotate(-14deg) scale(.82)' }, { transform: 'rotate(12deg) scale(1.2)' }, { transform: 'rotate(-8deg) scale(.96)' }, { transform: 'rotate(-7deg) scale(1)' }], { duration: 720, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  return <div className="hero-playground" ref={root} data-vibe={vibe}>
    <svg className="hero-orbit" viewBox="0 0 280 280" aria-hidden="true"><defs><path id="hero-orbit-path" d="M140,140 m-113,0 a113,113 0 1,1 226,0 a113,113 0 1,1 -226,0" /></defs><text><textPath href="#hero-orbit-path" textLength="700" lengthAdjust="spacing">BUILD · LEARN · REPEAT · BUILD · LEARN · REPEAT · </textPath></text><circle cx="140" cy="140" r="92" /></svg>
    <div className="face-float"><button ref={face} className="hero-face" aria-label="Change the coding companion’s mood" onClick={changeVibe}><span className="face-eyes"><span><i /></span><span><i /></span></span><span className="face-mouth" /><span className="face-freckles" aria-hidden="true">···</span></button></div>
    <span className="hero-sticker sticker-one" aria-hidden="true">NOT FOR<br />EVERYONE.</span><span className="hero-sticker sticker-two" aria-hidden="true">JUST FOR YOU. <span>↗</span></span><Star className="playground-star" />
    <span className="playground-invitation">Psst. Give me a click.</span><span className="sr-only" aria-live="polite">{['Feeling curious.', 'Feeling bold.', 'Feeling happy.'][vibe]}</span>
  </div>;
}
