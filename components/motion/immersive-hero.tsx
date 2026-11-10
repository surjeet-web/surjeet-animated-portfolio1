import Link from 'next/link';
import { Arrow, Star } from '@/components/primitives/ui';
import { HeroPlayground } from '@/components/motion/hero-playground';
import { SplitText } from '@/components/motion/split-text';
import { projects, resumePath } from '@/content/portfolio';

export function ImmersiveHero() {
  return <section className="hero immersive-hero personal-hero" aria-label="Surjeet — full-stack developer">
    <div className="immersive-meta"><span><i /> SURJEET / NEW DELHI / OPEN TO JUNIOR ROLES</span><span>FULL-STACK / MOBILE / PRACTICAL AUTOMATION</span></div>
    <div className="immersive-canvas">
      <h1 className="immersive-title" aria-label="Surjeet. Code with purpose."><span className="hero-line-one"><SplitText text="SURJEET." /></span><span className="hero-line-two"><SplitText text="I BUILD." /></span><span className="hero-line-three"><span>REAL PROBLEMS.</span><em>USEFUL SOFTWARE.</em></span></h1>
      <svg className="immersive-drawing" viewBox="0 0 1440 750" fill="none" aria-hidden="true"><path className="hero-draw-path" d="M-70 370C115 71 543 73 609 229C683 405 179 663 114 453C47 234 883 361 1166 171C1451 -23 1426 518 1193 528C982 537 1066 179 1130 334C1235 589 705 835 487 596C309 402 719 252 890 490L930 543M899 530L930 543L925 509" stroke="currentColor" strokeWidth="3" pathLength="1" strokeLinecap="round" /><circle className="path-node node-one" cx="609" cy="229" r="7" /><circle className="path-node node-two" cx="114" cy="453" r="7" /><circle className="path-node node-three" cx="1193" cy="528" r="7" /><circle className="path-node node-four" cx="487" cy="596" r="7" /></svg>
      <div className="hero-badge badge-coral"><Star /><span>CURIOUS MIND.<br />BUILDER ENERGY.</span></div>
      <a href={resumePath} download className="hero-badge badge-audit"><span>GET MY<br />RÉSUMÉ</span><span aria-hidden="true">↓</span></a>
      <div className="hero-badge badge-lime"><span>REACT + TYPESCRIPT<br /><strong>AND A LITTLE GRIT.</strong></span></div>
      <Link href="/work" className="hero-badge badge-work"><span>{projects.length}<br /><small>SELECTED<br />PROJECTS</small></span></Link>
      <div className="immersive-mascot"><HeroPlayground /></div>
      <div className="hero-badge badge-craft"><span>BASED IN<br /><strong>NEW DELHI, INDIA.</strong></span><span className="badge-heart">↗</span></div>
    </div>
    <div className="immersive-bottom"><a href="#selected-work">LESS TALK. SEE THE WORK. <span>↓</span></a><p>Full-stack developer. BCA student.<br />Building, learning, improving.</p><Link href="/contact">Let’s build something useful <Arrow diagonal /></Link></div>
    <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 38C260 -18 425 113 698 65C948 21 1207 7 1440 42V90H0Z" fill="currentColor" /></svg>
  </section>;
}
