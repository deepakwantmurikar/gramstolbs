/* Generates a branded featured image for a blog article.

   This is a designed graphic — title, an eyebrow label, and up to three stat
   chips, in the site's own palette and type — not a photograph of anything.
   It never claims to be evidence of anything the way a photo would, so unlike
   the author portrait or the scale photos, generating this is not a
   representation problem: it's the same kind of thing as the OG share image
   already on the site, just one per article instead of one for the whole
   site.

   Renders via headless Chrome so the output is a real PNG a browser can
   decode instantly, at 1200x630 — the same dimensions as the site's OG image,
   so this file doubles as that article's og:image too.

   Usage (called from publish-article.js, or standalone):
     node tools/lib/featured-image.js --title "..." --eyebrow "..." \
       --stat1 "500 g|1.1023 lb" --out assets/img/blog/my-slug.png
*/

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser'
  ];
  let found = candidates.find((c) => fs.existsSync(c));

  // Playwright's bundled Chromium, present in some CI/sandbox environments
  // (PLAYWRIGHT_BROWSERS_PATH), where no system Chrome is installed.
  if (!found) {
    const pwRoot = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    if (fs.existsSync(pwRoot)) {
      const versionDir = fs.readdirSync(pwRoot).find((d) => d.startsWith('chromium-'));
      if (versionDir) {
        const candidate = path.join(pwRoot, versionDir, 'chrome-linux', 'chrome');
        if (fs.existsSync(candidate)) found = candidate;
      }
    }
  }
  if (!found) {
    throw new Error(
      'No Chrome/Edge executable found. Set CHROME_PATH to its full path, e.g.\n' +
      '  CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" node tools/lib/featured-image.js ...'
    );
  }
  return found;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Deliberately does NOT render the article title into the image.

   The first version did — modelled on the homepage's og-image.png, which
   works there because that image is never shown inline on the page it
   represents, only in social-share previews. A blog article is different:
   this same file is both the og:image AND the in-page lead figure sitting
   directly under the real <h1>. Baking the title in meant the same headline
   appeared twice in a row — once as real text, once oversized and half
   illegible inside a screenshot. This is a data card instead: eyebrow +
   stat readouts, which say something the H1 doesn't and are legible at
   thumbnail size too. Social platforms already show og:title as separate
   text next to the image, so nothing is lost there either. */
function template({ eyebrow, stats }) {
  const cards = (stats || []).slice(0, 3).map((s) => {
    const [label, value] = s.split('|');
    return `<div class="c"><span class="l">${esc(label)}</span><span class="v">${esc(value)}</span></div>`;
  }).join('');

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#F4F5F2;font-family:'Plus Jakarta Sans',sans-serif;
       display:flex;flex-direction:column;align-items:center;justify-content:center;
       padding:0 84px;position:relative;overflow:hidden}
  .bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:#A87C32}
  .eyebrow{display:inline-flex;align-items:center;gap:12px;background:#F7F0E4;border:1px solid rgba(168,124,50,.28);
       color:#8A6425;font-size:24px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;
       padding:14px 28px;border-radius:999px;margin-bottom:56px;max-width:920px;text-align:center}
  .eyebrow i{width:11px;height:11px;border-radius:50%;background:#A87C32;display:block;flex:0 0 auto}
  .cards{display:flex;gap:24px}
  .c{background:#fff;border:1px solid #E4E7E3;border-radius:18px;padding:30px 26px;
     box-shadow:0 3px 8px rgba(21,26,33,.05),0 16px 36px rgba(21,26,33,.08);text-align:center}
  .l{display:block;font-size:17px;letter-spacing:.1em;text-transform:uppercase;color:#4A5560;font-weight:600;margin-bottom:12px;white-space:nowrap}
  .v{font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:34px;font-weight:600;color:#151A21;letter-spacing:-.02em;white-space:nowrap}
  .domain{position:absolute;left:84px;bottom:48px;font-size:24px;font-weight:700;color:#151A21;display:flex;align-items:center;gap:10px}
  .domain .arrow{color:#A87C32}
  .scale{position:absolute;right:64px;bottom:44px;opacity:.5}
</style></head>
<body>
  <div class="bar"></div>

  <span class="eyebrow"><i></i> ${esc(eyebrow || 'gramstolbs.com')}</span>
  ${cards ? `<div class="cards">${cards}</div>` : ''}

  <span class="domain">Grams<span class="arrow">&rarr;</span>Lbs</span>
  <svg class="scale" width="120" height="120" viewBox="0 0 32 32" fill="none" stroke="#A87C32" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 7.5v17"/><path d="M11 25.5h10"/><path d="M5 10.5h22"/>
    <path d="M7.5 10.5 4.5 17M7.5 10.5 10.5 17"/><path d="M24.5 10.5 21.5 17M24.5 10.5 27.5 17"/>
    <path d="M3 17h9M20 17h9"/><circle cx="16" cy="10.5" r="2.4"/>
  </svg>
</body></html>
`;
}

function renderFeaturedImage({ title, eyebrow, stats, out }) {
  if (!title) throw new Error('renderFeaturedImage requires a title');
  if (!out) throw new Error('renderFeaturedImage requires an output path');

  const chrome = findChrome();
  const tmpHtml = path.join(os.tmpdir(), 'featured-' + Date.now() + '.html');
  fs.writeFileSync(tmpHtml, template({ title, eyebrow, stats }), 'utf8');

  fs.mkdirSync(path.dirname(out), { recursive: true });

  const rootFlags = (process.getuid && process.getuid() === 0) ? ['--no-sandbox'] : [];

  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    ...rootFlags,
    '--virtual-time-budget=6000',
    '--window-size=1200,630',
    '--screenshot=' + out,
    tmpHtml
  ], { stdio: 'pipe' });

  fs.unlinkSync(tmpHtml);

  if (!fs.existsSync(out) || fs.statSync(out).size < 1000) {
    throw new Error('Featured image render produced no usable output at ' + out);
  }
  return out;
}

module.exports = { renderFeaturedImage };

/* CLI entry point, so this can be run standalone as well as required. */
if (require.main === module) {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i === -1 ? undefined : args[i + 1];
  };
  const stats = [get('--stat1'), get('--stat2'), get('--stat3')].filter(Boolean);
  try {
    const out = renderFeaturedImage({
      title: get('--title'),
      eyebrow: get('--eyebrow'),
      stats,
      out: get('--out')
    });
    console.log('Featured image written: ' + out);
  } catch (e) {
    console.error('Failed: ' + e.message);
    process.exit(1);
  }
}
