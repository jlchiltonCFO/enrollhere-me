import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const routes = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/training.html', 'training.html'],
  ['/privacy.html', 'privacy.html'], ['/terms.html', 'terms.html'],
  ['/accessibility.html', 'accessibility.html'], ['/404.html', '404.html'],
  ['/styles.css', 'styles.css'], ['/app.js', 'app.js'], ['/training.js', 'training.js'],
  ['/robots.txt', 'robots.txt']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = routes.get(pathname);
  if (!file) { const data = await readFile(path.join(root, '404.html')); res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(data); return; }
  try { const data = await readFile(path.join(root, file)); res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(data); }
  catch { res.writeHead(500); res.end('Unable to load preview'); }
}).listen(4196, '127.0.0.1', () => console.log('EnrollHere.me preview: http://127.0.0.1:4196'));
