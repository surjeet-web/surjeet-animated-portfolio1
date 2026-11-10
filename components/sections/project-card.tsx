import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/primitives/ui';
import type { PortfolioProject } from '@/content/portfolio';

export function ProjectCard({ project, index = 0 }: { project: PortfolioProject; index?: number }) {
  return <article className="work-card"><Link href={`/work/${project.slug}`} className={`work-card-image tone-${index % 5}`} aria-label={`Explore ${project.title}`}><span className="work-card-index">{String(index + 1).padStart(2, '0')} / SURJEET</span><Image src={project.image} width={1200} height={760} alt={project.imageAlt} sizes="(max-width: 640px) 88vw, 43vw" className="screen-crop" /><span className="project-open"><Arrow diagonal /></span><span className="concept-badge">{project.visibility.toUpperCase()} · {project.status.toUpperCase()}</span></Link><div className="work-card-caption"><div><p className="eyebrow">{project.stack.slice(0,3).join(' / ')}</p><h2><Link href={`/work/${project.slug}`}>{project.shortTitle}</Link></h2><p className="work-card-summary">{project.tagline}</p></div><Arrow diagonal /></div></article>;
}
