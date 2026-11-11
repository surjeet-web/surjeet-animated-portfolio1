import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidence = path.join(app, '.local', 'evidence');
await mkdir(evidence, { recursive: true });
const content = JSON.parse(await readFile(path.join(app, 'content/portfolio.json'), 'utf8'));
const walk = async root => { const files=[]; for(const entry of await readdir(root,{withFileTypes:true})){if(['node_modules','.next','.git','.local'].includes(entry.name))continue;const absolute=path.join(root,entry.name);if(entry.isDirectory())files.push(...await walk(absolute));else files.push(absolute);}return files; };
const issues=[];
const sources=(await walk(app)).filter(file=>/\.(tsx?|css)$/.test(file)&&!file.includes(`${path.sep}tests${path.sep}`));
for(const file of sources){const text=await readFile(file,'utf8');if(/dangerouslySetInnerHTML|<iframe|api\.telegram\.org|googletagmanager|hello@crency|GivTrade|HikeMind|My Hair PL|Crency/.test(text))issues.push({file:path.relative(app,file),type:'forbidden-or-stale-content'});}
for(const project of content.projects){if(project.visibility==='private'&&(project.repositoryUrl||/github\.com/.test(JSON.stringify(project))))issues.push({project:project.id,type:'private-source-link'});}
const aiAssetsRoot=path.join(app,'public/assets/uiux');
for(const file of await walk(aiAssetsRoot)){const bytes=await readFile(file);if(bytes.length>130000)issues.push({file:path.relative(app,file),type:'oversize-uiux-asset'});}
const assets=[];
for(const file of await walk(path.join(app,'public'))){const relative=path.relative(path.join(app,'public'),file).replaceAll('\\','/');if(relative.startsWith('assets/wf/')||relative.startsWith('assets/derived/'))issues.push({file:relative,type:'retired-agency-media'});const bytes=await readFile(file);assets.push({path:'/'+relative,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
const routes=['/','/about','/services','/experience','/ai-design','/work','/contact','/privacy',...content.projects.map(project=>'/work/'+project.id)];
const result={timestamp:new Date().toISOString(),scope:'Personal portfolio output only. Original download and previous agency evidence are not changed by this audit.',contentRoutes:routes.length,projects:content.projects.length,privateProjects:content.projects.filter(p=>p.visibility==='private').length,authoredCodeFiles:sources.length,assets,issues,status:issues.length?'failed':'passed'};
await writeFile(path.join(evidence,'personal-output-audit.json'),JSON.stringify(result,null,2));
await writeFile(path.join(evidence,'personal-output-routes.json'),JSON.stringify(routes,null,2));
console.log(JSON.stringify({...result,assets:assets.length},null,2));
if(issues.length)process.exitCode=1;
