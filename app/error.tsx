'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="wrap not-found"><p className="eyebrow">A SMALL INTERRUPTION</p><h1>Something didn’t load.</h1><p>Give it another try. Your next good idea can wait a moment.</p><button className="button-link button-dark" onClick={reset}>Try again <span aria-hidden="true">↗</span></button></main>;
}
