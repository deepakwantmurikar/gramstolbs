/* Build-time page generator.

   The site itself has no build step — it is plain static HTML that runs by
   opening a file. This script exists only so the <head>, header and footer are
   written once instead of being hand-copied into every page and drifting apart.

   Run:  node tools/build-pages.js
   It writes each page's index.html plus robots.txt, sitemap.xml, ads.txt and
   llms.txt. index.html at the root is hand-maintained and is NOT touched.

   All internal links are relative so the site works both from a web server and
   by opening the files directly from disk.
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://gramstolbs.com';
const AUTHOR = 'Deepak Wantmurikar';
const EMAIL = 'contact@gramstolbs.com';
const GA_ID = 'G-L125VQ750L';   // Google Analytics 4 measurement ID
const UPDATED = '19 August 2026';

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

<meta property="og:type" content="website">
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

<link rel="stylesheet" href="${p}assets/css/style.css">

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

<script src="${p}assets/js/convert.js"></script>
<script src="${p}assets/js/app.js"></script>
<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
</body>
</html>
`;
}

/* Shared schema fragments */
const ORG = {
  '@type': 'Organization',
  '@id': SITE + '/#org',
  name: 'gramstolbs.com',
  url: SITE + '/',
  email: EMAIL,
  /* Google uses the logo for knowledge panels and publisher attribution */
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
  /* sameAs must only list profiles that genuinely belong to the author.
     Add social or professional profiles here as they are confirmed. */
  sameAs: ['https://gramstocup.com'],
  knowsAbout: [
    'Unit conversion',
    'Weight and mass measurement',
    'Avoirdupois and troy weight systems',
    'Web development'
  ]
};

function crumbs(p, name, slug) {
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

/* ----------------------------------------------------------------- pages -- */

const CONVERTER = `
    <div class="converter-card" data-mode="lb-to-g">
     <div class="converter-grid">
      <div class="panel-input">

      <div class="field">
        <label class="micro" for="value-input" id="input-label">Pounds (lbs)</label>
        <div class="input-shell">
          <input type="number" id="value-input" inputmode="decimal" step="any" min="0"
                 autocomplete="off" placeholder="0" value="1" autofocus>
          <span class="unit-suffix" id="unit-suffix" aria-hidden="true">lb</span>
        </div>
      </div>

      <div class="beam" aria-hidden="true">
        <div class="beam-arm" id="beam-arm"><span class="beam-weight" id="beam-weight"></span></div>
        <div class="beam-fulcrum"></div>
        <div class="beam-base"></div>
        <div class="beam-scale"></div>
      </div>

      <div class="quick">
        <span class="micro" id="quick-label">Quick pick</span>
        <div class="chip-row" id="chip-row" role="group" aria-labelledby="quick-label"></div>
      </div>

      <div class="controls">
        <button type="button" class="swap-btn" id="swap-btn">
          <span class="glyph" aria-hidden="true">&#8646;</span>
          <span class="swap-text">Swap to grams &rarr; lbs</span>
        </button>
        <fieldset class="precision">
          <legend class="micro">Decimals</legend>
          <div class="segmented">
            <label><input type="radio" name="precision" value="2"><span>2</span></label>
            <label><input type="radio" name="precision" value="4" checked><span>4</span></label>
            <label><input type="radio" name="precision" value="6"><span>6</span></label>
          </div>
        </fieldset>
      </div>

      </div>

      <div class="panel-results">
        <div class="results" aria-live="polite">
          <div class="result-row">
            <span class="result-label" id="label-a">Grams</span>
            <div class="result-line">
              <span class="result-value" id="value-a" data-empty="true">&mdash;</span>
              <button type="button" class="copy-btn" data-target="value-a" aria-label="Copy grams">Copy</button>
            </div>
          </div>
          <div class="result-row">
            <span class="result-label" id="label-b">Kilograms</span>
            <div class="result-line">
              <span class="result-value" id="value-b" data-empty="true">&mdash;</span>
              <button type="button" class="copy-btn" data-target="value-b" aria-label="Copy kilograms">Copy</button>
            </div>
          </div>
          <div class="result-row">
            <span class="result-label" id="label-c">Total ounces</span>
            <div class="result-line">
              <span class="result-value" id="value-c" data-empty="true">&mdash;</span>
              <button type="button" class="copy-btn" data-target="value-c" aria-label="Copy total ounces">Copy</button>
            </div>
          </div>
        </div>
      </div>

     </div>
      <p class="note">1 pound = 453.59237 grams exactly, by the 1959 International Yard and Pound Agreement.</p>
    </div>`;

const PAGES = [];

/* ---- /lbs-to-grams/ ---- */
PAGES.push({
  slug: 'lbs-to-grams',
  label: 'Lbs to Grams',
  title: 'Lbs to Grams Converter — Convert Pounds to Grams',
  desc: 'Convert lbs to grams instantly. 1 pound = 453.59237 grams exactly. Enter pounds and get grams, kilograms and ounces at once.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG, PERSON,
      {
        '@type': 'WebApplication',
        name: 'Lbs to Grams Converter',
        url: SITE + '/lbs-to-grams/',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      },
      crumbs('', 'Lbs to Grams', 'lbs-to-grams')
    ]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Exact &middot; 453.59237 g per lb</span>
    <h1>Lbs to Grams Converter</h1>
    <p>Convert pounds to grams instantly. Enter a weight in lbs and read grams,
    kilograms and total ounces together, updating as you type.</p>
  </section>

  <section class="converter-section wrap">${CONVERTER}</section>

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#formula">The formula</a></li>
          <li><a href="#recipes">American recipes</a></li>
          <li><a href="#fractions">Half and quarter pounds</a></li>
          <li><a href="#table">Conversion table</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${AUTHOR}</span>
      <span>Last updated: ${UPDATED}</span>
    </div>

    <p class="lead">To convert lbs to grams, multiply the number of pounds by 453.59237.
    One pound equals 453.59237 grams exactly, so 1 lb is 453.59 g, 2 lb is 907.18 g and
    half a pound is 226.80 g. The factor is a definition rather than a measurement, which
    means it never changes.</p>

    <h2 id="formula">How to convert lbs to grams</h2>

    <p>Multiply pounds by 453.59237 to get grams. That single step covers every conversion
    in this direction, and dividing by the same figure reverses it:</p>

    <div class="worked">
      grams&nbsp; = pounds &times; <strong>453.59237</strong><br>
      pounds = grams &divide; <strong>453.59237</strong>
    </div>

    <p>The figure 453.59237 comes from the International Yard and Pound Agreement of 1959,
    in which the standards bodies of the United States, the United Kingdom, Canada,
    Australia, New Zealand and South Africa defined one international avoirdupois pound as
    exactly that many grams. NIST Special Publication 811 lists the same value as an exact
    conversion factor. Because it is exact, a pound weighs the same in every country that
    signed, and any variation you see between calculators is a rounding choice rather than
    a real difference.</p>

    <h2 id="recipes">Reading an American recipe with a metric scale</h2>

    <p>Multiply the pounds in the recipe by 453.59237 and weigh that many grams. American
    recipes and packaging quote pounds while most kitchen scales sold outside the United
    States read in grams, so this is the most common reason for converting in this
    direction. A recipe calling for 2 lb of flour needs 907.18 grams, and one calling for
    1.5 lb of beef needs 680.39 grams.</p>

    <p>Recipe writers usually round, which matters more for baking than for cooking. A
    package labelled 1 lb holds 453.59 grams, while a metric package labelled 500 g holds
    about 46 grams more. Substituting one for the other changes a bread dough noticeably
    but will not harm a stew.</p>

    <h2 id="fractions">Half pounds, quarter pounds and ounces</h2>

    <p>Half a pound is 226.80 grams and a quarter pound is 113.40 grams. Both come from
    dividing the exact figure of 453.59237 grams per pound. Butchers, delicatessens and
    burger menus use these fractions constantly, which is where the quarter-pound patty
    takes its name.</p>

    <p>Pounds also divide into ounces rather than into tenths. One pound contains 16
    avoirdupois ounces and one ounce is 28.349523125 grams exactly. A weight written as
    1 lb 8 oz is therefore 1.5 lb, which is 680.39 grams.</p>

    <h2 id="table">Lbs to grams conversion table</h2>

    <p>This table converts common pound values to grams and kilograms. Every row uses the
    exact factor of 453.59237 grams per pound and is rounded for display.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Pounds to grams and kilograms, rounded for display</caption>
        <thead>
          <tr><th scope="col">Pounds (lb)</th><th scope="col">Grams (g)</th><th scope="col">Kilograms (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>0.25 lb</td><td>113.40 g</td><td>0.113 kg</td></tr>
          <tr><td>0.5 lb</td><td>226.80 g</td><td>0.227 kg</td></tr>
          <tr><td>1 lb</td><td>453.59 g</td><td>0.454 kg</td></tr>
          <tr><td>1.5 lb</td><td>680.39 g</td><td>0.680 kg</td></tr>
          <tr><td>2 lb</td><td>907.18 g</td><td>0.907 kg</td></tr>
          <tr><td>3 lb</td><td>1360.78 g</td><td>1.361 kg</td></tr>
          <tr><td>4 lb</td><td>1814.37 g</td><td>1.814 kg</td></tr>
          <tr><td>5 lb</td><td>2267.96 g</td><td>2.268 kg</td></tr>
          <tr><td>10 lb</td><td>4535.92 g</td><td>4.536 kg</td></tr>
          <tr><td>20 lb</td><td>9071.85 g</td><td>9.072 kg</td></tr>
        </tbody>
      </table>
    </div>

    <p>Converting the other way is covered on the <a href="${p || './'}">grams to lbs
    converter</a>, which also breaks the answer into pounds and ounces.</p>

  </section>
  </div>`
});

/* ---- /methodology/ ---- */
PAGES.push({
  slug: 'methodology',
  label: 'Methodology',
  title: 'Methodology — How gramstolbs.com Calculates Conversions',
  desc: 'The exact constants, formulas, rounding rule and primary sources used by every converter on gramstolbs.com.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      { '@type': 'WebPage', name: 'Methodology', url: SITE + '/methodology/', author: { '@id': SITE + '/#author' } },
      crumbs('', 'Methodology', 'methodology')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> How the numbers are produced</span>
    <h1>Methodology</h1>
    <p>Every constant, formula and rounding decision used on this site, stated in full so
    the results can be checked independently.</p>
  </section>
${breadcrumbHTML(p, 'Methodology')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#constants">Constants</a></li>
          <li><a href="#formulas">Formulas</a></li>
          <li><a href="#rounding">Rounding rule</a></li>
          <li><a href="#testing">How it is tested</a></li>
          <li><a href="#privacy">Where it runs</a></li>
          <li><a href="#sources">Sources</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${AUTHOR}</span>
      <span>Last reviewed: ${UPDATED}</span>
    </div>

    <p class="lead">Every conversion on this site derives from three exact constants and
    two arithmetic operations. Nothing is estimated, approximated or looked up from a
    table, and the same constants are used on every page.</p>

    <h2 id="constants">The constants</h2>

    <p>Three definitions produce every figure on this site. Each is exact by international
    agreement rather than measured, so none carries an uncertainty:</p>

    <div class="worked">
      GRAMS_PER_POUND&nbsp;&nbsp;&nbsp;&nbsp; = <strong>453.59237</strong><br>
      GRAMS_PER_OUNCE&nbsp;&nbsp;&nbsp;&nbsp; = <strong>28.349523125</strong><br>
      GRAMS_PER_TROY_OUNCE = <strong>31.1034768</strong>
    </div>

    <p>One international avoirdupois pound is exactly 453.59237 grams, fixed by the
    International Yard and Pound Agreement of 1959. One avoirdupois ounce is exactly
    28.349523125 grams, being one sixteenth of that pound. One troy ounce is exactly
    31.1034768 grams and is used only for precious metals; twelve troy ounces make a troy
    pound of 373.2417216 grams, which is lighter than an ordinary pound.</p>

    <p>These three values are declared once, in a single file, and every page imports them.
    No conversion number is written a second time anywhere on the site, which removes the
    possibility of two pages disagreeing.</p>

    <h2 id="formulas">The formulas</h2>

    <p>Each conversion is a single division or multiplication against one of the three
    constants. The complete set is:</p>

    <div class="worked">
      pounds&nbsp;&nbsp;&nbsp;&nbsp; = grams &divide; 453.59237<br>
      grams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = pounds &times; 453.59237<br>
      ounces&nbsp;&nbsp;&nbsp;&nbsp; = grams &divide; 28.349523125<br>
      troy oz&nbsp;&nbsp;&nbsp; = grams &divide; 31.1034768<br>
      lb + oz&nbsp;&nbsp;&nbsp; = whole part of (grams &divide; 453.59237),<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; then remainder &times; 16
    </div>

    <p>The pounds-and-ounces breakdown takes the whole number of pounds first, then
    multiplies the leftover decimal by 16 because one pound contains 16 ounces. Where
    rounding pushes the ounces to a full 16, one pound is added and the ounces reset to
    zero, so the display never reads something impossible such as 2 lb 16 oz.</p>

    <h2 id="rounding">The rounding rule</h2>

    <p>Values are rounded half away from zero at the precision you select. Because the
    converter accepts only values of zero or more, this is the same as rounding half up:
    a digit sequence ending in exactly 5 rounds upward. You can choose 2, 4 or 6 decimal
    places, and the underlying calculation always runs at full precision with rounding
    applied only at the moment of display.</p>

    <p>Rounding is the reason two converters can disagree in the fourth decimal place while
    both being correct. 1,000 grams equals 2.2046 pounds at four decimals and 2.204623
    pounds at six; the difference of 0.000023 pounds is roughly 10 milligrams. For everyday
    weighing two decimals is sufficient. Six is worth using for precious metals, laboratory
    work, or any situation where the figure will be multiplied by a large quantity.</p>

    <h2 id="testing">How the calculations are tested</h2>

    <p>Every conversion function is covered by an automated test suite that runs in the
    browser. The suite checks each function against independently known values, including
    1,000 g = 2.20462262 lb, 453.59237 g = 1 lb exactly, 100 g = 3.5274 oz and
    31.1034768 g = 1 troy oz, and it also verifies the behaviour for empty input, negative
    numbers, zero, non-numeric text and very large numbers.</p>

    <p>The tests are public. Opening <code>/test.html</code> on this site runs them live and
    prints a pass or fail line for every case, so the arithmetic behind the converter can be
    verified without taking anything here on trust.</p>

    <h2 id="privacy">Where the calculation runs</h2>

    <p>All arithmetic runs in your own browser. No weight you type is transmitted, logged or
    stored on a server, because there is no server-side calculation of any kind. The
    converter continues to work with no network connection once the page has loaded.</p>

    <h2 id="sources">Primary sources</h2>

    <div class="sources">
      <ul>
        <li><a href="https://www.nist.gov/pml/special-publication-811" rel="noopener">NIST Special Publication 811</a>, <em>Guide for the Use of the International System of Units (SI)</em> &mdash; exact conversion factors</li>
        <li><a href="https://www.nist.gov/pml/owm/publications" rel="noopener">NIST Handbook 44, Appendix C</a> &mdash; general tables of units of measurement</li>
        <li><a href="https://www.bipm.org/en/publications/si-brochure" rel="noopener">BIPM, <em>The International System of Units (SI)</em>, 9th edition</a> &mdash; definition of the kilogram</li>
        <li>International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g</li>
      </ul>
    </div>

    <p>If you find a figure on this site that disagrees with any of those sources, please
    <a href="${p}contact/">report it</a> and it will be corrected.</p>

  </section>
  </div>`
});

/* ---- /editorial-policy/ ---- */
PAGES.push({
  slug: 'editorial-policy',
  label: 'Editorial Policy',
  title: 'Editorial Policy — gramstolbs.com',
  desc: 'How content on gramstolbs.com is written, how the formulas are verified, how often pages are reviewed, and how to report an error.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      { '@type': 'WebPage', name: 'Editorial Policy', url: SITE + '/editorial-policy/', author: { '@id': SITE + '/#author' } },
      crumbs('', 'Editorial Policy', 'editorial-policy')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> How this site is written</span>
    <h1>Editorial Policy</h1>
    <p>How pages here are researched and written, how the arithmetic is checked, and what
    happens when something is wrong.</p>
  </section>
${breadcrumbHTML(p, 'Editorial Policy')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#writing">How pages are written</a></li>
          <li><a href="#verification">Verifying the numbers</a></li>
          <li><a href="#review">Review schedule</a></li>
          <li><a href="#corrections">Corrections</a></li>
          <li><a href="#ads">Advertising</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${AUTHOR}</span>
      <span>Last reviewed: ${UPDATED}</span>
    </div>

    <p class="lead">Every page on this site is written from the underlying definitions and
    formulas rather than assembled from other conversion websites, and every numeric claim
    is generated by the same tested code that powers the converter.</p>

    <h2 id="writing">How pages are written</h2>

    <p>Content is written from primary definitions, not from competitor pages. The starting
    point for any explanation is the exact constant and the arithmetic that follows from
    it, which is why the same figures appear consistently across the site.</p>

    <p>Two rules shape the writing. Each section opens with the direct answer and explains
    afterwards, so a reader who needs only the number can stop at the first sentence. And
    each section restates the figures it depends on rather than referring back to an earlier
    part of the page, so a section still makes sense read on its own.</p>

    <h2 id="verification">How the numbers are verified</h2>

    <p>Numeric claims in the body text are produced by the same code that runs the
    converter, not typed by hand. Conversion tables and worked examples are generated from
    the tested functions and pasted into the page as static HTML, which means the prose and
    the tool can never drift apart.</p>

    <p>The conversion functions themselves are covered by an automated test suite that
    checks them against independently known values and against edge cases such as empty
    input, negative numbers and non-numeric text. That suite is public and runs in your
    browser at <code>/test.html</code>. The constants and formulas are set out in full on the
    <a href="${p}methodology/">methodology page</a>.</p>

    <h2 id="review">Review schedule</h2>

    <p>Pages carry a visible last reviewed date. Because the conversion factors are fixed by
    international agreement and do not change, reviews focus on clarity, broken links and
    accuracy of the surrounding explanation rather than on the arithmetic. Any page is
    reviewed and re-dated whenever it is edited, and the full site is checked at least once
    a year.</p>

    <h2 id="corrections">Corrections</h2>

    <p>Errors are corrected rather than quietly removed. If a figure or an explanation on
    this site is wrong, email <a href="mailto:${EMAIL}">${EMAIL}</a> with the page and the
    problem. Corrections to a number are made as soon as they are confirmed against the
    primary sources, and the page's reviewed date is updated.</p>

    <h2 id="ads">Advertising and independence</h2>

    <p>This site is free to use and is funded by advertising. Advertising has no influence
    on the content: there are no sponsored conversions, no paid placements in the guides and
    no affiliate links in the explanatory text. Any advertisement is visually distinct from
    the content around it. How advertising affects your data is set out in the
    <a href="${p}privacy-policy/">privacy policy</a>.</p>

  </section>
  </div>`
});

/* ---- /about/ ---- */
PAGES.push({
  slug: 'about',
  label: 'About',
  title: 'About gramstolbs.com',
  desc: 'Who runs gramstolbs.com, why it was built, and what makes this grams to pounds converter different.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      { '@type': 'AboutPage', name: 'About', url: SITE + '/about/', mainEntity: { '@id': SITE + '/#author' } },
      crumbs('', 'About', 'about')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Who runs this site</span>
    <h1>About gramstolbs.com</h1>
    <p>A single-purpose weight converter built to answer one question properly rather than
    a hundred questions badly.</p>
  </section>
${breadcrumbHTML(p, 'About')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#why">Why this site exists</a></li>
          <li><a href="#different">What is different</a></li>
          <li><a href="#built">How it is built</a></li>
          <li><a href="#author">Who writes it</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${AUTHOR}</span>
      <span>Last reviewed: ${UPDATED}</span>
    </div>

    <p class="lead">gramstolbs.com converts grams to pounds and pounds to grams, and does
    nothing else. It exists because most conversion sites answer the question incompletely:
    they return a decimal such as 2.2046 pounds and stop there, when the number most people
    actually need is 2 lb 3.27 oz.</p>

    <h2 id="why">Why this site exists</h2>

    <p>Decimal pounds are not how anyone speaks. A hospital records a baby at 3,500 grams
    and the family wants to hear 7 lb 11 oz. A postal counter works in pounds and ounces. A
    delicatessen sells in half pounds. A converter that returns only 7.7162 has technically
    answered the question and practically failed it.</p>

    <p>The second reason is troy weight. Anyone converting gold or silver from grams needs
    troy ounces of 31.1034768 grams, not the ordinary ounces of 28.349523125 grams used for
    food and parcels. Mixing the two misstates the quantity by about 9.71 percent, which on
    a precious metal transaction is real money. Very few converters mention this at all.</p>

    <h2 id="different">What is different here</h2>

    <ul>
      <li>Every result appears three ways at once: decimal pounds, pounds with ounces, and total ounces.</li>
      <li>The precision is yours to set, at 2, 4 or 6 decimal places, so the rounding is visible rather than hidden.</li>
      <li>The exact constants and the full formulas are published on the <a href="${p}methodology/">methodology page</a>.</li>
      <li>The conversion code is covered by a public test suite you can run yourself at <code>/test.html</code>.</li>
      <li>Nothing you type is sent anywhere. The arithmetic runs entirely in your browser.</li>
    </ul>

    <h2 id="built">How it is built</h2>

    <p>The site is plain HTML, hand-written CSS and vanilla JavaScript with no framework and
    no tracking beyond standard advertising. The three conversion constants are declared once
    in a single file and imported everywhere, so no page can disagree with another. Pages are
    served as static HTML with all content present in the source, which means the tables and
    answers are readable by search engines and by AI assistants that do not run JavaScript.</p>

    <h2 id="author">Who writes it</h2>

    <p>This site is written and maintained by <strong>${AUTHOR}</strong>, a web developer
    and blogger. He builds and runs measurement conversion tools, including
    <a href="https://gramstocup.com" rel="noopener">gramstocup.com</a>, a converter for
    cooking measurements, alongside this one.</p>

    <p>Being a developer rather than only a writer is the reason this site is built the way
    it is. The three conversion constants are declared once in a single JavaScript file and
    imported by every page, so no two pages can disagree with one another. Every conversion
    function is covered by an automated test suite, and that suite is public rather than
    private: opening <code>/test.html</code> runs it in your own browser and prints a pass or
    fail line for each case. All arithmetic happens on your device, so no weight you type is
    sent to a server. Each page is served as static HTML with the tables written into the
    source, which means the answers are readable by search engines and by AI assistants that
    do not run JavaScript.</p>

    <p>Being a blogger is the reason the explanations exist at all. A converter that returns
    a number and nothing else gives the reader no way to check whether it is right. Every page
    here states the formula it used, names the standard the figure comes from, and works
    through at least one example with real numbers, so the result can be verified instead of
    taken on trust. Where a figure has been rounded, the page says so.</p>

    <p>Both sites come from the same observation: unit conversion is simple arithmetic that
    most websites present badly. They give a single decimal, no method, no source, and no
    acknowledgement that the answer has been rounded at all. Doing it properly is not
    difficult; it is mostly a matter of deciding that the reader deserves the working as well
    as the answer.</p>

    <div class="author-card">
      <img class="author-photo" src="${p}assets/img/deepak-wantmurikar.jpg"
           alt="${AUTHOR}, who writes and maintains gramstolbs.com"
           width="512" height="512" loading="lazy" decoding="async">
      <div class="author-meta">
        <h3>${AUTHOR}</h3>
        <p class="author-role">Web developer and blogger</p>
        <p class="author-blurb">Builds and maintains measurement conversion tools, including
        this site and <a href="https://gramstocup.com" rel="noopener">gramstocup.com</a>.
        Reach him at <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
      </div>
    </div>

    <p>Questions, corrections and suggestions are welcome at
    <a href="mailto:${EMAIL}">${EMAIL}</a>. How pages are researched and reviewed is set out
    in the <a href="${p}editorial-policy/">editorial policy</a>.</p>

  </section>
  </div>`
});

/* ---- /contact/ ---- */
PAGES.push({
  slug: 'contact',
  label: 'Contact',
  title: 'Contact — gramstolbs.com',
  desc: 'Contact gramstolbs.com to report a conversion error, ask a question, or suggest an improvement.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      { '@type': 'ContactPage', name: 'Contact', url: SITE + '/contact/' },
      crumbs('', 'Contact', 'contact')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Get in touch</span>
    <h1>Contact</h1>
    <p>Corrections are welcome and are acted on quickly.</p>
  </section>
${breadcrumbHTML(p, 'Contact')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#email">Email</a></li>
          <li><a href="#errors">Reporting an error</a></li>
          <li><a href="#reply">What gets a reply</a></li>
          <li><a href="#nospam">What it is not for</a></li>
          <li><a href="#who">Who you are writing to</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <p class="lead">The fastest way to reach this site is by email at
    <a href="mailto:${EMAIL}">${EMAIL}</a>. Messages are read by ${AUTHOR}, who writes and
    maintains the site.</p>

    <h2 id="email">Email</h2>

    <p>Write to <a href="mailto:${EMAIL}">${EMAIL}</a> for any question about the converters,
    the published formulas, or the content of a page. There is no contact form, which keeps
    the site free of the scripts and cookies a form would require.</p>

    <h2 id="errors">Reporting a conversion error</h2>

    <p>Include the page address, the value you entered and the result you expected. Numeric
    corrections are checked against the primary sources listed on the
    <a href="${p}methodology/">methodology page</a> and, once confirmed, are fixed as a
    priority and the page's reviewed date is updated.</p>

    <p>You can also verify the arithmetic yourself before writing: the public test suite at
    <code>/test.html</code> runs every conversion function against known values in your own
    browser and prints a pass or fail for each.</p>

    <h2 id="reply">What gets a reply</h2>

    <p>Every email about a conversion figure, a formula or a factual error is read and
    answered. Corrections take priority over everything else, because a wrong number on a
    converter is the one thing this site cannot afford to leave standing. If you have found a
    genuine error, expect it to be fixed rather than argued about.</p>

    <p>Suggestions for values or situations worth covering are welcome too. This site
    deliberately covers one subject, converting between grams and pounds, so requests for other
    unit pairs are usually declined rather than added. Keeping the scope narrow is what allows
    each page to go into proper depth instead of repeating a formula a hundred times.</p>

    <h2 id="nospam">What this address is not for</h2>

    <p>This address does not accept guest post offers, link exchange requests, paid placement
    proposals or sponsored content pitches, and messages of that kind are not answered. The
    <a href="${p}editorial-policy/">editorial policy</a> explains why: advertising funds the
    site, but it has no influence on what is written, and no link inside the explanatory text
    is paid for.</p>

    <h2 id="who">Who you are writing to</h2>

    <p>Messages go to ${AUTHOR}, who writes and maintains every page here. There is no support
    team and no ticketing system, so replies come from one person and may take a few days. The
    <a href="${p}about/">about page</a> covers who runs the site and why it exists, and the
    <a href="${p}methodology/">methodology page</a> answers most technical questions about the
    figures before they need to be asked.</p>

  </section>
  </div>`
});

/* ---- /privacy-policy/ ---- */
PAGES.push({
  slug: 'privacy-policy',
  label: 'Privacy Policy',
  title: 'Privacy Policy — gramstolbs.com',
  desc: 'How gramstolbs.com handles data, cookies and advertising, including Google AdSense, GDPR and CCPA rights.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG,
      { '@type': 'WebPage', name: 'Privacy Policy', url: SITE + '/privacy-policy/' },
      crumbs('', 'Privacy Policy', 'privacy-policy')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Your data</span>
    <h1>Privacy Policy</h1>
    <p>What this site collects, what it does not, and the choices you have.</p>
  </section>
${breadcrumbHTML(p, 'Privacy Policy')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#conversions">Your conversions</a></li>
          <li><a href="#collect">What is collected</a></li>
          <li><a href="#cookies">Cookies</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#advertising">Advertising</a></li>
          <li><a href="#gdpr">GDPR</a></li>
          <li><a href="#ccpa">CCPA</a></li>
          <li><a href="#children">Children</a></li>
          <li><a href="#changes">Changes</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> gramstolbs.com</span>
      <span>Last updated: ${UPDATED}</span>
    </div>

    <p class="lead">The weights you type into this site are never collected. All conversion
    arithmetic runs inside your own browser, and no value you enter is transmitted to,
    logged by, or stored on any server.</p>

    <h2 id="conversions">Your conversions stay on your device</h2>

    <p>Nothing you type into a converter leaves your browser. The calculation is performed by
    JavaScript already loaded on the page, so there is no request to send and no record to
    keep. This applies to every converter on the site.</p>

    <h2 id="collect">What is collected</h2>

    <p>This site does not ask for or store personal information directly. There are no
    accounts, no sign-up, no newsletter and no contact form. If you email
    <a href="mailto:${EMAIL}">${EMAIL}</a>, that message and your address are held only for as
    long as needed to reply. Usage data is collected by Google Analytics as described below,
    and advertising data by Google AdSense.</p>

    <p>Like nearly all websites, the hosting provider records standard server logs, which may
    include IP address, browser type, referring page and time of request. These are used to
    keep the site running and secure.</p>

    <h2 id="cookies">Cookies</h2>

    <p>This site itself sets no cookies. Cookies are set by two third-party services: Google
    Analytics, described in the next section, and the advertising described after it. You can
    block or delete cookies in your browser settings at any time, and every converter on this
    site continues to work normally without them, because the conversions are calculated by
    your browser rather than by any service that uses cookies.</p>

    <h2 id="analytics">Analytics</h2>

    <p>This site uses Google Analytics 4 to count visits and see which pages are read. It sets
    cookies in your browser, typically named <code>_ga</code> and <code>_ga_&lt;id&gt;</code>,
    which distinguish one visitor from another across pages and visits.</p>

    <p>What is collected is limited to standard web measurement: the pages you view, how long
    you stay, the site or search that referred you, your device and browser type, and an
    approximate location derived from your IP address. Google states that Analytics 4 does not
    log or store full IP addresses. No weight you type into any converter is collected,
    because conversions never leave your browser in the first place.</p>

    <p>You can prevent Google Analytics entirely by installing the
    <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google Analytics Opt-out
    Browser Add-on</a>, by blocking cookies in your browser, or by using any tracker-blocking
    extension. Doing so has no effect on the converters. How Google handles this data is
    described in the <a href="https://policies.google.com/privacy" rel="noopener">Google
    Privacy Policy</a>.</p>

    <h2 id="advertising">Advertising and Google AdSense</h2>

    <p>This site is funded by advertising and uses Google AdSense. Third-party vendors,
    including Google, use cookies to serve advertisements based on your prior visits to this
    or other websites.</p>

    <ul>
      <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and other sites on the internet.</li>
      <li>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>.</li>
      <li>You can opt out of a third-party vendor's use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info/choices</a>.</li>
      <li>Google's handling of data is described in the <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">Google Privacy &amp; Terms site</a>.</li>
    </ul>

    <p>Third-party advertisers may also use cookies, web beacons or similar technologies.
    This site has no access to or control over cookies used by advertisers.</p>

    <h2 id="gdpr">Your rights under GDPR</h2>

    <p>If you are in the European Economic Area or the United Kingdom, you have the right to
    access, correct, erase, restrict or object to the processing of your personal data, and
    the right to data portability. Because this site collects no personal data beyond server
    logs and any email you choose to send, most requests concern those two categories only.
    To exercise any right, email <a href="mailto:${EMAIL}">${EMAIL}</a>. You also have the
    right to lodge a complaint with your national data protection authority.</p>

    <p>Where analytics or advertising cookies require consent, that consent is requested
    before such cookies are set, and it can be withdrawn at any time through your browser
    settings, through the Google Analytics opt-out add-on, or through the Google Ads Settings
    link above.</p>

    <h2 id="ccpa">Your rights under CCPA</h2>

    <p>If you are a California resident, you have the right to know what personal information
    is collected, to request deletion of it, and to opt out of its sale. This site does not
    sell personal information. To make a request, email
    <a href="mailto:${EMAIL}">${EMAIL}</a>. You will not be discriminated against for
    exercising any of these rights.</p>

    <h2 id="children">Children</h2>

    <p>This site is a general-audience utility and is not directed at children under 13. No
    personal information is knowingly collected from children. If you believe a child has
    provided personal information, email <a href="mailto:${EMAIL}">${EMAIL}</a> and it will
    be deleted.</p>

    <h2 id="changes">Changes to this policy</h2>

    <p>This policy will be updated if the site's data practices change, for example if
    analytics are added. The date at the top of this page shows when it was last revised.
    Questions about it can be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

  </section>
  </div>`
});

/* ---- /terms/ ---- */
PAGES.push({
  slug: 'terms',
  label: 'Terms',
  title: 'Terms of Use — gramstolbs.com',
  desc: 'Terms of use for gramstolbs.com, including the accuracy disclaimer for all conversion results.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG,
      { '@type': 'WebPage', name: 'Terms of Use', url: SITE + '/terms/' },
      crumbs('', 'Terms', 'terms')]
  },
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Terms of use</span>
    <h1>Terms of Use</h1>
    <p>The conditions under which this site is provided, and the limits of what it guarantees.</p>
  </section>
${breadcrumbHTML(p, 'Terms')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#accuracy">Accuracy disclaimer</a></li>
          <li><a href="#use">Permitted use</a></li>
          <li><a href="#ip">Content ownership</a></li>
          <li><a href="#external">External links</a></li>
          <li><a href="#liability">Liability</a></li>
          <li><a href="#changes">Changes</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">

    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> gramstolbs.com</span>
      <span>Last updated: ${UPDATED}</span>
    </div>

    <p class="lead">This site is provided free of charge for general information. By using
    it you accept the terms below, the most important of which is the accuracy disclaimer in
    the next section.</p>

    <h2 id="accuracy">Accuracy disclaimer</h2>

    <p>Results are provided without warranty and should be independently verified before use
    in any situation with financial, legal, medical or safety consequences. The conversion
    factors used here are exact by international definition and the code is tested, but no
    website can guarantee that a displayed figure is correct for your particular purpose.</p>

    <p>Displayed results are rounded to the number of decimal places you select, so they are
    approximations of the full-precision value. This matters most where a rounded figure is
    multiplied by a large quantity, as in bulk trade or precious metal transactions. For
    commercial weighing, customs declarations, medical dosing or anything legally binding,
    use a calibrated and certified instrument and confirm the figure against the relevant
    official standard.</p>

    <h2 id="use">Permitted use</h2>

    <p>You may use these converters freely for personal and commercial purposes. You may not
    attempt to disrupt the site, interfere with its operation or use automated systems to
    place unreasonable load on it. Reproducing the site's written content wholesale on
    another website is not permitted; quoting a short passage with a link back is welcome.</p>

    <h2 id="ip">Content ownership</h2>

    <p>The written content, layout, design and code of this site belong to its operator. The
    underlying conversion factors are international standards and belong to no one; the
    explanations of them here are original work.</p>

    <h2 id="external">External links</h2>

    <p>This site links to external sources such as NIST and BIPM for verification. It has no
    control over those sites and is not responsible for their content or availability. A link
    is not an endorsement.</p>

    <h2 id="liability">Limitation of liability</h2>

    <p>This site is provided on an as-is basis, without warranties of any kind, express or
    implied. To the fullest extent permitted by law, the operator accepts no liability for
    any loss or damage arising from use of, or reliance on, the information provided here.
    Nothing in these terms limits liability where the law does not permit it to be limited.</p>

    <h2 id="changes">Changes</h2>

    <p>These terms may be revised, and the date above shows when they were last changed.
    Continued use of the site after a change constitutes acceptance of the revised terms.
    Questions can be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

  </section>
  </div>`
});

/* ---------------------------------------------------------------- guides -- */

function guideSchema(slug, title, desc) {
  return {
    '@context': 'https://schema.org',
    '@graph': [ORG, PERSON,
      {
        '@type': 'Article',
        headline: title,
        description: desc,
        url: SITE + '/guides/' + slug + '/',
        datePublished: '2026-08-19',
        dateModified: '2026-08-19',
        author: { '@id': SITE + '/#author' },
        publisher: { '@id': SITE + '/#org' },
        mainEntityOfPage: SITE + '/guides/' + slug + '/',
        /* Article rich results require an image; this is the site's social card */
        image: {
          '@type': 'ImageObject',
          url: SITE + '/assets/img/og-image.png',
          width: 1200,
          height: 630
        },
        inLanguage: 'en',
        isAccessibleForFree: true
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE + '/guides/' },
          { '@type': 'ListItem', position: 3, name: title, item: SITE + '/guides/' + slug + '/' }
        ]
      }]
  };
}

function guideCrumb(p, label) {
  return `
  <nav class="breadcrumb wrap" aria-label="Breadcrumb">
    <ol>
      <li><a href="${p}">Home</a></li>
      <li>Guides</li>
      <li aria-current="page">${label}</li>
    </ol>
  </nav>`;
}

function guideByline(p) {
  return `
    <div class="byline">
      <span><span class="dot" aria-hidden="true"></span> By ${AUTHOR}</span>
      <span>Last updated: ${UPDATED}</span>
    </div>`;
}

function miniConverter(p, text) {
  return `
    <div class="worked" style="border-left-color:var(--brass);">
      ${text}<br>
      <a href="${p}">Open the grams to lbs converter &rarr;</a>
    </div>`;
}

/* ---- guide 1: baby birth weight ---- */
PAGES.push({
  slug: 'guides/baby-weight-grams-to-pounds',
  label: 'Baby Birth Weight',
  title: 'Baby Birth Weight: Grams to Pounds and Ounces',
  desc: 'Convert a baby’s birth weight from grams to pounds and ounces. Worked examples, a full 1000–5000 g table, and why hospitals record grams.',
  schema: guideSchema('baby-weight-grams-to-pounds', 'Baby Birth Weight: Grams to Pounds and Ounces',
    'Convert a baby’s birth weight from grams to pounds and ounces, with a full reference table.'),
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Guide</span>
    <h1>Baby Birth Weight: Grams to Pounds and Ounces</h1>
    <p>Hospitals record birth weight in grams. Families speak in pounds and ounces. Here is
    how to move between them exactly.</p>
  </section>
${guideCrumb(p, 'Baby Birth Weight')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#answer">The quick answer</a></li>
          <li><a href="#why-grams">Why hospitals use grams</a></li>
          <li><a href="#worked">A worked example</a></li>
          <li><a href="#table">Birth weight table</a></li>
          <li><a href="#categories">Low birth weight</a></li>
          <li><a href="#rounding">Why numbers differ</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">
${guideByline(p)}

    <p class="lead">To convert a birth weight from grams to pounds and ounces, divide the
    grams by 453.59237 to get pounds, then multiply whatever is left after the decimal point
    by 16 to get ounces. A baby recorded at 3,500 grams weighs 7 lb 11.46 oz. A baby recorded
    at 3,000 grams weighs 6 lb 9.82 oz.</p>

    <h2 id="answer">The quick answer</h2>

    <p>Divide grams by 453.59237, then multiply the decimal remainder by 16. One pound is
    exactly 453.59237 grams and contains exactly 16 ounces, which is why the calculation
    takes two steps rather than one. The common birth weights convert as follows:
    2,500 grams is 5 lb 8.19 oz, 3,000 grams is 6 lb 9.82 oz, 3,500 grams is 7 lb 11.46 oz,
    and 4,000 grams is 8 lb 13.10 oz.</p>

${miniConverter(p, 'Enter the weight in grams and read the pounds-and-ounces line.')}

    <h2 id="why-grams">Why hospitals record grams</h2>

    <p>Hospitals record birth weight in grams because grams give finer resolution and are
    the international clinical standard. A gram is a small enough unit that a newborn's daily
    change can be tracked meaningfully, whereas ounces are coarse by comparison: one ounce is
    28.35 grams, so a chart in ounces would hide changes that matter in the first days.</p>

    <p>Using one unit worldwide also removes ambiguity from medical records. A weight written
    as 3,250 g means the same thing in every country, while a weight written in pounds
    requires knowing which pound is meant. Since 1959 the international pound has been fixed
    at exactly 453.59237 grams, but clinical practice settled on grams regardless.</p>

    <p>Families, meanwhile, think in pounds and ounces in the United States, the United
    Kingdom and Ireland. This is why the same baby is 3,500 g on the chart and "seven pounds
    eleven" to the grandparents. Both describe an identical mass.</p>

    <h2 id="worked">A worked example, step by step</h2>

    <p>Take a baby recorded at 3,500 grams and convert it completely:</p>

    <div class="worked">
      step 1&nbsp; 3500 &divide; 453.59237 = <strong>7.7162</strong> lb<br>
      step 2&nbsp; whole pounds &rarr; <strong>7 lb</strong><br>
      step 3&nbsp; 0.7162 &times; 16 = <strong>11.46</strong> oz<br>
      answer&nbsp; <strong>7 lb 11.46 oz</strong>, spoken as "7 pounds 11 ounces"
    </div>

    <p>The third step multiplies by 16 because a pound contains 16 ounces. Rounding 11.46 to
    the nearest whole ounce gives 11 oz, which is how the weight is normally said aloud.
    Announcements almost always round to the whole ounce; the decimal matters only when
    tracking change over days.</p>

    <h2 id="table">Birth weight conversion table</h2>

    <p>This table covers the usual range of birth weights in 250 gram steps. Every row is
    calculated with the exact factor of 453.59237 grams per pound.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Birth weight in grams converted to pounds and ounces</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Pounds (lb)</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>1000 g</td><td>2.2046 lb</td><td>2 lb 3.27 oz</td></tr>
          <tr><td>1500 g</td><td>3.3069 lb</td><td>3 lb 4.91 oz</td></tr>
          <tr><td>2000 g</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
          <tr><td>2250 g</td><td>4.9604 lb</td><td>4 lb 15.37 oz</td></tr>
          <tr><td>2500 g</td><td>5.5116 lb</td><td>5 lb 8.18 oz</td></tr>
          <tr><td>2750 g</td><td>6.0627 lb</td><td>6 lb 1.00 oz</td></tr>
          <tr><td>3000 g</td><td>6.6139 lb</td><td>6 lb 9.82 oz</td></tr>
          <tr><td>3250 g</td><td>7.1650 lb</td><td>7 lb 2.64 oz</td></tr>
          <tr><td>3500 g</td><td>7.7162 lb</td><td>7 lb 11.46 oz</td></tr>
          <tr><td>3750 g</td><td>8.2673 lb</td><td>8 lb 4.28 oz</td></tr>
          <tr><td>4000 g</td><td>8.8185 lb</td><td>8 lb 13.10 oz</td></tr>
          <tr><td>4250 g</td><td>9.3696 lb</td><td>9 lb 5.91 oz</td></tr>
          <tr><td>4500 g</td><td>9.9208 lb</td><td>9 lb 14.73 oz</td></tr>
          <tr><td>5000 g</td><td>11.0231 lb</td><td>11 lb 0.37 oz</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="categories">The 2,500 gram threshold</h2>

    <p>The World Health Organization defines low birth weight as below 2,500 grams, which
    converts to 5 lb 8.18 oz. The threshold is set in grams, so the pound-and-ounce figure is
    a conversion of it rather than the definition itself. Very low birth weight is defined
    below 1,500 grams, which is 3 lb 4.91 oz, and extremely low birth weight below 1,000
    grams, which is 2 lb 3.27 oz.</p>

    <p>These are classification thresholds used in health statistics, not a diagnosis of
    anything on their own. Any question about a particular baby's weight belongs with the
    midwife, health visitor or doctor caring for them; this page converts units and nothing
    more.</p>

    <h2 id="rounding">Why two conversions can disagree slightly</h2>

    <p>Small differences between converters come from rounding, not from disagreement about
    the underlying figure. 3,500 grams is 7.716179 pounds at six decimal places and 7.7162
    pounds at four, and the ounces figure of 11.4589 rounds to 11.46 at two decimals or 11 at
    zero. Hospital systems often round to the nearest whole ounce before display, so a chart
    may print 7 lb 11 oz while a calculator shows 7 lb 11.46 oz. Both are describing the same
    3,500 grams.</p>

    <p>The conversion factor itself never varies. One pound has been exactly 453.59237 grams
    since the International Yard and Pound Agreement of 1959, and NIST Special Publication 811
    publishes it as an exact value. The full method used here, including the rounding rule, is
    on the <a href="${p}methodology/">methodology page</a>.</p>

  </section>
  </div>`
});

/* ---- guide 2: gold and troy ---- */
PAGES.push({
  slug: 'guides/gold-grams-to-pounds-troy',
  label: 'Gold & Troy Ounces',
  title: 'Gold: Converting Grams to Troy Ounces and Pounds',
  desc: 'Gold is weighed in troy ounces of 31.1034768 g, not ordinary ounces of 28.349523125 g. Confusing them misprices a sale by 9.71 percent.',
  schema: guideSchema('gold-grams-to-pounds-troy', 'Gold: Converting Grams to Troy Ounces and Pounds',
    'How to convert gold from grams to troy ounces and pounds, and why troy weight differs from ordinary weight.'),
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Guide</span>
    <h1>Gold: Converting Grams to Troy Ounces and Pounds</h1>
    <p>Precious metals use a different ounce from everything else. Getting the two mixed up
    misstates a quantity by nearly ten percent.</p>
  </section>
${guideCrumb(p, 'Gold & Troy Ounces')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#answer">The quick answer</a></li>
          <li><a href="#difference">Troy vs ordinary</a></li>
          <li><a href="#worked">The cost of the mistake</a></li>
          <li><a href="#troy-pound">The troy pound</a></li>
          <li><a href="#table">Gram to troy ounce table</a></li>
          <li><a href="#practice">Buying and selling</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">
${guideByline(p)}

    <p class="lead">To convert gold from grams to troy ounces, divide the grams by
    31.1034768. One troy ounce is exactly 31.1034768 grams, so 100 grams of gold is 3.215
    troy ounces. Using the ordinary ounce of 28.349523125 grams instead would give 3.527,
    which overstates the quantity by 9.71 percent.</p>

    <h2 id="answer">The quick answer</h2>

    <p>Divide grams by 31.1034768 for troy ounces, and by 453.59237 for ordinary pounds. Gold,
    silver, platinum and palladium are quoted in troy ounces almost everywhere in the world,
    so the troy figure is the one that matters for pricing. A 100 gram bar is 3.215 troy
    ounces and 0.2205 ordinary pounds.</p>

${miniConverter(p, 'The converter shows ordinary pounds and ounces. Divide grams by 31.1034768 for troy ounces.')}

    <h2 id="difference">Troy weight against ordinary weight</h2>

    <p>A troy ounce is heavier than an ordinary ounce: 31.1034768 grams against 28.349523125
    grams, a difference of about 2.75 grams. The ordinary ounce is properly called the
    avoirdupois ounce and is the one used for food, parcels and body weight. Troy weight
    survives from the medieval bullion trade and is now used almost exclusively for precious
    metals and gemstones.</p>

    <p>The confusing part is that both are simply called "an ounce" in conversation. A jeweller
    quoting ounces almost certainly means troy ounces. A courier quoting ounces certainly does
    not. Because the two differ by roughly a tenth, the ambiguity is expensive rather than
    academic, which is why converting from grams is the safer habit: a gram is a gram in every
    trade.</p>

    <h2 id="worked">What the mistake actually costs</h2>

    <p>Take a 100 gram bar and convert it both ways:</p>

    <div class="worked">
      troy&nbsp;&nbsp;&nbsp;&nbsp; 100 &divide; 31.1034768&nbsp;&nbsp; = <strong>3.2151</strong> troy oz<br>
      ordinary 100 &divide; 28.349523125 = <strong>3.5274</strong> oz<br>
      error&nbsp;&nbsp;&nbsp; (3.5274 &minus; 3.2151) &divide; 3.2151 = <strong>9.71%</strong>
    </div>

    <p>Quoting 3.5274 ounces to a buyer who pays per troy ounce claims about a tenth more metal
    than is present. On a single 100 gram bar that is roughly a third of a troy ounce of gold
    being claimed in error. The mistake runs in both directions: a seller using the wrong ounce
    undercharges, a buyer using it overpays, and neither notices until the metal is weighed
    again.</p>

    <h2 id="troy-pound">The troy pound is not the pound you know</h2>

    <p>A troy pound is 373.2417216 grams, not the 453.59237 grams of an ordinary pound. It
    contains twelve troy ounces rather than sixteen ounces, which is why it is lighter despite
    the troy ounce being heavier. The troy pound is effectively obsolete in trade and is worth
    knowing about mainly so that it is not assumed when someone says "pound" about metal.</p>

    <p>In practice, bullion is quoted per troy ounce or per kilogram, and scrap is weighed in
    grams. Pounds rarely appear at all. If a figure in pounds does appear, it is worth
    confirming which pound is meant before agreeing a price.</p>

    <h2 id="table">Grams to troy ounces</h2>

    <p>This table converts common gold weights. The troy column uses 31.1034768 grams per troy
    ounce and the ordinary column uses 28.349523125 grams per ounce, both exact.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Grams converted to troy ounces and to ordinary ounces</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Troy ounces</th><th scope="col">Ordinary ounces</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>1 g</td><td>0.0322 oz t</td><td>0.0353 oz</td><td>0.0022 lb</td></tr>
          <tr><td>5 g</td><td>0.1608 oz t</td><td>0.1764 oz</td><td>0.0110 lb</td></tr>
          <tr><td>10 g</td><td>0.3215 oz t</td><td>0.3527 oz</td><td>0.0220 lb</td></tr>
          <tr><td>20 g</td><td>0.6430 oz t</td><td>0.7055 oz</td><td>0.0441 lb</td></tr>
          <tr><td>31.1035 g</td><td>1.0000 oz t</td><td>1.0971 oz</td><td>0.0686 lb</td></tr>
          <tr><td>50 g</td><td>1.6075 oz t</td><td>1.7637 oz</td><td>0.1102 lb</td></tr>
          <tr><td>100 g</td><td>3.2151 oz t</td><td>3.5274 oz</td><td>0.2205 lb</td></tr>
          <tr><td>250 g</td><td>8.0377 oz t</td><td>8.8185 oz</td><td>0.5512 lb</td></tr>
          <tr><td>500 g</td><td>16.0754 oz t</td><td>17.6370 oz</td><td>1.1023 lb</td></tr>
          <tr><td>1000 g</td><td>32.1507 oz t</td><td>35.2740 oz</td><td>2.2046 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>The 31.1035 g row is worth noting: that weight is exactly one troy ounce, and it is the
    standard size for a small gold bar or coin. Note that it is 1.0971 ordinary ounces, not
    one.</p>

    <h2 id="practice">Buying and selling scrap</h2>

    <p>Scrap gold is almost always weighed in grams, and this is deliberate. A gram is
    unambiguous, whereas an ounce needs qualifying. When a price is quoted per gram, multiply
    directly. When it is quoted per troy ounce, divide the grams by 31.1034768 first.</p>

    <p>Purity is a separate calculation from weight and the two are often confused. A 10 gram
    item of 18 carat gold contains 18/24 of its weight in gold, which is 7.5 grams of pure
    gold, or 0.2411 troy ounces. Converting the unit does not tell you the purity, and a
    scrap price applies to the pure content rather than to the total weight.</p>

    <p>The exact constants used throughout this site, including the troy ounce, are published
    on the <a href="${p}methodology/">methodology page</a>. Nothing here is financial advice;
    confirm any transaction against a calibrated, certified scale.</p>

  </section>
  </div>`
});

/* ---- guide 3: shipping ---- */
PAGES.push({
  slug: 'guides/shipping-weight-grams-to-pounds',
  label: 'Shipping Weight',
  title: 'Shipping Weight: Converting Grams to Pounds for Postage',
  desc: 'Carriers bill in whole pounds and round up. Convert grams to pounds, see where the bracket boundaries fall, and avoid paying for an extra pound.',
  schema: guideSchema('shipping-weight-grams-to-pounds', 'Shipping Weight: Converting Grams to Pounds for Postage',
    'How to convert parcel weight from grams to pounds, and how carrier rounding affects what you pay.'),
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Guide</span>
    <h1>Shipping Weight: Converting Grams to Pounds</h1>
    <p>Carriers bill in whole pounds and round upward. Knowing where each bracket starts is
    worth real money on repeated shipments.</p>
  </section>
${guideCrumb(p, 'Shipping Weight')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#answer">The quick answer</a></li>
          <li><a href="#rounding">How carriers round</a></li>
          <li><a href="#brackets">Where brackets fall</a></li>
          <li><a href="#table">Billable weight table</a></li>
          <li><a href="#dim">Dimensional weight</a></li>
          <li><a href="#packaging">Weigh the packaging</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">
${guideByline(p)}

    <p class="lead">To convert parcel weight from grams to pounds, divide the grams by
    453.59237. A 460 gram parcel is 1.0141 pounds, and because carriers round up to the next
    whole pound it is billed as 2 lb. Crossing 453.59237 grams by even one gram moves a parcel
    into the next price bracket.</p>

    <h2 id="answer">The quick answer</h2>

    <p>Divide grams by 453.59237 to get pounds, then round up to the next whole number to get
    the billable weight. A 900 gram parcel is 1.9842 pounds and bills as 2 lb. A 1,000 gram
    parcel is 2.2046 pounds and bills as 3 lb. That extra 100 grams costs a full pricing tier
    even though the parcels feel almost identical.</p>

${miniConverter(p, 'Enter the parcel weight in grams and read the decimal pounds line, then round up.')}

    <h2 id="rounding">Why carriers round up</h2>

    <p>Carriers charge by weight bracket rather than by exact weight, and the brackets are set
    in whole pounds for domestic United States shipping. A parcel weighing 1.01 lb and one
    weighing 1.99 lb usually cost the same, because both round up to 2 lb. This is standard
    practice across major carriers, though the exact tiers and any half-pound bands vary by
    service, so the published rate card for the service being used is the authority.</p>

    <p>The consequence is that the value of shaving weight is not linear. Removing 50 grams
    from a parcel changes nothing unless it takes the parcel below a bracket boundary, at which
    point it saves an entire tier. The boundaries sit at every multiple of 453.59237 grams.</p>

    <h2 id="brackets">Where the boundaries fall</h2>

    <p>Each whole pound boundary is a multiple of 453.59237 grams. The first four sit at
    453.59 g for 1 lb, 907.18 g for 2 lb, 1,360.78 g for 3 lb and 1,814.37 g for 4 lb. A parcel
    at 450 grams bills as 1 lb; the same parcel at 460 grams bills as 2 lb.</p>

    <div class="worked">
      450 g &divide; 453.59237 = 0.9921 lb &rarr; bills as <strong>1 lb</strong><br>
      460 g &divide; 453.59237 = 1.0141 lb &rarr; bills as <strong>2 lb</strong><br>
      difference in actual weight: <strong>10 g</strong><br>
      difference in billed weight: <strong>1 whole pound</strong>
    </div>

    <p>For anyone shipping the same item repeatedly, this is where money is found. Ten grams of
    packaging removed from a product sitting just above a boundary changes the cost of every
    parcel sent from then on.</p>

    <h2 id="table">Grams to billable pounds</h2>

    <p>This table shows actual weight in grams, the exact conversion to pounds, and the whole
    pound most carriers would bill after rounding up.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Parcel weight in grams, exact pounds, and typical billable weight</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Exact pounds</th><th scope="col">Billed as</th></tr>
        </thead>
        <tbody>
          <tr><td>100 g</td><td>0.2205 lb</td><td>1 lb</td></tr>
          <tr><td>250 g</td><td>0.5512 lb</td><td>1 lb</td></tr>
          <tr><td>450 g</td><td>0.9921 lb</td><td>1 lb</td></tr>
          <tr><td>454 g</td><td>1.0009 lb</td><td>2 lb</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>2 lb</td></tr>
          <tr><td>900 g</td><td>1.9842 lb</td><td>2 lb</td></tr>
          <tr><td>908 g</td><td>2.0018 lb</td><td>3 lb</td></tr>
          <tr><td>1000 g</td><td>2.2046 lb</td><td>3 lb</td></tr>
          <tr><td>1500 g</td><td>3.3069 lb</td><td>4 lb</td></tr>
          <tr><td>2000 g</td><td>4.4092 lb</td><td>5 lb</td></tr>
          <tr><td>2500 g</td><td>5.5116 lb</td><td>6 lb</td></tr>
          <tr><td>5000 g</td><td>11.0231 lb</td><td>12 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>The 450 g and 454 g rows show the boundary clearly: four grams of difference moves the
    parcel up a whole billing tier.</p>

    <h2 id="dim">Dimensional weight</h2>

    <p>Large light parcels are often billed on volume rather than on actual weight. Carriers
    calculate a dimensional weight from the parcel's measurements and charge whichever is
    greater, actual or dimensional. A box of pillows can weigh 800 grams and still be billed as
    though it weighed several pounds.</p>

    <p>Converting grams to pounds tells you the actual weight only. If a parcel is bulky
    relative to its mass, check the carrier's dimensional weight formula as well, because the
    conversion on this page will not predict the price on its own. The divisors used vary by
    carrier and by service.</p>

    <h2 id="packaging">Weigh the packaging, not just the product</h2>

    <p>Billable weight is the weight of the finished parcel, including box, padding and tape. A
    product at 430 grams sits comfortably under the 453.59 gram boundary, but add a 40 gram box
    and it becomes 470 grams and bills as 2 lb. Weighing the product alone is the most common
    reason a shipping estimate comes out lower than the invoice.</p>

    <p>Weigh the sealed parcel exactly as it will be handed over, convert that figure, then
    round up. The conversion factor used here, 453.59237 grams per pound, is exact and set out
    with its sources on the <a href="${p}methodology/">methodology page</a>.</p>

  </section>
  </div>`
});

/* ---- guide 4: food labels ---- */
PAGES.push({
  slug: 'guides/food-label-grams-to-pounds',
  label: 'Food Labels',
  title: 'Food Labels: Converting Grams to Pounds in the Kitchen',
  desc: 'Nutrition panels use grams while American recipes use pounds. Convert between them, and see why a 500 g pack is not a 1 lb pack.',
  schema: guideSchema('food-label-grams-to-pounds', 'Food Labels: Converting Grams to Pounds in the Kitchen',
    'How to convert food package and nutrition label weights between grams and pounds.'),
  body: (p) => `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Guide</span>
    <h1>Food Labels: Converting Grams to Pounds</h1>
    <p>Nutrition panels are written in grams. American recipes are written in pounds. The same
    ingredient often appears in both units in one kitchen.</p>
  </section>
${guideCrumb(p, 'Food Labels')}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
          <li><a href="#answer">The quick answer</a></li>
          <li><a href="#packs">500 g is not 1 lb</a></li>
          <li><a href="#servings">Serving sizes</a></li>
          <li><a href="#table">Package size table</a></li>
          <li><a href="#weight-volume">Weight is not volume</a></li>
        </ul>
      </nav>
    </aside>

  <section class="prose">
${guideByline(p)}

    <p class="lead">To convert a food weight from grams to pounds, divide the grams by
    453.59237. A 500 gram pack is 1.1023 pounds, a 1,000 gram bag is 2.2046 pounds, and a
    250 gram portion is 0.5512 pounds. A pack labelled 1 lb holds 453.59 grams, which is about
    46 grams less than a 500 gram pack.</p>

    <h2 id="answer">The quick answer</h2>

    <p>Divide grams by 453.59237 for pounds, and multiply pounds by 453.59237 for grams. Most
    kitchen questions need only those two operations. A recipe calling for 2 lb of flour needs
    907.18 grams. A 400 gram tin is 0.8818 pounds. A 1.5 lb joint of meat is 680.39 grams.</p>

${miniConverter(p, 'Enter the label weight in grams to see pounds, and pounds with ounces.')}

    <h2 id="packs">A 500 gram pack is not a 1 lb pack</h2>

    <p>A 500 gram pack contains 46.41 grams more than a 1 lb pack. One pound is exactly
    453.59237 grams, so the two package sizes are close enough to be mistaken for each other
    and far enough apart to matter. Substituting one for the other is a difference of about ten
    percent.</p>

    <p>For most cooking this is harmless. For baking it is not, because bread, pastry and cake
    depend on the ratio between flour and liquid. Using a 500 gram bag where a recipe assumed a
    1 lb bag adds roughly a tenth more flour, which produces a drier dough. Weighing the amount
    the recipe actually calls for avoids the problem entirely.</p>

    <h2 id="servings">Serving sizes and nutrition panels</h2>

    <p>Nutrition panels state serving size in grams, so converting the whole package tells you
    how many servings it holds. A 1 lb package is 453.59 grams, and at a 30 gram serving size
    that is 15.1 servings. The figures on the panel are per serving, not per package, which is
    the most common misreading of a label.</p>

    <p>Package weights are also frequently rounded on the label itself. A pack marked 454 g is
    a 1 lb pack rounded up from 453.59237 grams. A pack marked 450 g is genuinely 450 grams and
    slightly under a pound. The difference is small but it is real, and it compounds when a
    recipe is scaled up.</p>

    <h2 id="table">Common package sizes</h2>

    <p>This table converts the package sizes most often seen in shops, using the exact factor of
    453.59237 grams per pound.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Food package weights converted between grams and pounds</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Pounds (lb)</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>100 g</td><td>0.2205 lb</td><td>0 lb 3.53 oz</td></tr>
          <tr><td>150 g</td><td>0.3307 lb</td><td>0 lb 5.29 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>250 g</td><td>0.5512 lb</td><td>0 lb 8.82 oz</td></tr>
          <tr><td>400 g</td><td>0.8818 lb</td><td>0 lb 14.11 oz</td></tr>
          <tr><td>453.59 g</td><td>1.0000 lb</td><td>1 lb 0.00 oz</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
          <tr><td>750 g</td><td>1.6535 lb</td><td>1 lb 10.46 oz</td></tr>
          <tr><td>1000 g</td><td>2.2046 lb</td><td>2 lb 3.27 oz</td></tr>
          <tr><td>1500 g</td><td>3.3069 lb</td><td>3 lb 4.91 oz</td></tr>
          <tr><td>2000 g</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="weight-volume">Weight and volume are different measurements</h2>

    <p>Grams and pounds both measure weight, so converting between them is exact arithmetic
    that works for any ingredient. Cups, spoons and millilitres measure volume, and converting
    weight to volume is not exact because it depends on what the ingredient is.</p>

    <p>A cup of flour and a cup of sugar weigh different amounts because their densities differ,
    which is why a single number cannot convert grams to cups for everything. Grams to pounds
    has no such problem: 500 grams of flour and 500 grams of lead are both 1.1023 pounds. If you
    need weight to volume for cooking, that requires per-ingredient densities rather than a
    single factor.</p>

    <p>The exact constants used here are published on the
    <a href="${p}methodology/">methodology page</a>, and the main
    <a href="${p}">grams to lbs converter</a> gives every result in decimal pounds and in
    pounds with ounces at the same time.</p>

  </section>
  </div>`
});

/* ------------------------------------------------------------------ write -- */

let written = [];

PAGES.forEach((page) => {
  /* Depth of the slug decides how far back the relative paths must reach:
     'about' -> '../',  'guides/baby-weight' -> '../../' */
  const p = '../'.repeat(page.slug.split('/').length);
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = head(p, page) + page.body(p) + foot(p);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  written.push(page.slug + '/index.html');
});

/* robots.txt — AI retrieval crawlers explicitly allowed */
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
`User-agent: *
Allow: /

# OpenAI
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /

# Google / Apple generative
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`, 'utf8');
written.push('robots.txt');

/* sitemap.xml */
const urls = [''].concat(PAGES.map(x => x.slug));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}/${u ? u + '/' : ''}</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>${u ? 'yearly' : 'monthly'}</changefreq>
    <priority>${u === '' ? '1.0' : (u === 'lbs-to-grams' ? '0.9' : '0.5')}</priority>
  </url>`).join('\n')}
</urlset>
`, 'utf8');
written.push('sitemap.xml');

/* ads.txt — empty until AdSense is approved, then one publisher line */
fs.writeFileSync(path.join(ROOT, 'ads.txt'),
`# ads.txt for gramstolbs.com
# After AdSense approval add exactly ONE line, in this form:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
#
# Only one publisher ID may ever appear in this file or anywhere in the site's HTML.
`, 'utf8');
written.push('ads.txt');

/* llms.txt */
fs.writeFileSync(path.join(ROOT, 'llms.txt'),
`# gramstolbs.com

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
`, 'utf8');
written.push('llms.txt');

console.log('Generated:');
written.forEach(w => console.log('  ' + w));
