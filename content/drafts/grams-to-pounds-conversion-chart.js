/* Draft: Grams to Pounds Conversion Chart
   Test article for the publish-article.js pipeline — also a genuinely
   publishable page (a reference-chart hub linking out to the four existing
   situational guides, so it doesn't duplicate them).
   Every number below is taken from tools/lib data verified against
   assets/js/convert.js before writing — see the terminal output this was
   built from.
*/

module.exports = {
  slug: 'grams-to-pounds-conversion-chart',
  title: 'Grams to Pounds Conversion Chart (1 g to 10,000 g)',
  metaTitle: 'Grams to Pounds Conversion Chart — Free Reference Table',
  metaDesc: 'A grams to pounds conversion chart from 100 g to 10,000 g, with decimal pounds and pounds-and-ounces for every row. Free to use, no sign-up.',
  category: 'Reference',
  keywords: [
    'grams to pounds conversion chart',
    'grams to lbs chart',
    'g to lb conversion table',
    'printable grams to pounds chart'
  ],
  excerpt: 'A full reference table from 100 g to 10,000 g, in decimal pounds and in pounds and ounces, plus quick answers for the values people look up most.',
  dek: 'A single reference table covering 100 grams to 10,000 grams, so you can look up a value directly instead of calculating it.',
  datePublished: '2026-08-20',
  featuredImage: {
    eyebrow: 'Reference · Free Chart',
    stats: ['500 g|1.1023 lb', '1000 g|2.2046 lb', '5000 g|11.0231 lb']
  },
  featuredImageAlt: 'Grams to pounds conversion chart cover graphic showing 500 g equals 1.1023 pounds and 1000 g equals 2.2046 pounds',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'chart', label: 'Full conversion chart' },
    { id: 'worked', label: 'How to read the chart' },
    { id: 'situations', label: 'Chart for your situation' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'NIST Special Publication 811, <em>Guide for the Use of the International System of Units (SI)</em> &mdash; exact conversion factors',
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g'
  ],
  bodyHTML: `
    <p class="lead">This chart converts grams to pounds from 100 g to 10,000 g in one
    table, so a value can be looked up directly instead of calculated. Every figure uses
    the exact factor of 453.59237 grams per pound, the same figure the
    <a href="../../">grams to lbs converter</a> uses for any value not listed here.</p>

    <h2 id="answer">The quick answer for the most-searched values</h2>

    <p>These four come up more than any other value. Each is shown as decimal pounds and
    as pounds with ounces, because "1.1023 pounds" and "1 lb 1.64 oz" describe the same
    weight and people search for both forms.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">100 g</span>
        <span class="stat-lb">0.2205 lb</span>
        <span class="stat-oz">0 lb 3.53 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">250 g</span>
        <span class="stat-lb">0.5512 lb</span>
        <span class="stat-oz">0 lb 8.82 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">500 g</span>
        <span class="stat-lb">1.1023 lb</span>
        <span class="stat-oz">1 lb 1.64 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">1000 g</span>
        <span class="stat-lb">2.2046 lb</span>
        <span class="stat-oz">2 lb 3.27 oz</span>
      </article>
    </div>

    <h2 id="chart">Full grams to pounds conversion chart</h2>

    <p>The table runs in 100 gram steps to 1,000 g, then 500 gram steps to 5,000 g, then
    1,000 gram steps to 10,000 g. For anything between two rows, the
    <a href="../../">converter</a> gives an exact figure at any value.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Grams to pounds, decimal and pounds-and-ounces, rounded for display</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Pounds (lb)</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>100 g</td><td>0.2205 lb</td><td>0 lb 3.53 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>300 g</td><td>0.6614 lb</td><td>0 lb 10.58 oz</td></tr>
          <tr><td>400 g</td><td>0.8818 lb</td><td>0 lb 14.11 oz</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
          <tr><td>600 g</td><td>1.3228 lb</td><td>1 lb 5.16 oz</td></tr>
          <tr><td>700 g</td><td>1.5432 lb</td><td>1 lb 8.69 oz</td></tr>
          <tr><td>800 g</td><td>1.7637 lb</td><td>1 lb 12.22 oz</td></tr>
          <tr><td>900 g</td><td>1.9842 lb</td><td>1 lb 15.75 oz</td></tr>
          <tr><td>1000 g</td><td>2.2046 lb</td><td>2 lb 3.27 oz</td></tr>
          <tr><td>1500 g</td><td>3.3069 lb</td><td>3 lb 4.91 oz</td></tr>
          <tr><td>2000 g</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
          <tr><td>2500 g</td><td>5.5116 lb</td><td>5 lb 8.18 oz</td></tr>
          <tr><td>3000 g</td><td>6.6139 lb</td><td>6 lb 9.82 oz</td></tr>
          <tr><td>3500 g</td><td>7.7162 lb</td><td>7 lb 11.46 oz</td></tr>
          <tr><td>4000 g</td><td>8.8185 lb</td><td>8 lb 13.10 oz</td></tr>
          <tr><td>4500 g</td><td>9.9208 lb</td><td>9 lb 14.73 oz</td></tr>
          <tr><td>5000 g</td><td>11.0231 lb</td><td>11 lb 0.37 oz</td></tr>
          <tr><td>6000 g</td><td>13.2277 lb</td><td>13 lb 3.64 oz</td></tr>
          <tr><td>7000 g</td><td>15.4324 lb</td><td>15 lb 6.92 oz</td></tr>
          <tr><td>8000 g</td><td>17.6370 lb</td><td>17 lb 10.19 oz</td></tr>
          <tr><td>9000 g</td><td>19.8416 lb</td><td>19 lb 13.47 oz</td></tr>
          <tr><td>10000 g</td><td>22.0462 lb</td><td>22 lb 0.74 oz</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="worked">How to read a value that isn't in the chart</h2>

    <p>Divide the grams by 453.59237 to get decimal pounds, then multiply the remainder
    after the decimal point by 16 to get ounces. Here is 750 grams, a value between two
    rows in the chart above:</p>

    <div class="worked">
      750 &divide; 453.59237 = <strong>1.6535</strong> lb<br>
      whole pounds &rarr; <strong>1 lb</strong><br>
      0.6535 &times; 16 = <strong>10.46</strong> oz<br>
      result &rarr; <strong>1 lb 10.46 oz</strong>
    </div>

    <p>The <a href="../../">converter</a> does this calculation for any number instantly,
    with a choice of 2, 4 or 6 decimal places.</p>

    <h2 id="situations">A chart for your specific situation</h2>

    <p>This page is a general reference table. Four situations have their own guide with
    a worked example and a table sized for that specific use:</p>

    <div class="card-grid">
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="2"/></svg></span>
        <h3>Baby birth weight</h3>
        <p>Grams to pounds and ounces from 1,000 g to 5,000 g, the range hospitals record birth weight in.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../../guides/baby-weight-grams-to-pounds/">Read the guide &rarr;</a>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18M5 8l7-5 7 5"/><circle cx="12" cy="14" r="3"/></svg></span>
        <h3>Gold and troy ounces</h3>
        <p>Precious metals use a different ounce. This chart uses ordinary pounds only &mdash; see why that matters for gold.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../../guides/gold-grams-to-pounds-troy/">Read the guide &rarr;</a>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
        <h3>Shipping weight</h3>
        <p>Carriers round up to the next whole pound. See exactly where each pricing bracket starts.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../../guides/shipping-weight-grams-to-pounds/">Read the guide &rarr;</a>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z"/><path d="M9 12l2 2 4-4"/></svg></span>
        <h3>Food labels</h3>
        <p>Why a 500 g pack and a 1 lb pack are not the same size, and how to convert package weights.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../../guides/food-label-grams-to-pounds/">Read the guide &rarr;</a>
      </article>
    </div>
  `,
  faqs: [
    {
      q: 'How do I convert grams to pounds without a calculator?',
      a: 'Use this chart for common values, or round 453.59237 to 454 and divide by that for a close estimate. 1,000 grams divided by 454 gives roughly 2.203 pounds, close to the exact 2.2046. For an exact figure, use the converter or divide by 453.59237 directly.'
    },
    {
      q: 'Is there a simple formula for grams to pounds?',
      a: 'Yes: pounds equals grams divided by 453.59237. That single division is the entire formula, because one pound is defined as exactly 453.59237 grams. Multiplying pounds by 453.59237 converts back to grams.'
    },
    {
      q: 'What is 500 grams in pounds and ounces?',
      a: '500 grams is 1 pound 1.64 ounces, or 1.1023 pounds as a decimal. Both describe the same weight; the pounds-and-ounces form is closer to how the value is normally spoken.'
    },
    {
      q: 'How many grams are in a whole number of pounds, like 5 pounds?',
      a: '5 pounds is 2,267.96 grams, calculated as 5 multiplied by 453.59237. Each whole pound adds another 453.59237 grams, so 10 pounds is 4,535.92 grams and 20 pounds is 9,071.85 grams.'
    },
    {
      q: 'Why do some grams to pounds charts show slightly different numbers?',
      a: 'Rounding. 1,000 grams is 2.2046 pounds at four decimal places and 2.204623 pounds at six; both are correct, just stopped at a different point. The underlying factor of 453.59237 grams per pound is exact and identical on every accurate chart.'
    },
    {
      q: 'Does this chart work for any substance, like gold or flour?',
      a: 'Yes for ordinary weight. Grams and pounds both measure mass, so 500 grams of flour and 500 grams of lead are both 1.1023 pounds. The one exception is precious metals, which are priced in troy ounces rather than ordinary pounds; see the gold and troy ounces guide for that conversion.'
    }
  ]
};
