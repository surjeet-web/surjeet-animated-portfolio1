import type { Metadata } from 'next';
import { SectionLabel, Star } from '@/components/primitives/ui';
import { WorkExplorer } from '@/components/widgets/work-explorer';
import { projects } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Selected projects', description: 'Five selected projects by Surjeet: workforce workflows, offline-first finance, DiskDoom, browser-local snippets, and field-service operations.' };
export default function WorkPage() {
  return <main id="main"><section className="page-hero wrap"><div className="page-hero-top"><SectionLabel number="01">SELECTED PROJECTS</SectionLabel><p className="eyebrow">THE WHY. THE HOW. THE WORK.</p></div><h1>Built with<br /><em>a purpose.</em></h1><div className="page-hero-intro"><p>Five projects, from full-stack business workflows to native tools. Each case study explains the implementation, the engineering focus, and its current scope.</p><Star /></div></section><WorkExplorer projects={projects} /></main>;
}
