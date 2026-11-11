import Link from 'next/link';
import { SectionLabel, Arrow } from '@/components/primitives/ui';
import { experience } from '@/content/portfolio';

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  return <section className={`experience-section wrap section-space${compact ? ' experience-compact' : ''}`} id="experience" aria-labelledby="experience-heading"><div className="section-top"><SectionLabel number="02">PROFESSIONAL EXPERIENCE</SectionLabel>{compact && <Link href="/experience" className="text-link">Experience & résumé <Arrow diagonal /></Link>}</div><h2 id="experience-heading" className="section-heading">Full-stack development.<br /><i>Hands-on at IQSetters.</i></h2><div className="experience-list">{experience.map((job, index) => <article key={job.company} data-reveal><span className="experience-index">0{index + 1}</span><div className="experience-role"><p className="eyebrow">{job.dates} · {job.location}</p><h3>{job.role}</h3><p className="experience-company">{job.company}</p></div><div className="experience-details"><p className="experience-summary">{job.summary}</p><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>;
}
