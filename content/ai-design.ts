export const aiDesignSteps = [
  {
    number: '01',
    title: 'Frame the problem',
    summary: 'I start with the user, the core task, platform constraints, and the states a useful flow needs.',
    chatgptRole: 'ChatGPT helps turn a rough idea into a structured brief, open questions, and a screen/state checklist.',
    judgment: 'I decide the scope, remove unsupported ideas, and keep the flow tied to one clear job.',
  },
  {
    number: '02',
    title: 'Explore directions',
    summary: 'I use Stitch to generate multiple screen or landing-page directions from a more specific prompt.',
    chatgptRole: 'The prompt includes hierarchy, content density, navigation, platform, tone, and important empty or error states.',
    judgment: 'Generated directions are options—not approvals. I compare them and reject the weak patterns.',
  },
  {
    number: '03',
    title: 'Critique and refine',
    summary: 'I review layout hierarchy, copy density, component consistency, transitions between screens, and whether the next action is obvious.',
    chatgptRole: 'ChatGPT can challenge the flow with edge cases and critique questions; Stitch provides revised visual alternatives.',
    judgment: 'I select, combine, rewrite, and simplify. The final direction comes from those decisions, not from accepting the first output.',
  },
  {
    number: '04',
    title: 'Turn it into a system',
    summary: 'The chosen direction becomes reusable typography, color, spacing, components, states, and responsive rules.',
    chatgptRole: 'AI helps enumerate implementation states and handoff details when useful.',
    judgment: 'I translate the concept into components and check what remains unproven: accessibility, usability, responsiveness, or production behavior.',
  },
] as const;

export const stitchStudies = [
  {
    id: 'enterprise-analytics',
    title: 'Enterprise Sales Analytics Workspace',
    url: 'https://stitch.google.com/projects/5513451392199853223',
    scope: 'Desktop enterprise UI',
    summary: 'A dense sales workspace with dashboards, opportunity and lead views, account records, a pipeline board, report views, and detail screens.',
    focus: ['Information hierarchy', 'Dense data layouts', 'Tables and drill-down paths', 'Shared navigation patterns'],
  },
  {
    id: 'mobility-app',
    title: 'BlueRide Mobile Interface Rebuild',
    url: 'https://stitch.google.com/projects/2371316225682304226',
    scope: 'Mobile product flow',
    summary: 'A mobility concept explored across booking, listings, payment, messaging, settings, onboarding, offline, empty, loading, expired-session, and failure states.',
    focus: ['End-to-end flows', 'Empty/loading/error states', 'Bottom-sheet interactions', 'Mobile navigation consistency'],
  },
  {
    id: 'hrm-operations',
    title: 'HRM & Operations UI Exploration',
    url: 'https://stitch.google.com/projects/13573221424900352535',
    scope: 'Business operations UI',
    summary: 'A broad operations workspace covering employee directories, recruitment, payroll, attendance, leave approvals, finance, leads, property inventory, and role-specific dashboards.',
    focus: ['Role-based workspaces', 'Operational states', 'Mobile dashboard density', 'Cross-module consistency'],
  },
] as const;

export const aiDesignGallery = [
  { src: '/assets/uiux/pawpair-wireframe.webp', title: 'PawPair — low-fidelity flow', category: 'Mobile wireframe', alt: 'Three pencil-style PawPair mobile wireframes for registration, password reset, and swipe-based pet discovery.' },
  { src: '/assets/uiux/pawpair-polished.webp', title: 'PawPair — refined direction', category: 'Mobile refinement', alt: 'Polished PawPair account creation, password reset, and dog discovery screens with cyan actions and a photo card.' },
  { src: '/assets/uiux/cloud-computer-landing.webp', title: 'Cloud Computer', category: 'Landing-page system', alt: 'Long-form cloud-computing landing-page concept with pastel sky colors, product explanations, trust blocks, and calls to action.' },
  { src: '/assets/uiux/human-machine-landing.webp', title: 'Human + machine', category: 'Landing-page direction', alt: 'Experimental technology landing-page concept exploring a human-and-machine intelligence theme.' },
  { src: '/assets/uiux/meme-tokeniser-landing.webp', title: 'Meme Tokeniser', category: 'Product storytelling', alt: 'Web3 product landing-page concept for turning memes into tokens, presented as a long-form marketing page.' },
  { src: '/assets/uiux/water-purification-landing.webp', title: 'Water purification', category: 'Landing-page direction', alt: 'Water-purification landing-page concept using a product narrative, benefits, and calls to action.' },
  { src: '/assets/uiux/crypto-icon-system.webp', title: 'Crypto icon language', category: 'Icon exploration', alt: 'Grid of purple and blue glowing crypto icons covering wallets, security, analytics, networks, and code.' },
  { src: '/assets/uiux/isometric-component-system.webp', title: 'Isometric components', category: 'Component exploration', alt: 'Isometric technology and finance components explored as a reusable visual system.' },
  { src: '/assets/uiux/diskdoom-asset-board.webp', title: 'DiskDoom asset board', category: 'Product assets', alt: 'Visual asset board for DiskDoom, exploring storage, scanning, and system utility imagery.' },
  { src: '/assets/uiux/feature-icon-system.webp', title: 'Feature icon system', category: 'Icon exploration', alt: 'Green isometric feature icons developed as a coordinated product-illustration system.' },
] as const;

export const aiDesignDisclosure = 'These are AI-assisted design explorations and flattened presentation boards—not shipped-product screenshots, user-tested outcomes, or proof of production behavior. ChatGPT and Stitch support ideation and iteration; I make the product, hierarchy, curation, and implementation decisions.';
