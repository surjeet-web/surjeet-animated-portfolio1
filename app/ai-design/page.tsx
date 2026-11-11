import type { Metadata } from 'next';
import { AiDesignWorkflow } from '@/components/sections/ai-design-workflow';
import { SectionLabel, Star } from '@/components/primitives/ui';

export const metadata: Metadata = { title: 'AI-assisted UI/UX workflow', description: 'How Surjeet uses ChatGPT and Stitch for product framing, UI direction exploration, critique, and design-system thinking—while keeping final design decisions and claims explicit.' };
export default function AiDesignPage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="04">AI + UI/UX</SectionLabel><p className="eyebrow">IDEATION. CRITIQUE. CURATION. IMPLEMENTATION.</p></div><h1>Use AI.<br /><em>Keep judgment.</em></h1><div className="page-hero-intro"><p>A documented design workflow spanning mobile flows, landing pages, icon systems, and enterprise workspaces. AI expands the options; I structure the problem, judge the result, and decide what moves forward.</p><Star /></div></section><AiDesignWorkflow /></main>;
}
