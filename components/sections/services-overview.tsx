import Link from 'next/link';
import { Arrow, SectionLabel } from '@/components/primitives/ui';
import { capabilities } from '@/content/portfolio';

export function ServicesOverview({ full = false }: { full?: boolean }) {
  return <section className="services-section personal-capabilities" id="services"><div className="wrap"><div className="section-top"><SectionLabel number="03" light>WHAT I WORK WITH</SectionLabel><p>Useful interfaces.<br />Thoughtful implementation.</p></div><h2 className="services-title">A practical stack.<br /><span>A curious mind.</span></h2><div className="service-list">{capabilities.map((service, index) => <details className="service-row" key={service.title} open={full || index === 0}><summary><span className="service-number">(0{index + 1})</span><span className="service-name">{service.title}</span><span className="service-toggle" aria-hidden="true">+</span></summary><div className="service-details"><p>{service.summary}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><Link href="/work" aria-label={`View projects using ${service.title.toLowerCase()}`}><Arrow diagonal /></Link></div></details>)}</div><div className="services-footer"><p>Tools change.<br />The problem is still the starting point.</p><Link href="/services" className="text-link">Explore my approach <Arrow diagonal /></Link></div></div></section>;
}
