# Surjeet — animated personal portfolio

This is Surjeet’s new animated personal portfolio, built with Next.js App Router, React and TypeScript. It is separate from the older deployed portfolio.

The repository is private. The source reference, research notes and previous-build backups are not included.

## Run

```sh
gh repo clone surjeet-web/surjeet-animated-portfolio1
cd surjeet-animated-portfolio1
npm ci
npm run dev
```

Open **http://127.0.0.1:3100/**.

```powershell
npm run build
npm run start
```

Dev and production both use loopback port 3100; stop one before starting the other. Node 22.20.0 and npm 11.6.1 were used. Pushing this repository does not deploy or update the older website.

## Personal content

- Surjeet branding, New Delhi location, full-stack foundation and an entry-level cloud-engineering direction.
- Go and distributed systems are explicitly marked as current learning areas.
- One homepage project collection, with each of the five projects shown once.
- Five selected projects: Workforce & Payroll, Offline Finance, DiskDoom, Code Snippet Manager, and Field Service.
- Full case studies with implementation highlights, technology, and honest scope notes.
- Public GitHub links only; private projects have generic descriptions and no source disclosure.
- IQSetters full-stack internship only; BCA education and supplied achievements.
- Dedicated AI-assisted UI/UX workflow: ChatGPT for brief/critique support, three linked Stitch concept workspaces, and a curated gallery covering mobile flows, landing pages, icon systems, and asset studies.
- Downloadable supplied résumé at `/Surjeet_Resume.pdf`; the previous résumé URL redirects here.
- Email, GitHub, LinkedIn and copy-email contact actions. No form backend or automatic submissions.

## Animations preserved

Full-canvas split-letter hero, animated SVG line, floating badges, eye-following mascot, restrained section and project reveals, magnetic controls, smooth desktop scrolling, mobile menu, page-transition bands, motion pause and reduced-motion fallbacks. Repeated homepage project stages, horizontal story, and flipping deck are no longer mounted; the homepage now prioritizes the objective, skills, IQSetters experience and one project collection. Animated process tabs remain on the detailed skills page.

## Content and visuals

`content/portfolio.json` is the reviewed editorial content. `content/portfolio.ts` validates project fields and adds visual mappings. New project illustrations are generated with `npm run artwork` into `public/assets/portfolio/`; they are explicitly labeled as illustrations, not fake application screenshots. No old agency client images or testimonials are presented as Surjeet’s work.

Previous agency-only components, data, client media, and the mock form were removed from this app and retained in a separate local backup. They are not uploaded with this repository. Old agency project/article routes return 404; `/journal` redirects to `/experience`.

## Routes

Home `/`, projects `/work`, five `/work/[slug]` case studies, `/about`, `/services` (skills), `/experience`, `/ai-design` (AI-assisted UI/UX workflow), `/contact`, `/privacy`: **13 content routes**.

## Editing

- `components/motion/immersive-hero.tsx`: main animated identity.
- `app/page.tsx`: homepage composition.
- `content/portfolio.json`: personal/project copy.
- `components/sections/experience-timeline.tsx`: employment timeline.
- `components/widgets/contact-links.tsx`: direct contact controls.
- `styles/personal.css`: personal typography/layout adjustments over the retained animation-led design system.
- `content/skills.ts` and `components/sections/skills-stack.tsx`: explicit tech stack and current learning focus.
- `content/ai-design.ts` and `components/sections/ai-design-workflow.tsx`: source-backed workflow copy, Stitch links, and curated UI explorations.
- `public/assets/uiux/`: ten selected, flattened workflow boards supplied by the owner; treat them as design explorations, not implemented-product screenshots.
- `styles/focused-home.css`: simplified homepage layout.
- `styles/ai-design.css`: workflow steps, visual gallery, and Stitch-study layout.
- `public/Surjeet_Resume.pdf`: current supplied résumé download.

## Verify

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run audit:output
npm run audit:routes
```

`audit:routes` requires a running server and checks personal-page HTTP status, H1/main landmarks, metadata, internal links, retired agency routes and the résumé PDF. `audit:output` checks for old agency identity, private repository links and old client imagery. It does not make claims about external production performance or repository tests that were not run.

The development-only `/__evidence/*` rewrite can use `node scripts/evidence-server.mjs` for local accessibility/geometry measurements. It is absent from production and has no remote service. Audit and browser reports are created automatically in `.local/evidence/`, which is excluded from Git.

## Publication boundaries

Preview is noindex. No public deployment was requested. Review rights to the retained supplied fonts and private project summaries before publication. Metrics retained from the résumé are self-reported; new project copy avoids unverified latency/capacity/production claims. The old deployed workers.dev portfolio is not changed.
