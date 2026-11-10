'use client';

import { useState } from 'react';
import { Arrow } from '@/components/primitives/ui';
import { profile, resumePath } from '@/content/portfolio';

export function ContactLinks() {
  const [message, setMessage] = useState('');
  async function copyEmail() { try { await navigator.clipboard.writeText(profile.email); setMessage('Email address copied.'); } catch { setMessage('Clipboard is unavailable. You can select the email address above.'); } }
  return <div className="personal-contact-links"><a className="contact-destination" href={`mailto:${profile.email}`}><span className="eyebrow">EMAIL</span><strong>{profile.email}</strong><Arrow diagonal /></a><div className="copy-email-row"><button onClick={copyEmail}>Copy email address <span aria-hidden="true">⧉</span></button><span role="status">{message}</span></div><a className="contact-destination" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="eyebrow">LINKEDIN</span><strong>Let’s connect.</strong><Arrow diagonal /></a><a className="contact-destination" href={profile.github} target="_blank" rel="noreferrer"><span className="eyebrow">GITHUB</span><strong>Explore the code.</strong><Arrow diagonal /></a><a className="contact-destination" href={resumePath} download><span className="eyebrow">RÉSUMÉ · PDF</span><strong>The short version.</strong><span aria-hidden="true">↓</span></a><p className="contact-privacy-note">Email opens your mail app. Nothing is sent automatically; there is no contact-data collection on this page.</p></div>;
}
