import Link from 'next/link';
import { SectionLabel, Arrow } from '@/components/primitives/ui';
import { experience } from '@/content/portfolio';

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  return <section className={`experience-section wrap section-space${compact ? ' experience-compact' : ''}`} id="experience"><div className="section-top"><SectionLabel number="↳">EXPERIENCE, BEYOND THE EDITOR</SectionLabel>{compact && <Link href="/experience" className="text-link">The full story <Arrow diagonal /></Link>}</div><h2 className="section-heading">Building. Listening.<br /><i>Getting better.</i></h2><div className="experience-list">{experience.map((job, index) => <article key={job.company} data-reveal><span className="experience-index">0{index + 1}</span><div className="experience-role"><p className="eyebrow">{job.dates} · {job.location}</p><h3>{job.role}</h3><p className="experience-company">{job.company}</p></div><p className="experience-summary">{job.summary}</p></article>)}</div></section>;
}
