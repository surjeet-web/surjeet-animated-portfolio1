import { z } from 'zod';
import source from './portfolio.json';

const projectSchema = z.object({
  id: z.string(), title: z.string(), tagline: z.string(), category: z.string(),
  visibility: z.enum(['public', 'private']), status: z.string(), featured: z.boolean(),
  stack: z.array(z.string()), summary: z.string(), problem: z.string(),
  highlights: z.array(z.string()), engineeringFocus: z.string(), scopeNote: z.string(),
  sourceLabel: z.string(), repositoryUrl: z.string().url().optional(),
  cta: z.object({ label: z.string(), href: z.string() }),
});

export type PortfolioProject = z.infer<typeof projectSchema> & {
  slug: string; shortTitle: string; image: string; imageAlt: string; color: string; headline: string;
};

const artwork: Record<string, { shortTitle: string; color: string; headline: string }> = {
  'workforce-payroll': { shortTitle: 'Workforce & Payroll', color: '#c3a4ed', headline: 'Workflow.\nNot guesswork.' },
  'offline-finance': { shortTitle: 'Offline Finance', color: '#d5f387', headline: 'Every cent.\nIn its place.' },
  diskdoom: { shortTitle: 'DiskDoom', color: '#ff9e84', headline: 'Find space.\nNot surprises.' },
  'code-snippet-manager': { shortTitle: 'Snippet Manager', color: '#b4bfef', headline: 'Good code.\nWithin reach.' },
  'field-service': { shortTitle: 'Field Service', color: '#efbad7', headline: 'Keep work\nmoving.' },
};

export const projects: PortfolioProject[] = z.array(projectSchema).parse(source.projects).map((project) => ({
  ...project, slug: project.id, ...artwork[project.id],
  image: `/assets/portfolio/${project.id}.svg`,
  imageAlt: `Illustrated overview of ${project.title}; conceptual artwork, not an application screenshot`,
}));
export const profile = source.profile;
export const about = source.about;
export const capabilities = source.capabilities;
export const contact = source.contact;
export const experience = source.experience;
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
export const resumePath = source.profile.resumePath;
export const personalRoutes = ['/', '/about', '/services', '/experience', '/ai-design', '/work', '/contact', '/privacy', ...projects.map((project) => `/work/${project.slug}`)];

export const aboutFaqs = [
  { question: 'What kind of role are you looking for?', answer: 'Junior full-stack roles and trainee cloud engineering opportunities where I can contribute my internship and project experience while learning from experienced teammates.' },
  { question: 'What are you studying?', answer: 'I’m pursuing a Bachelor of Computer Applications at Shoolini University. I’m currently learning Go and distributed systems as I work toward a cloud engineering path; these are learning areas, not professional cloud experience.' },
  { question: 'How do you use AI in your work?', answer: 'I use Claude Code, MCP integrations, custom skills, and n8n to support repeatable development tasks. The implementation still needs review, debugging, and validation; I do not treat generated code as automatically correct.' },
];
export const projectFaqs = [
  { question: 'Can I see the source?', answer: 'Public projects link directly to their repositories. Private projects have high-level case studies only; I do not publish private source or customer data.' },
  { question: 'Are these production products?', answer: 'Each case study states its current scope. Prototype, local-first, and development projects are labeled accordingly. The presence of test files is not a claim that every build or test has passed.' },
];
