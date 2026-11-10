import Image from 'next/image';
import Link from 'next/link';
import { Arrow, ButtonLink, SectionLabel, Star, TextLink } from '@/components/primitives/ui';
import { ServicesOverview } from '@/components/sections/services-overview';
import { ImmersiveHero } from '@/components/motion/immersive-hero';
import { BrandStory } from '@/components/motion/brand-story';
import { Marquee, WorkJourney } from '@/components/motion/work-journey';
import { ProjectDeck } from '@/components/motion/project-deck';
import { ProcessPlayground } from '@/components/motion/process-playground';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { projects, profile, resumePath } from '@/content/portfolio';

export default function Home() {
  const featured = projects.slice(0, 4);
  const lead = projects[0];
  return <main id="main">
    <ImmersiveHero />
    <section className="feature-stage-wrap wrap" aria-label="Featured full-stack project">
      <Link href={`/work/${lead.slug}`} className="feature-stage" data-parallax>
        <div className="stage-grid" aria-hidden="true" /><span className="stage-kicker">SURJEET / SELECTED WORK / 01</span>
        <div className="stage-screen"><div className="stage-browser-bar"><span /><span /><span /><p>workforce · payroll · illustration</p><span className="stage-browser-menu">↗</span></div><Image src={lead.image} width={1200} height={760} alt={lead.imageAlt} priority sizes="(max-width: 640px) 90vw, (max-width: 960px) 78vw, 850px" /></div>
        <div className="stage-caption"><div><p>{lead.shortTitle}</p><span>REACT + NESTJS · PRIVATE PROTOTYPE</span></div><span className="round-arrow"><Arrow diagonal /></span></div><span className="stage-side-note" aria-hidden="true">BUSINESS RULES. REAL IMPLEMENTATION.</span>
      </Link>
      <div className="project-ticker"><p>BUILT TO SOLVE A PROBLEM. NOT JUST FILL A SCREEN.</p><div><span>React</span><span className="ticker-plus">+</span><span>NestJS</span><span className="ticker-plus">+</span><span>SQLite</span><span className="ticker-plus">+</span><span>Curiosity.</span></div></div>
    </section>
    <Marquee />
    <section className="intro-section wrap section-space" data-reveal><SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel><div className="intro-content"><h2>I’m Surjeet.<br /><span>I make ideas <i>work.</i></span></h2><div className="intro-bottom"><Star /><p>{profile.intro}</p><TextLink href="/about" diagonal>More than the stack</TextLink></div></div></section>
    <BrandStory />
    <section className="work-section wrap section-space" id="selected-work"><div className="section-top"><SectionLabel number="02">SELECTED PROJECTS</SectionLabel><span className="eyebrow">FIVE PROJECTS. DIFFERENT ENGINEERING PROBLEMS.</span></div><div className="work-heading"><h2 className="display-heading">Less talk.<br /><span>More building.</span></h2><TextLink href="/work" diagonal>All projects <sup>{projects.length}</sup></TextLink></div><div className="featured-grid">{featured.map((project, index) => <article key={project.slug} className={`featured-project project-${index + 1}`} data-reveal><Link href={`/work/${project.slug}`} className={`project-artwork ${['rose','sand','blue','clay'][index]}`} aria-label={`Explore ${project.title}`}><div className="project-artwork-number">0{index + 1} / {project.visibility.toUpperCase()} PROJECT</div><Image src={project.image} alt={project.imageAlt} width={1200} height={760} sizes="(max-width: 640px) 90vw, 43vw" /><span className="project-open"><Arrow diagonal /></span></Link><div className="project-caption"><div><p className="eyebrow">{project.stack.slice(0,3).join(' / ')}</p><h3><Link href={`/work/${project.slug}`}>{project.shortTitle}</Link></h3><p>{project.tagline}</p></div><span className="project-caption-mark">↗</span></div></article>)}</div><div className="work-bottom"><span>Public repositories where available.<br />Private work, described responsibly.</span><ButtonLink href="/work">Explore the implementation</ButtonLink></div></section>
    <WorkJourney />
    <ProjectDeck />
    <Marquee reverse />
    <ServicesOverview />
    <ProcessPlayground />
    <section className="studio-section wrap section-space"><div className="studio-copy" data-reveal><SectionLabel number="04">THE PERSON BEHIND THE CODE</SectionLabel><h2 className="display-heading">Curious mind.<br />Practical<br /><em>approach.</em></h2><p>I’ve written code, answered technical support calls, and worked through customer follow-ups. That mix keeps me interested in what happens after a button is clicked—not just how it looks.</p><TextLink href="/about" diagonal>My story so far</TextLink></div><div className="studio-art"><div className="studio-art-top"><span>NEW DELHI / ALWAYS LEARNING</span><span>↗</span></div><div className="art-type"><span>THINK.</span><span className="art-type-middle">BUILD<Star /></span><span>TEST.</span><span className="art-type-outline">REPEAT.</span></div><a href={resumePath} className="reel-button" download><span className="play-circle">↓</span><span>Download my résumé<small>One page. The useful details.</small></span><Arrow diagonal /></a></div></section>
    <ExperienceTimeline compact />
    <section className="audit-section wrap section-space"><SectionLabel number="05">OPEN TO THE NEXT CHALLENGE</SectionLabel><div className="audit-inner"><h2>Good team.<br />Next <i>chapter.</i></h2><div><p>I’m looking for a junior developer or trainee role where I can contribute to real software, learn from experienced teammates, and take ownership of well-defined work.</p><ButtonLink href="/contact">Let’s start a conversation</ButtonLink><span className="audit-note">Based in New Delhi · BCA at Shoolini University</span></div></div></section>
  </main>;
}
