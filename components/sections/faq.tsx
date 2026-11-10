import { SectionLabel } from '@/components/primitives/ui';

export interface FaqItem { question: string; answer: string }
export function Faq({ items, title = 'Good questions.\nStraight answers.' }: { items: FaqItem[]; title?: string }) {
  if (!items.length) return null;
  return <section className="faq-section wrap section-space" aria-labelledby="faq-heading"><div><SectionLabel number="↳">A LITTLE CLARITY</SectionLabel><h2 id="faq-heading" className="section-heading">{title.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2></div><div className="faq-list">{items.map((item, i) => <details key={item.question}><summary><span className="faq-number">0{i + 1}</span><span>{item.question}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>;
}
