import type { Metadata } from 'next';
import { SectionLabel, Star } from '@/components/primitives/ui';
import { ContactLinks } from '@/components/widgets/contact-links';
import { contact } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Contact Surjeet', description: 'Connect with Surjeet about junior full-stack or trainee cloud engineering opportunities. A full-stack fresher currently learning Go and distributed systems.' };
export default function ContactPage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="↗">THE NEXT CONVERSATION</SectionLabel><p className="eyebrow">OPEN TO JUNIOR FULL-STACK & CLOUD TRAINEE ROLES</p></div><h1>Good ideas.<br /><em>Let’s talk.</em></h1></section><section className="contact-layout wrap"><div className="contact-intro"><Star /><h2>{contact.heading}</h2>{contact.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="contact-expectations"><h3>A role. A project. Room to grow.</h3><p>Tell me about the application work or trainee opportunity, the team, and what the next step looks like.</p><p className="local-note">Based in New Delhi, India. Currently pursuing a BCA at Shoolini University.</p></div></div><ContactLinks /></section></main>;
}
