'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from '@/components/primitives/ui';

const links = [{ href: '/work', label: 'Projects', count: '↗' }, { href: '/about', label: 'About' }, { href: '/services', label: 'Skills' }, { href: '/experience', label: 'Experience' }];

export function Header() {
  const path = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const animationVersion = useRef(0);
  useEffect(() => {
    const element = menu.current;
    animationVersion.current++;
    element?.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    element?.close();
    document.body.style.overflow = '';
    return () => { element?.getAnimations({ subtree: true }).forEach((animation) => animation.cancel()); document.body.style.overflow = ''; };
  }, [path]);
  async function closeMenu() {
    const element = menu.current;
    if (!element?.open) return;
    const version = ++animationVersion.current;
    element.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { await element.animate([{ opacity: 1, clipPath: 'inset(0 0 0 0)' }, { opacity: .7, clipPath: 'inset(0 0 100% 0)' }], { duration: 330, easing: 'cubic-bezier(.76,0,.24,1)' }).finished; } catch { return; }
    }
    if (version !== animationVersion.current) return;
    element.close(); setOpen(false); document.body.style.overflow = ''; trigger.current?.focus();
  }
  function openMenu() {
    const element = menu.current;
    animationVersion.current++;
    element?.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    element?.showModal(); setOpen(true); document.body.style.overflow = 'hidden';
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    element.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 620, easing: 'cubic-bezier(.76,0,.24,1)' });
    element.querySelectorAll('nav a').forEach((link, index) => link.animate([{ transform: 'translateY(80px) rotate(5deg)', opacity: 0 }, { transform: 'translateY(0) rotate(0)', opacity: 1 }], { duration: 680, delay: 120 + index * 80, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <Link href="/" className="wordmark" aria-label="Surjeet home">surjeet<span className="wordmark-dot">↗</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href} aria-current={path.startsWith(link.href) ? 'page' : undefined}>{link.label}{link.count && <sup>{link.count}</sup>}</Link>)}</nav>
      <Link className="header-cta" href="/contact">Let’s talk <span><Arrow diagonal /></span></Link>
      <button className="menu-trigger" ref={trigger} onClick={openMenu} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"><span /><span /></button>
    </header>
    <dialog id="mobile-menu" className="mobile-menu" ref={menu} onCancel={(event) => { event.preventDefault(); void closeMenu(); }} onClose={() => { setOpen(false); document.body.style.overflow = ''; }}>
      <div className="mobile-menu-top"><Link href="/" className="wordmark" onClick={closeMenu}>surjeet<span className="wordmark-dot">↗</span></Link><button onClick={closeMenu} aria-label="Close menu" className="close-menu">×</button></div>
      <nav aria-label="Mobile navigation">{links.map((link, index) => <Link key={link.href} href={link.href} onClick={closeMenu}><small>0{index + 1}</small>{link.label}<Arrow diagonal /></Link>)}</nav>
      <Link href="/contact" className="mobile-contact" onClick={closeMenu}>Have a role in mind?<br /><span>Let’s build something useful. <Arrow diagonal /></span></Link>
      <p className="eyebrow">New Delhi. Always learning.</p>
    </dialog>
  </>;
}
