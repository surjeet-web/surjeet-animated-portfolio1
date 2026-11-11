import Image from 'next/image';
import Link from 'next/link';
import { Arrow, ButtonLink, SectionLabel } from '@/components/primitives/ui';
import { ImmersiveHero } from '@/components/motion/immersive-hero';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { SkillsStack } from '@/components/sections/skills-stack';
import { AiDesignWorkflow } from '@/components/sections/ai-design-workflow';
import { projects, profile, resumePath } from '@/content/portfolio';

export default function Home() {
  return <main id="main" className="focused-home">
    <ImmersiveHero />
    <section className="career-direction wrap" aria-labelledby="direction-heading"><div><p className="eyebrow">ABOUT ME / CURRENT DIRECTION</p><h2 id="direction-heading">Building toward<br /><em>cloud engineering.</em></h2></div><div><p>{profile.intro}</p><a href={resumePath} download className="text-link">Download my résumé <Arrow diagonal /></a></div></section>
    <SkillsStack />
    <ExperienceTimeline compact />
    <section className="work-section wrap section-space focused-projects" id="selected-work" aria-labelledby="projects-heading" data-testid="selected-projects">
      <div className="section-top"><SectionLabel number="03">SELECTED PROJECTS</SectionLabel><span className="eyebrow">ONE COLLECTION. FIVE DIFFERENT PROBLEMS.</span></div>
      <div className="work-heading"><h2 id="projects-heading" className="display-heading">Work with<br /><span>a purpose.</span></h2><p>Full-stack, mobile, and native applications.<br />The implementation and its scope, explained.</p></div>
      <div className="focused-project-grid">{projects.map((project, index) => <article key={project.slug} className={`featured-project focused-project project-${index + 1}`} data-reveal data-project={project.slug}><Link href={`/work/${project.slug}`} className="focused-project-link" aria-label={`Explore ${project.title}`}><div className="project-artwork" style={{ backgroundColor: project.color }}><div className="project-artwork-number">0{index + 1} / {project.visibility.toUpperCase()} PROJECT</div><Image src={project.image} alt={project.imageAlt} width={1200} height={760} sizes="(max-width: 640px) 88vw, (max-width: 1100px) 43vw, 28vw" /><span className="project-open"><Arrow diagonal /></span></div><div className="project-caption"><div><p className="eyebrow">{project.stack.slice(0, 3).join(' / ')}</p><h3>{project.shortTitle}</h3><p>{project.tagline}</p></div><span className="project-caption-mark" aria-hidden="true">↗</span></div></Link></article>)}</div>
      <div className="work-bottom"><span>Public source where available.<br />Private work described without disclosing code.</span><Link href="/work" className="text-link">Search all projects <Arrow diagonal /></Link></div>
    </section>
    <AiDesignWorkflow compact />
    <section className="audit-section wrap section-space career-contact" aria-labelledby="opportunity-heading"><SectionLabel number="04">OPEN TO LEARNING & CONTRIBUTING</SectionLabel><div className="audit-inner"><h2 id="opportunity-heading">The next<br /><i>step.</i></h2><div><p>I’m looking for an entry-level or trainee opportunity as I move toward cloud engineering. I bring hands-on full-stack experience and a willingness to learn from the fundamentals.</p><ButtonLink href="/contact">Let’s start a conversation</ButtonLink><span className="audit-note">New Delhi, India · BCA at Shoolini University</span></div></div></section>
  </main>;
}
