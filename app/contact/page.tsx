import type { Metadata } from 'next';
import { SectionLabel, Star } from '@/components/primitives/ui';
import { ContactLinks } from '@/components/widgets/contact-links';
import { contact } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Contact Surjeet', description: 'Get in touch about a junior developer role, software engineering trainee opportunity, or a focused development project.' };
export default function ContactPage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="↗">THE NEXT CONVERSATION</SectionLabel><p className="eyebrow">OPEN TO JUNIOR DEVELOPER & TRAINEE ROLES</p></div><h1>Good ideas.<br /><em>Let’s talk.</em></h1></section><section className="contact-layout wrap"><div className="contact-intro"><Star /><h2>{contact.heading}</h2>{contact.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="contact-expectations"><h3>A role. A project. A useful problem.</h3><p>Tell me what you’re building, what you need help with, and what the next step looks like.</p><p className="local-note">Based in New Delhi, India. Currently pursuing a BCA at Shoolini University.</p></div></div><ContactLinks /></section></main>;
}
