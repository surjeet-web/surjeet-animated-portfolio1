import Link from 'next/link';
import { Arrow } from '@/components/primitives/ui';

export default function NotFound() {
  return <main id="main" className="wrap not-found"><p className="display-heading">404</p><h1>A little off the beaten path.</h1><p>This page isn’t here. But there’s plenty of good work to get you back on track.</p><Link className="button-link button-dark" href="/">Back to the good stuff <Arrow diagonal /></Link></main>;
}
