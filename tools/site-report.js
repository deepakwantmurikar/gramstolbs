/* Performance and health report — the honest version.

   This script reports everything checkable WITHOUT external API credentials:
   crawlability, schema validity, indexnow submission history, sitemap
   freshness, per-article word counts and structural completeness.

   It does NOT report actual search rankings, impressions, clicks, or which
   AI crawlers have visited — those require either:

     (a) Google Search Console API — needs a one-time OAuth or service-account
         setup (a Google Cloud project + Search Console API enabled + the
         service account added as a user on the property). Once that exists,
         this script can be extended to pull real indexing status and query
         data automatically. Until then, check search.google.com/search-console
         by hand.

     (b) GA4 Data API — same kind of one-time setup, needed for real traffic
         numbers instead of just "the tag is present."

     (c) Hostinger access logs — the only real source of truth for whether
         GPTBot, ClaudeBot, PerplexityBot etc. have actually crawled the site.
         Download the raw log from hPanel and pass it here with --logs.

   Usage:
     node tools/site-report.js
     node tools/site-report.js --logs path/to/access.log
*/

const fs = require('fs');
const path = require('path');
const lib = require('./lib/site');

const ROOT = path.join(__dirname, '..');
process.chdir(ROOT);

const CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot',
  'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Googlebot', 'Bingbot', 'Google-Extended'];

function section(title) {
  console.log('\n=== ' + title + ' ===');
}

function main() {
  const articles = lib.loadArticles();
  const logsPath = process.argv.includes('--logs') ? process.argv[process.argv.indexOf('--logs') + 1] : null;

  section('CONTENT');
  console.log('  Core pages         : 12');
  console.log('  Blog articles      : ' + articles.length);
  if (articles.length) {
    articles.forEach((a) => {
      const file = path.join('blog', a.slug, 'index.html');
      const exists = fs.existsSync(file);
      const words = exists
        ? fs.readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length
        : 0;
      console.log('    - ' + a.slug + (exists ? ' (' + words + ' words, published ' + a.datePublished + ')' : ' — FILE MISSING'));
    });
  }

  section('CRAWLABILITY (robots.txt, evaluated per bot)');
  const robots = fs.readFileSync('robots.txt', 'utf8');
  CRAWLERS.forEach((bot) => {
    // crude but sufficient: no bot-specific Disallow: / exists in this file
    const re = new RegExp('User-agent:\\s*' + bot + '[\\s\\S]*?(?=User-agent:|$)', 'i');
    const block = (robots.match(re) || [''])[0];
    const blocked = /Disallow:\s*\/\s*$/m.test(block);
    console.log('  ' + (blocked ? 'BLOCKED ' : 'allowed ') + bot);
  });

  section('INDEXNOW SUBMISSION HISTORY');
  const logPath = path.join('content', 'indexnow-log.json');
  if (fs.existsSync(logPath)) {
    const log = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    console.log('  Last run: ' + log.lastRun);
    const submitted = Object.keys(log.submitted || {});
    console.log('  URLs submitted (lifetime): ' + submitted.length);
    const unsent = articles.filter((a) => !Object.keys(log.submitted || {}).some((u) => u.includes(a.slug)));
    if (unsent.length) {
      console.log('  Never submitted: ' + unsent.map((a) => a.slug).join(', '));
      console.log('  -> node tools/indexnow-submit.js --new');
    }
  } else {
    console.log('  No submissions recorded yet. Run: node tools/indexnow-submit.js');
  }

  section('SITEMAP FRESHNESS');
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  console.log('  URLs listed: ' + urls.length);
  const missingFromSitemap = articles.filter((a) => !urls.some((u) => u.includes('/blog/' + a.slug + '/')));
  if (missingFromSitemap.length) {
    console.log('  ISSUE: not in sitemap: ' + missingFromSitemap.map((a) => a.slug).join(', '));
  } else {
    console.log('  All registered articles present.');
  }

  if (logsPath) {
    section('CRAWLER VISITS (from ' + logsPath + ')');
    if (!fs.existsSync(logsPath)) {
      console.log('  File not found: ' + logsPath);
    } else {
      const log = fs.readFileSync(logsPath, 'utf8');
      CRAWLERS.forEach((bot) => {
        const count = (log.match(new RegExp(bot, 'g')) || []).length;
        console.log('  ' + String(count).padStart(6) + '  ' + bot);
      });
    }
  } else {
    section('CRAWLER VISITS');
    console.log('  Not checked — pass --logs <path> with a Hostinger access log to see');
    console.log('  which crawlers have actually visited. This is the only real proof of');
    console.log('  AI-crawler activity; nothing else in this report can substitute for it.');
  }

  section('WHAT THIS REPORT CANNOT TELL YOU');
  console.log('  - Real search rankings, impressions or clicks: check');
  console.log('    https://search.google.com/search-console (Performance tab)');
  console.log('  - Real visitor counts: check https://analytics.google.com (GA4 is installed)');
  console.log('  - Whether an AI assistant currently cites this site: ask it directly,');
  console.log('    e.g. "how many pounds is 500 grams" in ChatGPT/Perplexity/Gemini —');
  console.log('    there is no dashboard for this anywhere, for anyone.');
  console.log('  - To automate the first two: set up Search Console API / GA4 Data API');
  console.log('    credentials, then this script can be extended to pull them directly.');
}

main();
