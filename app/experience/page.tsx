import type { Metadata } from 'next';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { Arrow, SectionLabel, Star } from '@/components/primitives/ui';
import { resumePath } from '@/content/portfolio';
import '@/styles/focused-home.css';

export const metadata: Metadata = { title: 'Experience & résumé', description: 'Surjeet’s full-stack development internship at IQSetters, updated résumé, and current direction toward cloud engineering.' };
export default function ExperiencePage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="04">EXPERIENCE & RÉSUMÉ</SectionLabel><p className="eyebrow">FULL-STACK FOUNDATIONS. A CLOUD-FOCUSED NEXT STEP.</p></div><h1>Learning<br /><em>by doing.</em></h1><div className="page-hero-intro"><p>Hands-on full-stack experience from my IQSetters internship. I’m now learning Go and distributed systems as I work toward an entry-level cloud engineering opportunity.</p><Star /></div></section><ExperienceTimeline /><section className="resume-callout wrap section-space"><div><p className="eyebrow">THE UPDATED VERSION</p><h2>My experience.<br />My next direction.</h2><p>IQSetters internship, technical skills, education, and the cloud-engineering path I’m working toward.</p></div><a className="button-link button-dark" href={resumePath} download>Download résumé <Arrow diagonal /></a></section></main>;
}
