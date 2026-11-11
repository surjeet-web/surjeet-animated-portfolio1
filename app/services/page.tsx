import type { Metadata } from 'next';
import { SectionLabel, Star } from '@/components/primitives/ui';
import { SkillsStack } from '@/components/sections/skills-stack';
import { ProcessPlayground } from '@/components/motion/process-playground';
import { Faq } from '@/components/sections/faq';
import { aboutFaqs } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Skills & tech stack', description: 'Surjeet’s full-stack tech stack, development tools, AI-assisted workflows, and current learning focus: Go and distributed systems toward cloud engineering.' };
const process = [
  { title: 'Understand the task.', steps: ['Start with the user, the workflow, and the constraints', 'Map the data and the important state changes', 'Make scope and assumptions explicit'] },
  { title: 'Make it work.', steps: ['Build a small, useful vertical slice', 'Use typed interfaces and reusable components', 'Keep error and empty states part of the design'] },
  { title: 'Check the result.', steps: ['Review generated code rather than trusting it by default', 'Test the business rules and edge cases', 'Verify the browser, the build, and the handoff'] },
];
export default function ServicesPage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="03">SKILLS & TECH STACK</SectionLabel><p className="eyebrow">START WITH THE PROBLEM. CHOOSE THE TOOLS.</p></div><h1>Build it.<br /><em>Think it through.</em></h1><div className="page-hero-intro"><p>Full-stack tools I use today, and the Go and distributed-systems concepts I’m learning for a cloud-engineering path.</p><Star /></div></section><SkillsStack /><ProcessPlayground /><section className="process-section wrap section-space"><div className="section-top"><SectionLabel number="↳">MY WORKING PROCESS</SectionLabel><p>Clear scope.<br />Small steps. Real checks.</p></div><h2 className="section-heading">From a rough idea<br />to a useful <i>implementation.</i></h2><div className="process-grid">{process.map((step, index) => <article key={step.title}><span className="process-number">0{index + 1}<span>↗</span></span><h3>{step.title}</h3><ol>{step.steps.map((item) => <li key={item}>{item}</li>)}</ol></article>)}</div></section><Faq items={aboutFaqs} /></main>;
}
