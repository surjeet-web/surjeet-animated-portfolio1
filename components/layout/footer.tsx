import Link from 'next/link';
import { Arrow, Star } from '@/components/primitives/ui';
import { profile, resumePath } from '@/content/portfolio';

export function Footer() {
  return <footer className="site-footer personal-footer"><div className="wrap">
    <div className="footer-top"><p className="eyebrow"><span className="status-dot" /> Open to junior developer & trainee roles.</p><a href={`mailto:${profile.email}`} className="footer-email">{profile.email} <Arrow diagonal /></a></div>
    <Link className="footer-invitation" href="/contact"><span>Good ideas.<br /><i>Let’s build.</i></span><span className="footer-invitation-arrow"><Arrow diagonal /></span></Link>
    <div className="footer-middle"><p>New Delhi, India.<br />A little better with every build.</p><nav aria-label="Footer navigation"><Link href="/work">Projects</Link><Link href="/about">About</Link><Link href="/experience">Experience</Link><a href={resumePath} download>Résumé</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></nav><Star /></div>
    <div className="footer-wordmark" aria-hidden="true">surjeet<span>↗</span></div>
    <div className="footer-bottom"><p>© 2026 Surjeet.</p><span>Full-stack development · Practical automation</span><Link href="/privacy">Privacy <Arrow diagonal /></Link></div>
  </div></footer>;
}
