import http from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidence = path.join(app, '.local', 'evidence', 'browser');
await mkdir(evidence, { recursive: true });
const axe = await readFile(path.join(app, 'node_modules/axe-core/axe.min.js'));
http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3100');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') { response.writeHead(204).end(); return; }
  if (request.method === 'GET' && request.url === '/axe.js') { response.writeHead(200, { 'Content-Type': 'text/javascript' }).end(axe); return; }
  if (request.method !== 'POST') { response.writeHead(404).end(); return; }
  const name = new URL(request.url, 'http://127.0.0.1').pathname.slice(1);
  if (!/^[a-z0-9-]{1,100}$/.test(name)) { response.writeHead(400).end(); return; }
  let size = 0; const chunks = [];
  for await (const chunk of request) { size += chunk.length; if (size > 5000000) { response.writeHead(413).end(); return; } chunks.push(chunk); }
  try { const data = JSON.parse(Buffer.concat(chunks).toString()); await writeFile(path.join(evidence, `${name}.json`), JSON.stringify(data, null, 2)); response.writeHead(200).end('recorded'); }
  catch { response.writeHead(400).end(); }
}).listen(3103, '127.0.0.1', () => console.log('Local test evidence collector http://127.0.0.1:3103; no external services'));
