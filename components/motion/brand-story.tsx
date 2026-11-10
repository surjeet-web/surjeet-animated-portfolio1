'use client';

import { useEffect, useRef } from 'react';
import { Arrow, Star } from '@/components/primitives/ui';
import Link from 'next/link';

export function BrandStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const scope = root.current;
      const context = gsap.context(() => {
        const blocks = scope.querySelectorAll('.story-icon');
        const desktop = matchMedia('(min-width: 641px)').matches;
        gsap.from(blocks, { x: (i: number) => [desktop ? -280 : -55, desktop ? 280 : 55, desktop ? -200 : -50, desktop ? 240 : 60][i], y: (i: number) => [170, -150, -130, 180][i], rotation: (i: number) => [-120, 150, -180, 130][i], scale: 2, opacity: .2, ease: 'none', scrollTrigger: { trigger: scope, start: 'top 90%', end: 'top 12%', scrub: 1 } });
        gsap.from('.brand-story-line', { y: 50, stagger: .16, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: scope, start: 'top 75%', toggleActions: 'play none none reverse' } });
      }, scope);
      dispose = () => context.revert();
    }
    setup().catch(() => {});
    return () => { cancelled = true; dispose(); };
  }, []);
  return <section className="brand-story" ref={root} aria-labelledby="brand-story-title"><p className="eyebrow">CODE IS THE TOOL. THE PERSON USING IT IS THE POINT.</p><h2 id="brand-story-title"><span className="brand-story-line">I turn <em>ideas</em> <span className="story-icon story-crown" aria-hidden="true">↗</span></span><span className="brand-story-line">into <span className="story-icon story-heart" aria-hidden="true">♥</span> useful tools.</span><span className="brand-story-line">With clear <span className="story-icon story-star" aria-hidden="true"><Star /></span> interfaces</span><span className="brand-story-line">and <em>thoughtful</em> <span className="story-icon story-arrow" aria-hidden="true"><Arrow diagonal /></span> code.</span></h2><div className="brand-story-bottom"><p>Full-stack development.<br />A practical, people-first perspective.</p><Link href="/about" className="text-link">A little about me <Arrow diagonal /></Link></div></section>;
}
