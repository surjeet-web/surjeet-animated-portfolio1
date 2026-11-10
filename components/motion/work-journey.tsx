import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Star } from '@/components/primitives/ui';
import { projects } from '@/content/portfolio';

export function WorkJourney() {
  return <section className="work-journey" aria-label="Projects in motion"><div className="journey-sticky"><div className="journey-top"><p className="eyebrow"><span className="status-dot" /> A DIFFERENT KIND OF PROBLEM SOLVING</p><Link href="/work">Explore the projects <Arrow diagonal /></Link></div><div className="journey-track" aria-hidden="true">{projects.slice(0,3).map((project, index) => <div className="journey-panel" style={{ backgroundColor: project.color }} key={project.slug}><span className="journey-index">0{index + 1} — SURJEET / IN THE DETAILS</span><p className="journey-title">{project.headline.split('\n').map((line) => <span key={line}>{line}</span>)}</p><div className="journey-art"><Image src={project.image} alt="" width={1200} height={760} sizes="(max-width: 640px) 80vw, 65vw" /></div><div className="journey-panel-bottom"><span>{project.shortTitle}</span><span>{project.visibility.toUpperCase()} · PROJECT ILLUSTRATION</span><Star /></div></div>)}</div><div className="journey-bottom"><span>SCROLL INTO THE DETAILS</span><div className="journey-progress"><span /></div><span>SOFTWARE WITH A PURPOSE.</span></div></div></section>;
}

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  return <div className={`kinetic-marquee${reverse ? ' marquee-reverse' : ''}`} role="img" aria-label={reverse ? 'Think clearly. Build thoughtfully. Keep learning.' : 'React. TypeScript. Practical automation.'}><div className="marquee-track" aria-hidden="true">{[0, 1, 2, 3].map((copy) => <div className="marquee-group" key={copy}><span>{reverse ? 'THINK CLEARLY.' : 'REACT.'}</span><Star /><span className="marquee-outline">{reverse ? 'BUILD THOUGHTFULLY.' : 'TYPESCRIPT.'}</span><Star /><span>{reverse ? 'KEEP LEARNING.' : 'PRACTICAL AUTOMATION.'}</span><Star /></div>)}</div></div>;
}
