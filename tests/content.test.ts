import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { projects, profile, experience, personalRoutes, getProject, resumePath } from '../content/portfolio';
import { skillGroups, learningFocus } from '../content/skills';

const app = process.cwd();
describe('Surjeet personal portfolio', () => {
  it('features five unique personal projects across twelve content routes', () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map(project => project.slug)).size).toBe(5);
    expect(personalRoutes).toHaveLength(12);
    expect(projects.map(project => project.slug)).toEqual(['workforce-payroll','offline-finance','diskdoom','code-snippet-manager','field-service']);
  });
  it('provides real local illustrations with an honest image label', () => {
    for (const project of projects) {
      expect(existsSync(path.join(app,'public',project.image))).toBe(true);
      expect(project.imageAlt).toContain('not an application screenshot');
      const svg = readFileSync(path.join(app,'public',project.image),'utf8');
      expect(svg).toContain('NOT AN APPLICATION SCREENSHOT');
      expect(svg).not.toMatch(/<script|onload=|<foreignObject/);
    }
  });
  it('does not publish private repository URLs or mistake prototypes for production systems', () => {
    expect(projects.filter(project => project.visibility === 'private')).toHaveLength(3);
    for (const project of projects.filter(project => project.visibility === 'private')) {
      expect(project.repositoryUrl).toBeUndefined();
      expect(project.cta.href).toMatch(/^\/contact/);
      expect(project.sourceLabel).toContain('high-level');
      expect(JSON.stringify(project)).not.toMatch(/github\.com\/surjeet-web\/(hrm-system|ledgerly|serviceflow-os-rn)/);
    }
  });
  it('uses the reviewed public repository links and safe missing-project behavior', () => {
    expect(getProject('diskdoom')?.repositoryUrl).toBe('https://github.com/surjeet-web/DiskDoom');
    expect(getProject('code-snippet-manager')?.repositoryUrl).toBe('https://github.com/surjeet-web/Code-Snippet-Manager');
    expect(getProject('bmw-m-concept')).toBeUndefined();
    expect(getProject('not-a-project')).toBeUndefined();
  });
  it('preserves personal contact and supplied employment dates', () => {
    expect(profile.name).toBe('Surjeet');
    expect(profile.email).toBe('codieshiv.web@gmail.com');
    expect(experience.find(job=>job.company==='IQSetters')?.dates).toBe('Dec 2025 – Jun 2026');
    expect(experience).toHaveLength(1);
    expect(experience[0].company).toBe('IQSetters');
    expect(experience[0].bullets).toHaveLength(3);
    expect(JSON.stringify({ profile, experience })).not.toMatch(/Shyam|Offshoot|customer support|sales/i);
    expect(profile.intro).toMatch(/learning Go and distributed systems/);
    expect(profile.intro).toMatch(/cloud engineering/);
  });
  it('ships the actual one-page resume PDF', () => {
    const pdf=readFileSync(path.join(app,'public',resumePath));
    expect(pdf.subarray(0,5).toString()).toBe('%PDF-');
    expect(resumePath).toBe('/Surjeet_Resume.pdf');
    expect(pdf.length).toBeGreaterThan(1000);
    expect(existsSync(path.join(app, 'public/Surjeet_Full_Stack_Resume.pdf'))).toBe(false);
  });
  it('shows the project collection once and puts skills and experience before it', () => {
    const homepage = readFileSync(path.join(app, 'app/page.tsx'), 'utf8');
    expect(homepage.match(/projects\.map\(/g)).toHaveLength(1);
    expect(homepage.match(/id="selected-work"/g)).toHaveLength(1);
    expect(homepage).not.toMatch(/WorkJourney|ProjectDeck|feature-stage|BrandStory|ProcessPlayground|ServicesOverview/);
    expect(homepage).toContain('<SkillsStack />');
    expect(homepage).toContain('<ExperienceTimeline compact />');
    expect(homepage.indexOf('<SkillsStack />')).toBeLessThan(homepage.indexOf('id="selected-work"'));
    expect(homepage.indexOf('<ExperienceTimeline compact />')).toBeLessThan(homepage.indexOf('id="selected-work"'));
  });
  it('separates current learning from established skills', () => {
    expect(skillGroups).toHaveLength(4);
    expect(learningFocus.label).toBe('Currently learning');
    expect(learningFocus.topics).toEqual(['Go', 'Distributed systems']);
    expect(skillGroups.flatMap(group => [...group.skills])).not.toContain('Go');
    expect(learningFocus.direction).toBe('Moving toward cloud engineering');
  });
  it('has no old client media or agency content in routed pages', () => {
    expect(existsSync(path.join(app,'public/assets/wf'))).toBe(false);
    const walk=(dir:string):string[]=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
    const source=walk(path.join(app,'app')).filter(file=>file.endsWith('.tsx')).map(file=>readFileSync(file,'utf8')).join('\n');
    expect(source).not.toMatch(/Crency|GivTrade|HikeMind|My Hair PL|BMW M|hello@crency/);
    expect(source).not.toContain('dangerouslySetInnerHTML');
    expect(source).not.toContain('site-content');
  });
});
