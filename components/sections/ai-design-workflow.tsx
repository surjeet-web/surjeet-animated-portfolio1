import Image from 'next/image';
import Link from 'next/link';
import { Arrow, SectionLabel, Star } from '@/components/primitives/ui';
import { aiDesignDisclosure, aiDesignGallery, aiDesignSteps, stitchStudies } from '@/content/ai-design';
import '@/styles/ai-design.css';

export function AiDesignWorkflow({ compact = false }: { compact?: boolean }) {
  const gallery = compact ? aiDesignGallery.slice(0, 6) : aiDesignGallery;
  return <section className={`ai-design-workflow${compact ? ' ai-design-compact' : ''}`} id="ai-design" aria-labelledby="ai-design-heading">
    <div className="wrap ai-design-intro"><div><SectionLabel number="04" light>AI-ASSISTED UI/UX WORKFLOW</SectionLabel><h2 id="ai-design-heading">AI helps me explore.<br /><em>I decide what survives.</em></h2></div><div><p>I use ChatGPT to clarify product questions, screen states, content and critique prompts. I use Stitch to explore visual directions and flow coverage. Then I compare, edit, simplify, and translate the selected direction into a system I can implement.</p>{compact && <Link href="/ai-design" className="text-link">See the full workflow <Arrow diagonal /></Link>}</div></div>
    <div className="wrap ai-workflow-steps">{aiDesignSteps.map(step => <article key={step.number} data-reveal><span>{step.number}</span><h3>{step.title}</h3><p>{step.summary}</p><dl><dt>AI contribution</dt><dd>{step.chatgptRole}</dd><dt>My contribution</dt><dd>{step.judgment}</dd></dl></article>)}</div>
    <div className="ai-gallery" aria-label="Selected AI-assisted UI and visual-system explorations">{gallery.map((item, index) => <figure key={item.src} className={`ai-gallery-item ai-gallery-${(index % 4) + 1}`} data-reveal><div><Image src={item.src} alt={item.alt} width={512} height={512} sizes="(max-width: 640px) 86vw, (max-width: 1000px) 44vw, 28vw" /></div><figcaption><span>{String(index + 1).padStart(2, '0')} / {item.category}</span><strong>{item.title}</strong></figcaption></figure>)}</div>
    <div className="wrap stitch-studies"><div className="section-top"><SectionLabel number="↳" light>STITCH PROJECT STUDIES</SectionLabel><span className="eyebrow">LINKED CONCEPT WORKSPACES</span></div><div>{stitchStudies.map(study => <a href={study.url} target="_blank" rel="noreferrer" key={study.id} className="stitch-study"><span className="eyebrow">{study.scope}</span><h3>{study.title}</h3><p>{study.summary}</p><ul>{study.focus.map(focus => <li key={focus}>{focus}</li>)}</ul><span className="stitch-open">Open Stitch project <Arrow diagonal /></span></a>)}</div></div>
    <div className="wrap ai-disclosure"><Star /><p>{aiDesignDisclosure}</p></div>
  </section>;
}
