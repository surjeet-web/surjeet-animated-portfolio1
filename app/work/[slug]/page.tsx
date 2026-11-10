import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow, ButtonLink, SectionLabel } from '@/components/primitives/ui';
import { Faq } from '@/components/sections/faq';
import { getProject, projects, projectFaqs } from '@/content/portfolio';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = getProject((await params).slug); return { title: project?.title ?? 'Project not found', description: project?.summary }; }
export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  return <main id="main"><section className="project-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/work">Projects</Link><span>/</span><span>{project.shortTitle}</span></nav><div className="project-title-line"><h1>{project.shortTitle}</h1><Arrow diagonal /></div><div className="project-meta"><p>{project.category}</p><div>{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-status-line"><span>{project.status}</span><span>{project.sourceLabel}</span></div><div className="project-hero-art" style={{background:project.color}}><Image src={project.image} alt={project.imageAlt} width={1200} height={760} priority sizes="(max-width: 640px) 90vw, 76vw" /></div></section><section className="case-intro wrap section-space"><SectionLabel number="01">THE PROBLEM & THE BUILD</SectionLabel><div><h2>{project.tagline}</h2><p className="case-lead">{project.summary}</p><p>{project.problem}</p></div></section><section className="case-deliverables wrap"><div><SectionLabel number="02">INSIDE THE IMPLEMENTATION</SectionLabel><h2 className="section-heading">Beyond<br />the interface.</h2></div><ul>{project.highlights.map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}<Arrow diagonal /></li>)}</ul></section><section className="case-scope wrap"><div><SectionLabel number="03">WHAT THIS DEMONSTRATES</SectionLabel><h2>{project.engineeringFocus}</h2></div><div><p className="eyebrow">SCOPE, HONESTLY</p><p>{project.scopeNote}</p>{project.repositoryUrl ? <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="button-link button-dark">View public repository <Arrow diagonal /></a> : <ButtonLink href={`/contact?project=${project.slug}`}>Discuss this project</ButtonLink>}<p className="illustration-disclosure">The artwork is a newly created project illustration, not an application screenshot or a customer record.</p></div></section><Faq items={projectFaqs} title="A note on\nsharing the work." /><section className="next-project wrap"><span className="eyebrow">ANOTHER PROBLEM. ANOTHER PERSPECTIVE.</span><Link href={`/work/${next.slug}`}><h2>{next.shortTitle}</h2><Arrow diagonal /></Link><ButtonLink href="/contact">Let’s talk about a role</ButtonLink></section></main>;
}
