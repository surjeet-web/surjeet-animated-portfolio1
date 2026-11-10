'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function MotionObserver() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    async function setup() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {});
      const media = gsap.matchMedia();
      const loops = new Map<gsap.core.Tween, { isActive: boolean }>();
      const syncLoop = (tween: gsap.core.Tween, isActive: boolean) => { tween.paused(!isActive || document.hidden || reduced.matches || document.documentElement.dataset.motionPaused === 'true'); };
      const visibility = () => loops.forEach((trigger, tween) => syncLoop(tween, trigger.isActive));
      const addLoop = (tween: gsap.core.Tween, element: Element) => {
        const trigger = ScrollTrigger.create({ trigger: element, start: 'top bottom', end: 'bottom top', onToggle: ({ isActive }) => syncLoop(tween, isActive), onRefresh: ({ isActive }) => syncLoop(tween, isActive) });
        loops.set(tween, trigger);
        syncLoop(tween, trigger.isActive);
      };
      let refreshTimer: ReturnType<typeof setTimeout> | undefined;
      const refresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => { if (!disposed) ScrollTrigger.refresh(); }, 180); };
      cleanup = () => { clearTimeout(refreshTimer); window.removeEventListener('load', refresh); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('studio:motion', visibility); media.revert(); context.revert(); loops.clear(); delete document.documentElement.dataset.motion; };
      context.add(() => {
        if (progress.current) gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
      });
      media.add('(prefers-reduced-motion: no-preference)', (motionContext) => {
          const removers: (() => void)[] = [];
          const entrances: Animation[] = [];
          const enter = (element: Element, frames: Keyframe[], duration: number, delay = 0, easing = 'cubic-bezier(.16,1,.3,1)') => {
            entrances.push(element.animate(frames, { duration, delay, easing, fill: 'backwards' }));
          };
          document.querySelectorAll('.hero .split-char').forEach((element, index) => enter(element, [{ transform: 'translateY(110%) rotate(8deg)', opacity: 0 }, { transform: 'translateY(0) rotate(0)', opacity: 1 }], 1100, 50 + index * 42));
          document.querySelectorAll('.hero-playground').forEach(element => enter(element, [{ scale: '.3', opacity: 0 }, { scale: '1', opacity: 1 }], 1250, 320));
          document.querySelectorAll('.immersive-meta, .immersive-bottom').forEach((element, index) => enter(element, [{ transform: 'translateY(24px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 850, 240 + index * 100));
          document.querySelectorAll('.hero-draw-path').forEach(element => enter(element, [{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 4200, 480, 'cubic-bezier(.65,0,.35,1)'));
          document.querySelectorAll('.hero-badge').forEach((element, index) => enter(element, [{ scale: '.05', opacity: 0 }, { scale: '1', opacity: 1 }], 1000, 800 + index * 250, 'cubic-bezier(.34,1.56,.64,1)'));
          document.querySelectorAll('.hero-line-three').forEach(element => enter(element, [{ transform: 'translateY(65px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 1000, 600));
          document.querySelectorAll<HTMLElement>('.page-hero h1, .project-title-line h1, .article-header h1').forEach((title) => {
            gsap.from(title, { y: 80, opacity: 0, rotateX: 14, transformOrigin: 'bottom', duration: 1.1, ease: 'power4.out', clearProps: 'all' });
          });
          if (document.querySelector('.hero')) {
            if (document.querySelector('.hero-line-one')) gsap.to('.hero-line-one', { xPercent: -8, rotate: -3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .9 } });
            if (document.querySelector('.hero-line-two')) gsap.to('.hero-line-two', { xPercent: 9, rotate: 2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .9 } });
            if (document.querySelector('.immersive-mascot')) gsap.fromTo('.immersive-mascot', { '--mascot-scroll-y': '0px' }, { '--mascot-scroll-y': '100px', ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 } });
            if (document.querySelector('.feature-stage .stage-screen')) gsap.fromTo('.feature-stage .stage-screen', { rotationY: -12, rotationX: 9, rotationZ: -3, scale: .86 }, { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1.07, ease: 'none', scrollTrigger: { trigger: '.feature-stage', start: 'top bottom', end: 'bottom 40%', scrub: 1.2 } });
            if (document.querySelector('.feature-stage')) gsap.fromTo('.feature-stage', { borderRadius: '70px 70px 8px 8px' }, { borderRadius: '3px', ease: 'none', scrollTrigger: { trigger: '.feature-stage', start: 'top 90%', end: 'top 15%', scrub: .6 } });
            if (document.querySelector('.feature-stage .stage-grid')) gsap.to('.feature-stage .stage-grid', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.feature-stage', start: 'top bottom', end: 'bottom top', scrub: .8 } });
            const punctuation = document.querySelector('.hero-punctuation');
            if (punctuation) addLoop(gsap.to(punctuation, { rotation: 360, duration: 20, ease: 'none', repeat: -1, delay: 1.8, paused: true }), punctuation);
            document.querySelectorAll('.hero-badge').forEach((badge, index) => gsap.fromTo(badge, { '--badge-scroll-y': '0px' }, { '--badge-scroll-y': `${25 + index * 8}px`, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.3 } }));
          }
          document.querySelectorAll<HTMLElement>('[data-reveal], .work-card, .journal-card, .principles-grid article, .process-grid article').forEach((element, index) => {
            gsap.from(element, { y: 55, rotate: element.classList.contains('featured-project') ? (index % 2 ? 2 : -2) : 0, duration: 1.05, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
          });
          document.querySelectorAll<HTMLElement>('.section-heading, .services-title, .intro-content h2, .work-heading .display-heading, .audit-inner h2, .testimonial-inner blockquote').forEach((element) => {
            gsap.from(element, { y: 65, rotateX: 25, transformOrigin: 'bottom center', duration: 1.1, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
          });
          document.querySelectorAll<HTMLElement>('.featured-project').forEach((element, index) => {
            const image = element.querySelector('img');
            if (image) gsap.fromTo(image, { yPercent: 9, rotation: index % 2 ? 3 : -3, scale: .92 }, { yPercent: -9, rotation: 0, scale: 1.03, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1 } });
          });
          if (document.querySelector('.studio-art')) gsap.fromTo('.studio-art', { rotation: -8, y: 60, scale: .93 }, { rotation: 5, y: -30, scale: 1, ease: 'none', scrollTrigger: { trigger: '.studio-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
          if (document.querySelector('.about-poster')) gsap.fromTo('.about-poster', { rotation: -3, y: 35 }, { rotation: 3, y: -35, ease: 'none', scrollTrigger: { trigger: '.about-manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 } });
          document.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
            const reversed = track.parentElement?.classList.contains('marquee-reverse');
            const tween = gsap.fromTo(track, { xPercent: reversed ? -25 : 0 }, { xPercent: reversed ? 0 : -25, duration: 34, ease: 'none', repeat: -1, paused: true });
            addLoop(tween, track.parentElement ?? track);
          });
          document.querySelectorAll<HTMLElement>('.service-row').forEach((row, index) => {
            gsap.from(row, { x: index % 2 ? 55 : -55, duration: .8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: row, start: 'top 92%', once: true } });
            const onToggle = () => motionContext.add(() => { if (row.hasAttribute('open')) { const details = row.querySelector('.service-details'); if (details) gsap.fromTo(details, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: .45, clearProps: 'all', overwrite: 'auto' }); } ScrollTrigger.refresh(); });
            row.addEventListener('toggle', onToggle); removers.push(() => row.removeEventListener('toggle', onToggle));
          });
          if (document.querySelector('.footer-wordmark')) gsap.fromTo('.footer-wordmark', { yPercent: 50, rotate: -3, opacity: 1 }, { yPercent: 0, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
          return () => { entrances.forEach(animation => animation.cancel()); removers.forEach((remove) => remove()); loops.clear(); };
      });
      media.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        const journey = document.querySelector<HTMLElement>('.work-journey');
        if (journey) {
          const track = journey.querySelector<HTMLElement>('.journey-track');
          const cards = journey.querySelectorAll<HTMLElement>('.journey-art');
          if (track) {
            journey.classList.add('journey-enhanced');
            const timeline = gsap.timeline({ scrollTrigger: { trigger: journey, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } });
            timeline.to(track, { x: () => -Math.max(0, track.scrollWidth - window.innerWidth + 50), ease: 'none', duration: 3 }, 0);
            const journeyProgress = journey.querySelector('.journey-progress>span');
            if (journeyProgress) timeline.fromTo(journeyProgress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 3 }, 0);
            cards.forEach((card, index) => timeline.fromTo(card, { rotation: index % 2 ? 9 : -9, scale: .85, y: 60 }, { rotation: 0, scale: 1, y: -15, duration: 1.4, ease: 'none' }, index * .75));
            return () => { timeline.scrollTrigger?.kill(); timeline.kill(); journey.classList.remove('journey-enhanced'); gsap.set(track, { clearProps: 'all' }); gsap.set(cards, { clearProps: 'all' }); };
          }
        }
      });
      media.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
        const tweens = [...document.querySelectorAll<HTMLElement>('.journey-panel')].map((panel) => gsap.fromTo(panel, { scale: .94, rotate: -2 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 95%', end: 'top 30%', scrub: .65 } }));
        return () => tweens.forEach((tween) => { tween.scrollTrigger?.kill(); tween.revert(); });
      });
      media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const element = cursor.current;
        if (!element) return;
        const xTo = gsap.quickTo(element, 'x', { duration: .38, ease: 'power3' });
        const yTo = gsap.quickTo(element, 'y', { duration: .38, ease: 'power3' });
        const onMove = (event: PointerEvent) => {
          xTo(event.clientX); yTo(event.clientY);
          const target = event.target instanceof Element ? event.target.closest('a, button, summary, .journey-panel') : null;
          const visual = target?.matches('.feature-stage, .project-artwork, .work-card-image, .journal-card-art, .journey-panel');
          element.dataset.mode = visual ? 'view' : target ? 'link' : '';
          element.style.opacity = '1';
          const label = element.querySelector('span');
          if (label) label.textContent = visual ? 'EXPLORE ↗' : '';
        };
        const hide = () => { element.style.opacity = '0'; };
        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', hide);
        const localRemovers: (() => void)[] = [];
        document.querySelectorAll<HTMLElement>('.header-cta>span, .button-link, .round-arrow, .footer-invitation-arrow, .play-circle').forEach((magnet) => {
          const move = (event: PointerEvent) => {
            const rect = magnet.getBoundingClientRect();
            gsap.to(magnet, { x: (event.clientX - rect.left - rect.width / 2) * .22, y: (event.clientY - rect.top - rect.height / 2) * .24, duration: .4, ease: 'power3.out', overwrite: 'auto' });
          };
          const leave = () => gsap.to(magnet, { x: 0, y: 0, duration: .85, ease: 'elastic.out(1, .4)', overwrite: 'auto' });
          magnet.addEventListener('pointermove', move); magnet.addEventListener('pointerleave', leave);
          localRemovers.push(() => { magnet.removeEventListener('pointermove', move); magnet.removeEventListener('pointerleave', leave); gsap.killTweensOf(magnet); gsap.set(magnet, { clearProps: 'transform' }); });
        });
        return () => { window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('pointerleave', hide); localRemovers.forEach((remove) => remove()); hide(); };
      });
      document.addEventListener('visibilitychange', visibility);
      window.addEventListener('studio:motion', visibility);
      visibility();
      document.fonts.ready.then(() => { if (!disposed) refresh(); });
      window.addEventListener('load', refresh);
      refresh();
      document.documentElement.dataset.motion = 'ready';
    }
    setup().catch(() => { if (!disposed) { cleanup(); document.documentElement.dataset.motion = 'fallback'; } });
    return () => { disposed = true; cleanup(); };
  }, [pathname]);

  return <><div className="reading-progress" ref={progress} aria-hidden="true" /><div className="motion-cursor" ref={cursor} aria-hidden="true"><span /></div></>;
}
