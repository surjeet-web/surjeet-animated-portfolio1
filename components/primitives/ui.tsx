import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`arrow ${className}`}><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Star({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <svg className={`studio-star ${className}`} style={style} aria-hidden="true" viewBox="0 0 100 100"><path d="M45 0h10v31L77 9l7 7-22 22h31v10H62l22 22-7 7-22-22v31H45V55L23 77l-7-7 22-22H7V38h31L16 16l7-7 22 22Z" fill="currentColor" transform="translate(0 7)" /></svg>;
}

export function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? ' section-label-light' : ''}`}><span className="index-number">{number}</span><span>{children}</span></div>;
}

export function TextLink({ href, children, className = '', diagonal = false }: { href: string; children: ReactNode; className?: string; diagonal?: boolean }) {
  return <Link href={href} className={`text-link ${className}`}><span>{children}</span><Arrow diagonal={diagonal} /></Link>;
}

export function ButtonLink({ href, children, dark = true, className = '' }: { href: string; children: ReactNode; dark?: boolean; className?: string }) {
  return <Link href={href} className={`button-link ${dark ? 'button-dark' : 'button-light'} ${className}`}><span>{children}</span><Arrow diagonal /></Link>;
}
