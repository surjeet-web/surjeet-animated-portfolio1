import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MotionObserver } from '@/components/motion/motion-observer';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { FloatingDock } from '@/components/motion/floating-dock';
import { profile } from '@/content/portfolio';
import '@/styles/tokens.css';
import '@/styles/globals.css';
import '@/styles/pages.css';
import '@/styles/motion.css';
import '@/styles/playful.css';
import '@/styles/expressive.css';
import '@/styles/experience.css';
import '@/styles/immersive.css';
import '@/styles/personal.css';
import '@/styles/focused-home.css';

const plex = localFont({ src: '../public/assets/fonts/IBMPlexSans-VF-s1.woff2', variable: '--font-sans', weight: '100 700', display: 'swap', fallback: ['Arial'] });
const nauryz = localFont({ src: '../public/assets/fonts/NauryzRedKeds-s1.woff2', variable: '--font-character', weight: '400', display: 'swap' });
const thunder = localFont({ src: '../public/assets/fonts/Thunder-VF-s1.woff2', variable: '--font-display', weight: '100 900', display: 'swap', fallback: ['Impact'] });

export const metadata: Metadata = {
  title: { default: profile.seoTitle, template: '%s — Surjeet' },
  description: profile.seoDescription,
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${plex.variable} ${thunder.variable} ${nauryz.variable}`}><body><Header />{children}<Footer /><MotionObserver /><SmoothScroll /><FloatingDock /></body></html>;
}
