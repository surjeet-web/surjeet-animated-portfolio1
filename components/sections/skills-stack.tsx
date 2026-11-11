import { SectionLabel, Arrow } from '@/components/primitives/ui';
import { skillGroups, learningFocus } from '@/content/skills';
import '@/styles/focused-home.css';

export function SkillsStack() {
  return <section className="skills-stack wrap section-space" id="skills" aria-labelledby="skills-heading">
    <div className="section-top"><SectionLabel number="01">SKILLS & TECH STACK</SectionLabel><span className="eyebrow">WHAT I USE. WHAT I’M LEARNING.</span></div>
    <div className="skills-stack-heading"><h2 id="skills-heading" className="section-heading">A full-stack foundation.<br /><i>A cloud-focused next step.</i></h2><p>My existing tools and experience, with my current learning goals kept separate.</p></div>
    <div className="skills-stack-grid">{skillGroups.map((group, index) => <article className="skill-group" key={group.id} data-reveal><div className="skill-group-top"><span>0{index + 1}</span><Arrow diagonal /></div><h3>{group.title}</h3><p>{group.description}</p><ul aria-label={`${group.title} technologies`}>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    <aside className="learning-focus" aria-labelledby="learning-heading"><div><span className="learning-status"><span aria-hidden="true" />{learningFocus.label}</span><h3 id="learning-heading">Go. Distributed systems.<br /><em>Next: cloud engineering.</em></h3></div><div><p>{learningFocus.description}</p><span className="learning-note">Learning in progress — not a claim of production cloud experience.</span></div></aside>
  </section>;
}
