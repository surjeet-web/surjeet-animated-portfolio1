import type { Metadata } from 'next';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { Arrow, SectionLabel, Star } from '@/components/primitives/ui';
import { resumePath } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Experience & résumé', description: 'Surjeet’s development internship, WordPress and technical-support work, customer-facing experience, and downloadable résumé.' };
export default function ExperiencePage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="04">THE PATH SO FAR</SectionLabel><p className="eyebrow">DEVELOPMENT. COMMUNICATION. PRACTICE.</p></div><h1>Learning<br /><em>by doing.</em></h1><div className="page-hero-intro"><p>Experience in software development, technical support, and sales. Different roles, with a shared lesson: understand what people need to get done.</p><Star /></div></section><ExperienceTimeline /><section className="resume-callout wrap section-space"><div><p className="eyebrow">THE CONCISE VERSION</p><h2>All the useful details.<br />One page.</h2><p>Current experience, selected projects, technical skills, and education.</p></div><a className="button-link button-dark" href={resumePath} download>Download résumé <Arrow diagonal /></a></section></main>;
}
