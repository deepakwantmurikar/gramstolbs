/* Pre-deployment audit. Read-only — reports, never edits.
   Run: node tools/audit.js  */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
process.chdir(ROOT);

const lib = require('./lib/site');

const PAGES = [
  'index.html',
  'lbs-to-grams/index.html',
  'methodology/index.html',
  'editorial-policy/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy-policy/index.html',
  'terms/index.html',
  'guides/baby-weight-grams-to-pounds/index.html',
  'guides/gold-grams-to-pounds-troy/index.html',
  'guides/shipping-weight-grams-to-pounds/index.html',
  'guides/food-label-grams-to-pounds/index.html',
  'blog/index.html'
/* Blog articles are appended below from the registry, so a new article is
   audited automatically the next time this runs — nothing to edit here. */
].concat(lib.loadArticles().map((a) => 'blog/' + a.slug + '/index.html'));

const norm = (s) => s.split(path.sep).join('/');
const live = (p) => fs.readFileSync(p, 'utf8').replace(/<!--[\s\S]*?-->/g, '');

function resolveRef(fromFile, ref) {
  const dir = path.dirname(fromFile);
  const clean = ref.split('#')[0];
  if (!clean) return null;
  let t = clean.startsWith('/') ? path.join('.', clean) : path.join(dir, clean);
  t = path.normalize(t);
  if (clean.endsWith('/') || !path.extname(clean)) t = path.join(t, 'index.html');
  return norm(t).replace(/^\.\//, '');
}

let issues = 0;
const flag = (msg) => { issues++; console.log('  ISSUE: ' + msg); };

/* ---- internal linking / orphans ---- */
console.log('=== INTERNAL LINKING ===');
const inbound = {};
PAGES.forEach((p) => (inbound[p] = 0));
PAGES.forEach((pg) => {
  const h = live(pg);
  const refs = [...new Set((h.match(/href="([^"]+)"/g) || []).map((m) => m.slice(6, -1)))]
    .filter((r) => !/^(https?:|mailto:|#|data:)/.test(r));
  refs.forEach((r) => {
    const t = resolveRef(pg, r);
    if (t && t in inbound && t !== pg) inbound[t]++;
  });
});
Object.entries(inbound).sort((a, b) => a[1] - b[1]).forEach(([p, n]) => {
  console.log('  ' + String(n).padStart(3) + ' inbound  ' + p);
  if (n === 0) flag('orphan page, nothing links to ' + p);
});

/* ---- images ---- */
console.log('\n=== IMAGES ===');
let imgs = 0;
PAGES.concat(['404.html']).forEach((p) => {
  (live(p).match(/<img[^>]*>/g) || []).forEach((i) => {
    imgs++;
    if (!/alt=/.test(i)) flag('image without alt in ' + p);
    if (!/width=/.test(i) || !/height=/.test(i)) flag('image without width/height in ' + p);
  });
});
console.log('  ' + imgs + ' images checked');

/* ---- head tags ---- */
console.log('\n=== HEAD TAGS ===');
const titles = {};
PAGES.forEach((p) => {
  const h = fs.readFileSync(p, 'utf8');
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const d = (h.match(/name="description" content="(.*?)"/) || [])[1] || '';
  titles[t] = (titles[t] || 0) + 1;
  if (!t) flag('no <title> on ' + p);
  if (t.length > 60) flag('title over 60 chars (' + t.length + ') on ' + p);
  if (!d) flag('no meta description on ' + p);
  if (d.length > 155) flag('description over 155 chars (' + d.length + ') on ' + p);
  if (!/rel="canonical"/.test(h)) flag('no canonical on ' + p);
  if (!/og:image/.test(h)) flag('no og:image on ' + p);
  if ((h.match(/<h1/g) || []).length !== 1) flag('h1 count is not 1 on ' + p);
  if (!/<html lang="/.test(h)) flag('no lang attribute on ' + p);
  const m = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) flag('no JSON-LD on ' + p);
  else { try { JSON.parse(m[1]); } catch (e) { flag('invalid JSON-LD on ' + p); } }
});
Object.entries(titles).filter(([, c]) => c > 1).forEach(([t]) => flag('duplicate title: ' + t));
console.log('  ' + PAGES.length + ' pages checked');

/* ---- canonical correctness ---- */
console.log('\n=== CANONICAL URLS ===');
PAGES.forEach((p) => {
  const h = fs.readFileSync(p, 'utf8');
  const c = (h.match(/rel="canonical" href="(.*?)"/) || [])[1] || '';
  const expected = 'https://gramstolbs.com/' + (p === 'index.html' ? '' : path.dirname(p).split(path.sep).join('/') + '/');
  if (c !== expected) flag('canonical mismatch on ' + p + '\n         got      ' + c + '\n         expected ' + expected);
});
console.log('  checked');

/* ---- sitemap ---- */
console.log('\n=== SITEMAP ===');
const sm = fs.readFileSync('sitemap.xml', 'utf8');
const locs = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
PAGES.forEach((p) => {
  const url = 'https://gramstolbs.com/' + (p === 'index.html' ? '' : norm(path.dirname(p)) + '/');
  if (!locs.includes(url)) flag('page missing from sitemap: ' + url);
});
if (locs.some((l) => /404|test\.html/.test(l))) flag('sitemap lists a page that should not be indexed');
console.log('  ' + locs.length + ' URLs listed');

/* ---- crawler files ---- */
console.log('\n=== CRAWLER FILES ===');
['robots.txt', 'sitemap.xml', 'llms.txt', 'ads.txt', '404.html', '.htaccess'].forEach((f) => {
  if (!fs.existsSync(f)) flag('missing file: ' + f);
});
const robots = fs.readFileSync('robots.txt', 'utf8');
if (!/Sitemap:\s*https:\/\/gramstolbs\.com\/sitemap\.xml/.test(robots)) flag('robots.txt does not point at the sitemap');
if (/Disallow:\s*\/\s*$/m.test(robots)) flag('robots.txt contains a blanket Disallow');

/* llms.txt should reference every indexable page */
const llms = fs.readFileSync('llms.txt', 'utf8');
PAGES.forEach((p) => {
  const url = 'https://gramstolbs.com/' + (p === 'index.html' ? '' : norm(path.dirname(p)) + '/');
  if (!llms.includes(url)) flag('llms.txt does not list ' + url);
});
console.log('  checked');

/* ---- test.html indexability ---- */
console.log('\n=== TEST PAGE ===');
const th = fs.readFileSync('test.html', 'utf8');
if (!/name="robots"[^>]*noindex/.test(th)) flag('test.html is publicly linked but not marked noindex');
if (!/name="viewport"/.test(th)) flag('test.html has no viewport meta');
console.log('  checked');

console.log('\n' + '='.repeat(46));
console.log(issues === 0 ? 'RESULT: no issues found.' : 'RESULT: ' + issues + ' issue(s) to fix.');
