/* Tiny static file server for local checking.

   The site needs no server to work — it runs from disk too — but serving it
   over HTTP mirrors production more closely: directory URLs like /about/
   resolve to their index.html, and robots.txt, sitemap.xml and llms.txt are
   returned with the right content types.

   Run:   node tools/serve.js
   Then:  http://localhost:8080
   Stop:  Ctrl+C
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2]) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch (e) {
    res.writeHead(400); return res.end('Bad request');
  }

  /* Resolve inside ROOT only — never serve a path that escapes the project */
  let file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403); return res.end('Forbidden');
  }

  /* A directory (or a bare path) serves its index.html */
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }

  /* Serve the real 404 page, matching what .htaccess does on the live host */
  if (!fs.existsSync(file)) {
    const custom = path.join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    if (fs.existsSync(custom)) return fs.createReadStream(custom).pipe(res);
    return res.end('<h1>404 &mdash; ' + urlPath + ' not found</h1>');
  }

  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log('');
  console.log('  gramstolbs.com running locally');
  console.log('  ---------------------------------------------');
  console.log('  http://localhost:' + PORT + '/');
  console.log('');
  console.log('  Stop the server with Ctrl+C');
  console.log('');
});
