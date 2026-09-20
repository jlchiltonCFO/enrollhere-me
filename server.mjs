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
  ['/robots.txt', 'robots.txt'],
  ['/assets/enrollhere-wordmark.png', 'assets/enrollhere-wordmark.png'],
  ['/assets/enrollhere-app-icon.png', 'assets/enrollhere-app-icon.png']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png' };
http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = routes.get(pathname);
  if (!file) { const data = await readFile(path.join(root, '404.html')); res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(data); return; }
  try { const data = await readFile(path.join(root, file)); res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(data); }
  catch { res.writeHead(500); res.end('Unable to load preview'); }
}).listen(Number(process.env.ENROLLHERE_PORT || 4196), '127.0.0.1', () => {
  console.log(`EnrollHere.me preview: http://127.0.0.1:${process.env.ENROLLHERE_PORT || 4196}`);
});
