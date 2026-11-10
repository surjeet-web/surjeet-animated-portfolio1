# Surjeet — animated personal portfolio

This is Surjeet’s new animated personal portfolio, built with Next.js App Router, React and TypeScript. It is separate from the older deployed portfolio.

The repository is private. The source reference, research notes and previous-build backups are not included.

## Run

```sh
gh repo clone surjeet-web/surjeet-animated-portfolio
cd surjeet-animated-portfolio
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

- Surjeet branding, New Delhi location, focused junior full-stack positioning.
- Five selected projects: Workforce & Payroll, Offline Finance, DiskDoom, Code Snippet Manager, and Field Service.
- Full case studies with implementation highlights, technology, and honest scope notes.
- Public GitHub links only; private projects have generic descriptions and no source disclosure.
- IQSetters, Shyam Technical, and Offshoot experience; BCA education; supplied achievements.
- Downloadable one-page résumé at `/Surjeet_Full_Stack_Resume.pdf`.
- Email, GitHub, LinkedIn and copy-email contact actions. No form backend or automatic submissions.

## Animations preserved

Full-canvas split-letter hero, animated SVG line, floating badges, eye-following mascot, scroll-assembled icons, perspective project stage, moving marquees, horizontal project story, draggable card flips, animated process tabs, magnetic controls, smooth desktop scrolling, mobile menu, page-transition bands, motion pause and reduced-motion fallbacks.

## Content and visuals

`content/portfolio.json` is the reviewed editorial content. `content/portfolio.ts` validates project fields and adds visual mappings. New project illustrations are generated with `npm run artwork` into `public/assets/portfolio/`; they are explicitly labeled as illustrations, not fake application screenshots. No old agency client images or testimonials are presented as Surjeet’s work.

Previous agency-only components, data, client media, and the mock form were removed from this app and retained in a separate local backup. They are not uploaded with this repository. Old agency project/article routes return 404; `/journal` redirects to `/experience`.

## Routes

Home `/`, projects `/work`, five `/work/[slug]` case studies, `/about`, `/services` (capabilities), `/experience`, `/contact`, `/privacy`: **12 content routes**.

## Editing

- `components/motion/immersive-hero.tsx`: main animated identity.
- `app/page.tsx`: homepage composition.
- `content/portfolio.json`: personal/project copy.
- `components/sections/experience-timeline.tsx`: employment timeline.
- `components/widgets/contact-links.tsx`: direct contact controls.
- `styles/personal.css`: personal typography/layout adjustments over the retained animation-led design system.
- `public/Surjeet_Full_Stack_Resume.pdf`: résumé download.

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
