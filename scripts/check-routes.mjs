import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidence = path.join(app, '.local', 'evidence');
await mkdir(evidence, { recursive: true });
const content = JSON.parse(await readFile(path.join(app, 'content/portfolio.json'), 'utf8'));
const routes = ['/', '/about', '/services', '/experience', '/ai-design', '/contact', '/privacy', '/work', ...content.projects.map(project => `/work/${project.id}`)];
const base = process.env.CHECK_URL ?? 'http://127.0.0.1:3100';
const visit = (node, fn) => { fn(node); for (const child of node.childNodes ?? []) visit(child, fn); };
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const results = [];
const issues = [];
const known = new Set([...routes, content.profile.resumePath]);
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  const document = parse(await response.text());
  let h1 = ''; let title = ''; let mainCount = 0; let h1Count = 0; let robots = ''; let main;
  const projectCounts = new Map();
  const sectionIds = new Set();
  visit(document, node => {
    const attrs = Object.fromEntries((node.attrs ?? []).map(attr => [attr.name, attr.value]));
    if (attrs.id) sectionIds.add(attrs.id);
    if (attrs['data-project']) projectCounts.set(attrs['data-project'], (projectCounts.get(attrs['data-project']) ?? 0) + 1);
    if (node.tagName === 'h1') { h1 += text(node); h1Count++; }
    if (node.tagName === 'title') title = text(node);
    if (node.tagName === 'main') { mainCount++; main = node; }
    if (node.tagName === 'meta' && attrs.name === 'robots') robots = attrs.content;
    if (node.tagName === 'a' && attrs.href?.startsWith('/') && !attrs.href.startsWith('//')) {
      const target = new URL(attrs.href, base).pathname;
      if (!known.has(target) && !target.startsWith('/assets/')) issues.push({ route, type: 'unknown-internal-link', href: attrs.href });
    }
  });
  const bodyText = main ? text(main) : '';
  if (/Crency|HikeMind|GivTrade|My Hair PL|hello@crency/.test(bodyText)) issues.push({ route, type: 'agency-content' });
  if (/Offshoot|Shyam Technical|customer support|technical support|sales calling/i.test(bodyText)) issues.push({ route, type: 'removed-experience' });
  if (route === '/ai-design' && (!bodyText.includes('ChatGPT') || !bodyText.includes('Stitch') || !bodyText.includes('AI helps me explore') || !bodyText.includes('not shipped-product screenshots'))) issues.push({ route, type: 'missing-ai-design-disclosure' });
  if (route === '/') {
    for (const project of content.projects) if (projectCounts.get(project.id) !== 1) issues.push({ route, type: 'project-not-shown-once', project: project.id, count: projectCounts.get(project.id) ?? 0 });
    for (const id of ['skills', 'experience', 'selected-work']) if (!sectionIds.has(id)) issues.push({ route, type: 'missing-section', id });
    if (!bodyText.includes('IQSetters') || !bodyText.includes('Go') || !bodyText.includes('distributed systems')) issues.push({ route, type: 'missing-current-direction' });
  }
  const passed = response.status === 200 && h1Count === 1 && mainCount === 1 && title.includes('Surjeet') && robots.includes('noindex');
  results.push({ route, statusCode: response.status, h1Count, mainCount, title, h1: h1.trim(), robots, status: passed ? 'passed' : 'failed' });
}
const retired = [];
for (const route of ['/work/bmw-m-concept', '/journal/why-different-sells', '/this-page-does-not-exist']) { const response = await fetch(base + route); retired.push({ route, statusCode: response.status, status: response.status === 404 ? 'passed' : 'failed' }); }
const journal = await fetch(base + '/journal', { redirect: 'manual' });
const resume = await fetch(base + content.profile.resumePath);
const bytes = Buffer.from(await resume.arrayBuffer());
const summary = { timestamp: new Date().toISOString(), method: 'HTTP + parsed landmarks, metadata, links, personal content, retired pages and PDF download', origin: base, routeCount: routes.length, passed: results.filter(row => row.status === 'passed').length, issues, retired, journalRedirect: { statusCode: journal.status, location: journal.headers.get('location') }, resume: { statusCode: resume.status, contentType: resume.headers.get('content-type'), bytes: bytes.length, validPdf: bytes.subarray(0,5).toString() === '%PDF-' }, routes: results };
await writeFile(path.join(evidence, 'personal-route-integration.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (summary.passed !== routes.length || issues.length || retired.some(row=>row.status==='failed') || !summary.resume.validPdf) process.exitCode = 1;
