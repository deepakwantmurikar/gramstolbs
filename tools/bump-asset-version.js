/* Updates the ?v=<hash> cache-busting query string on index.html's asset
   links to match the current content of style.css/convert.js/app.js.

   Every other page picks this up automatically via tools/lib/site.js's
   assetVersion() at build time. index.html is hand-maintained and has no
   build step, so it needs this run explicitly whenever style.css, convert.js
   or app.js changes — otherwise the fix that made every other page immune
   to stale CDN caching (2026-09-02) quietly stops covering the homepage,
   the same way the Blog nav link did.

   Run: node tools/bump-asset-version.js
*/

const fs = require('fs');
const path = require('path');
const lib = require('./lib/site');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');

function main() {
  let html = fs.readFileSync(INDEX, 'utf8');

  // Force a fresh read of each file's content rather than any cached hash
  const cssV = require('crypto').createHash('md5')
    .update(fs.readFileSync(path.join(ROOT, 'assets/css/style.css'))).digest('hex').slice(0, 8);
  const convertV = require('crypto').createHash('md5')
    .update(fs.readFileSync(path.join(ROOT, 'assets/js/convert.js'))).digest('hex').slice(0, 8);
  const appV = require('crypto').createHash('md5')
    .update(fs.readFileSync(path.join(ROOT, 'assets/js/app.js'))).digest('hex').slice(0, 8);

  html = html.replace(
    /href="assets\/css\/style\.css(\?v=[a-f0-9]+)?"/,
    `href="assets/css/style.css?v=${cssV}"`
  );
  html = html.replace(
    /src="assets\/js\/convert\.js(\?v=[a-f0-9]+)?"/,
    `src="assets/js/convert.js?v=${convertV}"`
  );
  html = html.replace(
    /src="assets\/js\/app\.js(\?v=[a-f0-9]+)?"/,
    `src="assets/js/app.js?v=${appV}"`
  );

  fs.writeFileSync(INDEX, html, 'utf8');
  console.log('index.html asset versions updated:');
  console.log('  style.css   -> ' + cssV);
  console.log('  convert.js  -> ' + convertV);
  console.log('  app.js      -> ' + appV);
}

main();
