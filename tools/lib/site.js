/* Shared page-template library for gramstolbs.com.

   This is the single source of truth for the <head>, header, footer, and
   schema fragments used by every generated page. Both tools/build-pages.js
   (the existing 7 pages + 4 guides) and tools/publish-article.js (new blog
   articles) require this module rather than each defining their own copy —
   the earlier version of build-pages.js defined these inline, which meant a
   change to GA_ID or the footer nav would need to be made in two places and
   could silently drift. There is exactly one definition now.

   Nothing in here writes files. It only returns strings and objects.
*/

const fs = require('fs');
const path = require('path');

const SITE = 'https://gramstolbs.com';
const AUTHOR = 'Deepak Wantmurikar';
const EMAIL = 'contact@gramstolbs.com';
const GA_ID = 'G-L125VQ750L';
const ARTICLES_REGISTRY = path.join(__dirname, '..', '..', 'content', 'articles.json');
const PROJECT_ROOT = path.join(__dirname, '..', '..');

/* Cache-busting for style.css / convert.js / app.js.

   .htaccess sets a 30-day CDN cache on these with no revalidation, which is
   good for performance but means a CSS edit alone doesn't reach visitors (or
   even a fresh curl) until 30 days pass, unless the URL itself changes. This
   hashes each file's actual content and appends it as ?v=<hash> — the URL
   only changes when the content does, so an edit busts the cache immediately
   and an unrelated deploy doesn't throw away a cache that's still valid.
   This bit us for real on 2026-09-02: the blog page's CSS additions sat
   correctly on the server but stayed invisible behind a stale 13-day-old
   cached copy until this was added. */
const crypto = require('crypto');
const _assetVersionCache = {};
function assetVersion(relPath) {
  if (_assetVersionCache[relPath]) return _assetVersionCache[relPath];
  try {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, relPath));
    const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
    _assetVersionCache[relPath] = hash;
    return hash;
  } catch (e) {
    return Date.now().toString(36); // file missing at build time — still bust the cache
  }
}

/* The 12 hand-built pages that exist outside the blog registry. Defined once
   here so build-pages.js and publish-article.js write an identical sitemap
   base instead of each keeping their own copy of this list. */
const CORE_PAGES = ['', 'lbs-to-grams', 'methodology', 'editorial-policy', 'about', 'contact',
  'privacy-policy', 'terms',
  'guides/baby-weight-grams-to-pounds', 'guides/gold-grams-to-pounds-troy',
  'guides/shipping-weight-grams-to-pounds', 'guides/food-label-grams-to-pounds']
  .map((u) => ({
    slug: u,
    lastmod: '2026-08-19',
    changefreq: u ? 'yearly' : 'monthly',
    priority: u === '' ? '1.0' : (u === 'lbs-to-grams' ? '0.9' : '0.5')
  }));

/* ---------------------------------------------------------------- chrome -- */

function head(p, page) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">

<!-- Google tag (gtag.js). Loaded async so it never blocks rendering.
     Disclosed in the privacy policy under Cookies and Analytics. -->
<link rel="preconnect" href="https://www.googletagmanager.com">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">

<link rel="icon" href="${p}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p}favicon.svg">
<meta name="theme-color" content="#A87C32">

<link rel="canonical" href="${SITE}/${page.slug}/">

<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:url" content="${SITE}/${page.slug}/">
<meta property="og:site_name" content="gramstolbs.com">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.desc}">
<meta property="og:image" content="${SITE}/assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Grams to Lbs converter — 500 g equals 1.1023 lb, or 1 lb 1.64 oz">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.title}">
<meta name="twitter:description" content="${page.desc}">
<meta name="twitter:image" content="${SITE}/assets/img/og-image.png">

<link rel="stylesheet" href="${p}assets/css/style.css?v=${assetVersion('assets/css/style.css')}">

<script type="application/ld+json">
${JSON.stringify(page.schema, null, 2)}
</script>
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="wrap header-inner">
    <a class="logo" href="${p || './'}">
      <img class="logo-mark" src="${p}assets/img/logo.svg" alt="" width="32" height="32">
      <span class="logo-text">Grams<span class="arrow" aria-hidden="true">&rarr;</span>Lbs</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      <ul>
        <li><a href="${p || './'}"${page.slug === '' ? ' aria-current="page"' : ''}>Grams to Lbs</a></li>
        <li><a href="${p}lbs-to-grams/"${page.slug === 'lbs-to-grams' ? ' aria-current="page"' : ''}>Lbs to Grams</a></li>
        <li><a href="${p}blog/"${page.slug === 'blog' || (page.slug || '').startsWith('blog/') ? ' aria-current="page"' : ''}>Blog</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">`;
}

function foot(p) {
  return `
</main>

<footer class="site-footer">
  <div class="wrap">

    <div class="footer-grid">

      <div class="footer-brand">
        <span class="logo">
          <img class="logo-mark" src="${p}assets/img/logo.svg" alt="" width="32" height="32">
          <span class="logo-text">Grams<span class="arrow" aria-hidden="true">&rarr;</span>Lbs</span>
        </span>
        <p class="footer-desc">A focused grams to pounds converter. Every result is given in
        decimal pounds and in pounds with ounces, calculated in your browser using the exact
        international definition of the pound.</p>
        <span class="footer-fact">1 lb = 453.59237 g exactly</span>
      </div>

      <div class="footer-col">
        <h3>Converters</h3>
        <ul>
          <li><a href="${p || './'}">Grams to Lbs</a></li>
          <li><a href="${p}lbs-to-grams/">Lbs to Grams</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Guides</h3>
        <ul>
          <li><a href="${p}guides/baby-weight-grams-to-pounds/">Baby Birth Weight</a></li>
          <li><a href="${p}guides/gold-grams-to-pounds-troy/">Gold &amp; Troy Ounces</a></li>
          <li><a href="${p}guides/shipping-weight-grams-to-pounds/">Shipping Weight</a></li>
          <li><a href="${p}guides/food-label-grams-to-pounds/">Food Labels</a></li>
          <li><a href="${p}blog/">All Blog Articles</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Trust</h3>
        <ul>
          <li><a href="${p}methodology/">Methodology</a></li>
          <li><a href="${p}editorial-policy/">Editorial Policy</a></li>
          <li><a href="${p}about/">About</a></li>
          <li><a href="${p}contact/">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Legal</h3>
        <ul>
          <li><a href="${p}privacy-policy/">Privacy Policy</a></li>
          <li><a href="${p}terms/">Terms</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; <span id="year">2026</span> gramstolbs.com &middot; Written by ${AUTHOR}</p>
      <p>Every conversion runs in your browser. Nothing you type is sent to a server.</p>
    </div>

  </div>
</footer>

<script src="${p}assets/js/convert.js?v=${assetVersion('assets/js/convert.js')}"></script>
<script src="${p}assets/js/app.js?v=${assetVersion('assets/js/app.js')}"></script>
<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
</body>
</html>
`;
}

/* -------------------------------------------------------------- schema --- */

const ORG = {
  '@type': 'Organization',
  '@id': SITE + '/#org',
  name: 'gramstolbs.com',
  url: SITE + '/',
  email: EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: SITE + '/assets/img/logo.svg',
    width: 32,
    height: 32
  },
  founder: { '@id': SITE + '/#author' }
};

const PERSON = {
  '@type': 'Person',
  '@id': SITE + '/#author',
  name: AUTHOR,
  url: SITE + '/about/',
  jobTitle: 'Web Developer and Blogger',
  description:
    'Web developer and blogger who builds and maintains measurement conversion tools, ' +
    'including gramstolbs.com and gramstocup.com.',
  email: EMAIL,
  image: SITE + '/assets/img/deepak-wantmurikar.jpg',
  sameAs: ['https://gramstocup.com'],
  knowsAbout: [
    'Unit conversion',
    'Weight and mass measurement',
    'Avoirdupois and troy weight systems',
    'Web development'
  ]
};

function crumbs(name, slug) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: name, item: SITE + '/' + slug + '/' }
    ]
  };
}

function breadcrumbHTML(p, label) {
  return `
  <nav class="breadcrumb wrap" aria-label="Breadcrumb">
    <ol>
      <li><a href="${p || './'}">Home</a></li>
      <li aria-current="page">${label}</li>
    </ol>
  </nav>`;
}

/* An Article under /guides/ or /blog/ sits one level deeper than a top-level
   page, so its breadcrumb and schema both carry a middle "section" crumb. */
function articleSchema(opts) {
  return {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      {
        '@type': 'Article',
        headline: opts.title,
        description: opts.desc,
        url: SITE + '/' + opts.slug + '/',
        datePublished: opts.datePublished,
        dateModified: opts.dateModified || opts.datePublished,
        author: { '@id': SITE + '/#author' },
        publisher: { '@id': SITE + '/#org' },
        mainEntityOfPage: SITE + '/' + opts.slug + '/',
        image: {
          '@type': 'ImageObject',
          url: SITE + '/assets/img/og-image.png',
          width: 1200,
          height: 630
        },
        inLanguage: 'en',
        isAccessibleForFree: true,
        keywords: (opts.keywords || []).join(', ')
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: opts.sectionName, item: SITE + '/' + opts.sectionSlug + '/' },
          { '@type': 'ListItem', position: 3, name: opts.title, item: SITE + '/' + opts.slug + '/' }
        ]
      },
      /* Google indexes FAQPage on articles the same as on the homepage,
         provided the questions are genuinely visible on the page (they are —
         the accordion markup, not a hidden duplicate). */
      opts.faqs && opts.faqs.length ? {
        '@type': 'FAQPage',
        mainEntity: opts.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      } : null
    ].filter(Boolean)
  };
}

function articleCrumb(p, sectionLabel, sectionHref, label) {
  return `
  <nav class="breadcrumb wrap" aria-label="Breadcrumb">
    <ol>
      <li><a href="${p}">Home</a></li>
      <li><a href="${p}${sectionHref}">${sectionLabel}</a></li>
      <li aria-current="page">${label}</li>
    </ol>
  </nav>`;
}

function byline(author, dateLabel) {
  return `
    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${author}</span>
      <span>Last updated: ${dateLabel}</span>
    </div>`;
}

function miniConverter(p, text) {
  return `
    <div class="worked" style="border-left-color:var(--brass);">
      ${text}<br>
      <a href="${p}">Open the grams to lbs converter &rarr;</a>
    </div>`;
}

/* An accordion built on <details>, matching the FAQ pattern used sitewide.
   Works with zero JavaScript, unlike a JS-toggled accordion. */
function faqAccordion(faqs) {
  return faqs.map((f) => `
    <details class="faq-item">
      <summary>${f.q}</summary>
      <div class="faq-answer"><p>${f.a}</p></div>
    </details>`).join('\n');
}

/* ------------------------------------------------------------- content --- */
/* Building blocks a blog article body can be assembled from. Every one of
   these reuses CSS classes already defined in assets/css/style.css for the
   existing site (card-grid, table-scroll, worked, faq-item, figure) rather
   than inventing new styling, so a generated article looks native, not
   bolted on. */

function articleTable({ caption, headers, rows, breakout }) {
  const cls = 'table-scroll' + (breakout !== false ? ' breakout' : '');
  return `
    <div class="${cls}">
      <table>
        ${caption ? `<caption>${caption}</caption>` : ''}
        <thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>`;
}

/* A grid of small fact/stat cards, e.g. "quick answers" for several values */
function statCardGrid(cards) {
  return `
    <div class="card-grid">
      ${cards.map((c) => `
      <article class="card stat-card">
        <span class="stat-g">${c.label}</span>
        <span class="stat-lb">${c.value}</span>
        ${c.sub ? `<span class="stat-oz">${c.sub}</span>` : ''}
      </article>`).join('')}
    </div>`;
}

/* A grid of feature/explainer cards with an icon, e.g. "why this matters" */
function featureCardGrid(cards) {
  const icons = [
    '<path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="2"/>',
    '<path d="M12 3v18M5 8l7-5 7 5"/><circle cx="12" cy="14" r="3"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    '<path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z"/><path d="M9 12l2 2 4-4"/>'
  ];
  return `
    <div class="card-grid">
      ${cards.map((c, i) => `
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[i % icons.length]}</svg></span>
        <h3>${c.title}</h3>
        <p>${c.body}</p>
      </article>`).join('')}
    </div>`;
}

function workedExample(lines) {
  return `
    <div class="worked">
      ${lines.join('<br>\n      ')}
    </div>`;
}

/* The featured/OG image, placed as the article's lead figure. */
function featuredFigure(p, slug, alt, caption) {
  return `
    <figure class="figure breakout">
      <img src="${p}assets/img/blog/${slug}.png" alt="${alt}"
           width="1200" height="630" loading="eager" fetchpriority="high" decoding="async">
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>`;
}

/* -------------------------------------------------------------- listing -- */

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[m - 1]} ${y}`;
}

/* One horizontal card in the /blog/ index — thumbnail, category tag, title,
   a date + read-time meta row, excerpt, and a read-more link. Caps at a
   fixed thumbnail width so the layout looks the same with 1 article or 50. */
function articleCardHTML(p, a) {
  const mins = a.readMinutes || 4;
  return `
    <article class="post-card">
      <a class="post-thumb" href="${p}blog/${a.slug}/" tabindex="-1" aria-hidden="true">
        <img src="${p}assets/img/blog/${a.slug}.png" alt="" width="1200" height="630" loading="lazy" decoding="async">
      </a>
      <div class="post-body">
        <span class="post-tag">${a.category || 'Guide'}</span>
        <h2><a href="${p}blog/${a.slug}/">${a.title}</a></h2>
        <div class="post-meta">
          <span class="meta-item"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>${formatDate(a.datePublished)}</span>
          <span class="meta-item"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${mins} min read</span>
        </div>
        <p class="post-excerpt">${a.excerpt}</p>
        <a class="post-more" href="${p}blog/${a.slug}/">Read the article <span aria-hidden="true">&rarr;</span></a>
      </div>
    </article>`;
}

/* The sticky sidebar next to the post list. */
function blogSidebar(p) {
  return `
    <aside class="blog-side">
      <div class="widget widget-cta">
        <h3>Grams to Lbs</h3>
        <p>Decimal pounds, pounds and ounces, and total ounces &mdash; updating as you type.</p>
        <a class="btn" href="${p || './'}">Open the converter</a>
      </div>
      <div class="widget">
        <h3>Core Guides</h3>
        <ul>
          <li><a href="${p}guides/baby-weight-grams-to-pounds/">Baby Birth Weight</a></li>
          <li><a href="${p}guides/gold-grams-to-pounds-troy/">Gold &amp; Troy Ounces</a></li>
          <li><a href="${p}guides/shipping-weight-grams-to-pounds/">Shipping Weight</a></li>
          <li><a href="${p}guides/food-label-grams-to-pounds/">Food Labels</a></li>
        </ul>
      </div>
      <div class="widget">
        <h3>Reference</h3>
        <ul>
          <li><a href="${p}methodology/">Methodology &amp; Sources</a></li>
          <li><a href="${p}lbs-to-grams/">Lbs to Grams Converter</a></li>
        </ul>
      </div>
    </aside>`;
}

/* ------------------------------------------------------------- registry -- */
/* content/articles.json is the single source of truth for published blog
   articles. Both build-pages.js (core 12 pages) and publish-article.js (new
   articles) write sitemap.xml and llms.txt through the two functions below,
   so there is one writer, not two that could disagree about what is live. */

function loadArticles() {
  if (!fs.existsSync(ARTICLES_REGISTRY)) return [];
  return JSON.parse(fs.readFileSync(ARTICLES_REGISTRY, 'utf8'));
}

function saveArticles(articles) {
  fs.mkdirSync(path.dirname(ARTICLES_REGISTRY), { recursive: true });
  fs.writeFileSync(ARTICLES_REGISTRY, JSON.stringify(articles, null, 2) + '\n', 'utf8');
}

/* corePages: [{ slug, priority, changefreq, lastmod }] for the 12 hand-built
   pages (slug '' for the homepage). Blog articles are appended automatically
   from the registry. /blog/ itself is always included — build-pages.js
   generates that page unconditionally (the header nav links to it on every
   page, with zero articles or many), so the sitemap must list it the same
   way regardless of registry size. */
function writeSitemap(root, corePages) {
  const articles = loadArticles();
  const today = new Date().toISOString().slice(0, 10);

  const blogEntries = [{ slug: 'blog', priority: '0.7', changefreq: 'weekly', lastmod: today }];
  const articleEntries = articles.map((a) => ({
    slug: 'blog/' + a.slug,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: a.dateModified || a.datePublished
  }));

  const all = corePages.concat(blogEntries, articleEntries);

  fs.writeFileSync(path.join(root, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((u) => `  <url>
    <loc>${SITE}/${u.slug ? u.slug + '/' : ''}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`, 'utf8');
}

/* The one template for llms.txt. Both build-pages.js and publish-article.js
   call this, so a new blog article (or a change to the static sections)
   never requires touching two files. */
function llmsTemplate() {
  return `# gramstolbs.com

> A grams to pounds converter. Results are given in decimal pounds, in pounds with
> ounces, and in total ounces. One international avoirdupois pound is exactly
> 453.59237 grams (International Yard and Pound Agreement, 1959).

## Converters
- [Grams to Lbs](${SITE}/): convert grams to pounds, pounds and ounces, and total ounces.
- [Lbs to Grams](${SITE}/lbs-to-grams/): convert pounds to grams and kilograms.

## Guides
- [Baby birth weight](${SITE}/guides/baby-weight-grams-to-pounds/): converting a birth weight recorded in grams to pounds and ounces, with a 1000-5000 g table.
- [Gold and troy ounces](${SITE}/guides/gold-grams-to-pounds-troy/): why precious metals use troy ounces of 31.1034768 g and what the 9.71 percent error costs.
- [Shipping weight](${SITE}/guides/shipping-weight-grams-to-pounds/): converting parcel weight to pounds and where carrier billing brackets fall.
- [Food labels](${SITE}/guides/food-label-grams-to-pounds/): converting package and nutrition label weights between grams and pounds.
{{BLOG}}
## Reference
- [Methodology](${SITE}/methodology/): exact constants, formulas, rounding rule and primary sources.
- [Editorial Policy](${SITE}/editorial-policy/): how content is written, verified and corrected.
- [About](${SITE}/about/): who runs the site and why.
- [Contact](${SITE}/contact/): how to report a conversion error.
- [Privacy Policy](${SITE}/privacy-policy/): data, cookies and advertising.
- [Terms](${SITE}/terms/): terms of use and the accuracy disclaimer.

## Key facts
- 1 pound = 453.59237 grams exactly.
- 1 avoirdupois ounce = 28.349523125 grams exactly; 16 ounces make one pound.
- 1 troy ounce = 31.1034768 grams; 12 troy ounces make a troy pound of 373.2417216 grams.
- 500 grams = 1.1023 pounds = 1 lb 1.64 oz.
- 1000 grams = 2.2046 pounds = 2 lb 3.27 oz.
`;
}

function writeLlms(root) {
  const articles = loadArticles();
  const blogSection = articles.length
    ? `\n## Blog\n${articles.map((a) => `- [${a.title}](${SITE}/blog/${a.slug}/): ${a.llmsDesc || a.excerpt}`).join('\n')}\n`
    : `\n## Blog\n- [Blog](${SITE}/blog/): New grams to lbs articles, published regularly.\n`;

  fs.writeFileSync(path.join(root, 'llms.txt'), llmsTemplate().replace('{{BLOG}}', blogSection), 'utf8');
}

module.exports = {
  SITE, AUTHOR, EMAIL, GA_ID, CORE_PAGES,
  head, foot,
  ORG, PERSON,
  crumbs, breadcrumbHTML,
  articleSchema, articleCrumb, byline, miniConverter, faqAccordion,
  articleTable, statCardGrid, featureCardGrid, workedExample, featuredFigure,
  articleCardHTML, blogSidebar,
  loadArticles, saveArticles, writeSitemap, writeLlms
};
