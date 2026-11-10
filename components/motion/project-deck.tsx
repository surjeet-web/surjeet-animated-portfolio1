'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Arrow, SectionLabel } from '@/components/primitives/ui';

import { projects } from '@/content/portfolio';
const cards = projects.slice(0, 4).map((project) => ({ name: project.shortTitle, slug: project.slug, line: project.headline.replace('\n', ' '), color: project.color, type: `${project.visibility.toUpperCase()} / ${project.stack[0]}`, image: project.image, alt: project.imageAlt }));

export function ProjectDeck() {
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const container = useRef<HTMLDivElement>(null);
  const drag = useRef({ start: 0, delta: 0, down: false });
  const animationRef = useRef<Animation | null>(null);
  useEffect(() => () => animationRef.current?.cancel(), []);
  function go(direction: number) {
    animationRef.current?.cancel();
    const next = (active + direction + cards.length) % cards.length;
    const card = container.current?.querySelector<HTMLElement>('.deck-active');
    setActive(next);
    setAnnouncement(`${cards[next].name}, project ${next + 1} of ${cards.length}`);
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animationRef.current = card.animate([
      { transform: `translateX(${direction * 100}px) rotateY(${direction * 78}deg) rotateZ(${direction * 9}deg)`, opacity: .15 },
      { transform: `translateX(${direction * -8}px) rotateY(${direction * -6}deg) rotateZ(-1deg)`, opacity: 1, offset: .75 },
      { transform: 'translateX(0) rotateY(0) rotateZ(0)', opacity: 1 },
    ], { duration: 680, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('a,button')) return;
    drag.current = { start: event.clientX, delta: 0, down: true };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.down) return;
    drag.current.delta = event.clientX - drag.current.start;
    const card = container.current?.querySelector<HTMLElement>('.deck-active');
    if (card && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) card.style.transform = `translateX(${drag.current.delta * .25}px) rotateY(${drag.current.delta * .05}deg) rotateZ(${drag.current.delta * .02}deg)`;
  }
  function pointerEnd() {
    if (!drag.current.down) return;
    drag.current.down = false;
    const card = container.current?.querySelector<HTMLElement>('.deck-active');
    if (card) card.style.transform = '';
    if (Math.abs(drag.current.delta) > 40) go(drag.current.delta < 0 ? 1 : -1);
  }
  const project = cards[active];
  return <section className="project-deck-section wrap section-space" aria-labelledby="deck-title"><div className="deck-copy"><SectionLabel number="↳">A DIFFERENT POINT OF VIEW</SectionLabel><h2 id="deck-title" className="display-heading">GOOD WORK.<br /><em>NO TWO<br />THE SAME.</em></h2><p>Different platforms. Different problems.<br />A practical approach to each.</p><div className="deck-controls"><button onClick={() => go(-1)} aria-label="Previous project"><Arrow /></button><span><b>{String(active + 1).padStart(2, '0')}</b> / 04</span><button onClick={() => go(1)} aria-label="Next project"><Arrow /></button></div><span className="deck-instruction">DRAG THE CARDS. FIND YOUR FAVORITE.</span><p className="sr-only" role="status">{announcement}</p></div><div className="deck-stack" ref={container} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd}><div className="deck-back deck-back-two" style={{ background: cards[(active + 2) % cards.length].color }} /><div className="deck-back deck-back-one" style={{ background: cards[(active + 1) % cards.length].color }} /><article className="deck-active" style={{ background: project.color }}><div className="deck-card-top"><span>SURJEET / SELECTED WORK</span><span>0{active + 1} / 04</span></div><h3>{project.line}</h3><Image draggable={false} src={project.image} width={1200} height={760} alt={project.alt} sizes="(max-width: 640px) 75vw, 40vw" /><div className="deck-card-bottom"><div><span>{project.type}</span><p>{project.name}</p></div><Link href={`/work/${project.slug}`} aria-label={`View ${project.name} project`}><Arrow diagonal /></Link></div></article></div></section>;
}
