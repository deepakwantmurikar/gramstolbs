/* Submits URLs to IndexNow — the real, working half of "search engine
   indexing." IndexNow is a shared protocol Bing, Yandex and a few others
   read from; there is no equivalent submission API for Google (use Search
   Console for that, manually or via its own API — see below) and there is
   no submission API of any kind for ChatGPT, Perplexity or Gemini, because
   those are retrieval systems that crawl on their own schedule, not
   search indexes you register content with.

   Usage:
     node tools/indexnow-submit.js                      submit every URL in sitemap.xml
     node tools/indexnow-submit.js <url> [<url> ...]     submit specific URLs only
     node tools/indexnow-submit.js --new                 submit only articles published
                                                          since the last successful run
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const SITE = 'gramstolbs.com';
const LOG = path.join(ROOT, 'content', 'indexnow-log.json');

function findKeyFile() {
  const files = fs.readdirSync(ROOT).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!files.length) {
    console.error('No IndexNow key file found at the site root (expects a 32-char hex .txt file).');
    console.error('Generate one with: node -e "console.log(require(\'crypto\').randomBytes(16).toString(\'hex\'))" > <key>.txt');
    process.exit(1);
  }
  return files[0].replace('.txt', '');
}

function urlsFromSitemap() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

function loadLog() {
  if (!fs.existsSync(LOG)) return { lastRun: null, submitted: {} };
  return JSON.parse(fs.readFileSync(LOG, 'utf8'));
}

function saveLog(log) {
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  fs.writeFileSync(LOG, JSON.stringify(log, null, 2) + '\n', 'utf8');
}

function submit(urlList, key) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: SITE,
      key,
      keyLocation: `https://${SITE}/${key}.txt`,
      urlList
    });
    const req = https.request('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  const key = findKeyFile();

  let urls;
  if (args.includes('--new')) {
    const log = loadLog();
    const lib = require('./lib/site');
    const articles = lib.loadArticles();
    urls = articles
      .filter((a) => !log.submitted[a.slug])
      .map((a) => `https://${SITE}/blog/${a.slug}/`);
    if (!urls.length) {
      console.log('Nothing new to submit — every registered article has already been submitted.');
      console.log('Last run: ' + (log.lastRun || 'never'));
      return;
    }
  } else if (args.length && !args[0].startsWith('--')) {
    urls = args;
  } else {
    urls = urlsFromSitemap();
  }

  console.log('Submitting ' + urls.length + ' URL(s) to IndexNow (covers Bing, Yandex and other participants):');
  urls.forEach((u) => console.log('  ' + u));

  const status = await submit(urls, key);
  const ok = status === 200 || status === 202;
  console.log('');
  console.log('IndexNow response: ' + status + (ok ? ' (accepted)' : ' — check the URL list and key file'));

  if (ok) {
    const log = loadLog();
    log.lastRun = new Date().toISOString();
    urls.forEach((u) => { log.submitted[u] = log.lastRun; });
    saveLog(log);
  }

  console.log('');
  console.log('This does NOT cover Google — Bing/IndexNow and Google Search Console are');
  console.log('separate systems. Submit new URLs in Search Console too (URL Inspection >');
  console.log('Request Indexing), or set up the Search Console API for programmatic');
  console.log('submission (needs a one-time OAuth/service-account setup on your side).');
  console.log('');
  console.log('There is no submission step for ChatGPT, Perplexity or Gemini. They crawl');
  console.log('on their own schedule if robots.txt allows them (it does — checked by');
  console.log('tools/audit.js). Verify they have actually visited with:');
  console.log('  node tools/site-report.js --logs <path-to-hostinger-access-log>');
}

main().catch((e) => { console.error('Failed: ' + e.message); process.exit(1); });
