export const skillGroups = [
  {
    id: 'frontend',
    title: 'Languages & frontend',
    description: 'Building typed, responsive interfaces for the web.',
    skills: ['TypeScript', 'JavaScript', 'HTML & CSS', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    description: 'Connecting interfaces to APIs, workflows, and persistent data.',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'SQLite', 'Prisma', 'Supabase'],
  },
  {
    id: 'tooling',
    title: 'Development tools',
    description: 'Tools I use across development and delivery.',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'Vite'],
  },
  {
    id: 'automation',
    title: 'AI & automation',
    description: 'Supporting repeatable development tasks, with review and validation.',
    skills: ['Claude Code', 'MCP integrations', 'Custom skills', 'n8n', 'Multi-model workflows'],
  },
] as const;

export const learningFocus = {
  label: 'Currently learning',
  topics: ['Go', 'Distributed systems'],
  direction: 'Moving toward cloud engineering',
  description: 'I’m building on my full-stack experience while learning Go and distributed systems. My goal is an entry-level or trainee opportunity where I can develop practical cloud-engineering skills.',
} as const;
