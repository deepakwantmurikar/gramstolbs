/* Draft: International Shipping Weight Brackets by Country
   Country-by-country comparison of postal weight brackets (US, UK, Canada,
   Australia) in grams and pounds. Distinct from guides/shipping-weight-
   grams-to-pounds (US carrier rounding-up behavior in general) — this page
   is a structured cross-country bracket comparison.
   Every number below is taken from tools/lib data verified against
   assets/js/convert.js before writing — see the terminal output this was
   built from. No prices are stated anywhere on this page, only weight
   brackets, per this topic's cautions field.
*/

module.exports = {
  slug: 'international-shipping-brackets-by-country',
  title: 'Shipping Weight Brackets: US, UK, Canada & Australia',
  metaTitle: 'Shipping Weight Brackets by Country — Grams to Pounds',
  metaDesc: 'USPS, Royal Mail, Canada Post and Australia Post weight brackets converted to grams and pounds, side by side, so you can see where each boundary falls.',
  category: 'Guide',
  keywords: [
    'international shipping weight grams pounds',
    'royal mail weight bands lbs',
    'usps weight bracket grams',
    'shipping weight brackets by country'
  ],
  excerpt: 'USPS, Royal Mail, Canada Post and Australia Post postal weight brackets, converted to grams and pounds and lined up side by side for anyone shipping internationally.',
  dek: 'Four postal systems, four sets of weight brackets. Here is every boundary converted to both grams and pounds, so a package weight in either unit shows exactly which bracket it falls into.',
  datePublished: '2026-09-16',
  featuredImage: {
    eyebrow: 'Guide · Shipping',
    stats: ['750 g Royal Mail large letter|1.6535 lb', '2 kg small packet, US & UK|4.4092 lb', '22 kg Australia Post max|48.5017 lb']
  },
  featuredImageAlt: 'International shipping weight bracket comparison chart showing Royal Mail large letter at 750 grams equals 1.6535 pounds and Australia Post 22 kilogram parcel maximum equals 48.5017 pounds',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'table', label: 'Weight brackets by country' },
    { id: 'rounding', label: 'How each country rounds' },
    { id: 'worked', label: 'Worked example' },
    { id: 'situations', label: 'Related guides' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'USPS Postal Explorer, <em>International Mail Manual</em> &mdash; country price groups and weight limits',
    'Royal Mail, <em>Size &amp; Weight Guide</em> &mdash; parcels, letters and envelopes',
    'Canada Post, <em>Parcel Services &mdash; U.S. and International</em> &mdash; size and weight restrictions',
    'Australia Post, <em>Size and Weight Guidelines</em>'
  ],
  bodyHTML: `
    <p class="lead">Postal weight brackets are not the same size from one country to the next: a
    Royal Mail large letter tops out at 750 grams (1.6535 pounds), while a USPS First-Class
    Package International Service item can weigh up to 1,814.37 grams (4 pounds) and still
    count as the lightest international bracket. This guide converts every major bracket
    boundary from four postal systems into both grams and pounds, and gives the rounding
    rule each one uses. It gives the unit conversion only &mdash; confirm current pricing on
    the carrier's own site before shipping, since brackets and rates both change over time.</p>

    <h2 id="answer">The quick answer: brackets differ by country, not just by weight</h2>

    <p>A package that clears the lightest bracket in one country can land in a heavier,
    costlier bracket in another, because each postal system sets its own boundaries. The
    table below lines up the four systems covered here &mdash; USPS (US), Royal Mail (UK),
    Canada Post and Australia Post &mdash; so a single weight in grams or pounds can be
    checked against all four at once.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">100 g</span>
        <span class="stat-lb">0.2205 lb</span>
        <span class="stat-oz">Royal Mail letter max</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">750 g</span>
        <span class="stat-lb">1.6535 lb</span>
        <span class="stat-oz">Royal Mail large letter max</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">1,814.37 g</span>
        <span class="stat-lb">4 lb</span>
        <span class="stat-oz">USPS First-Class Package Intl max</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">2,000 g</span>
        <span class="stat-lb">4.4092 lb</span>
        <span class="stat-oz">Small packet max, UK &amp; Canada</span>
      </article>
    </div>

    <h2 id="table">Weight brackets by country, in grams and pounds</h2>

    <p>Each row is the maximum weight for that service tier, converted at the exact factor
    of 453.59237 grams per pound. Brackets and service names change over time, so treat
    this as the unit conversion for whatever bracket your carrier currently lists, not as
    a guarantee that these exact tiers are still current when you ship.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Postal weight bracket maximums by country, converted to grams and pounds</caption>
        <thead>
          <tr><th scope="col">Country / carrier</th><th scope="col">Service tier</th><th scope="col">Maximum weight</th><th scope="col">In grams</th><th scope="col">In pounds</th></tr>
        </thead>
        <tbody>
          <tr><td>UK &mdash; Royal Mail</td><td>Letter</td><td>up to 100 g</td><td>100 g</td><td>0.2205 lb</td></tr>
          <tr><td>UK &mdash; Royal Mail</td><td>Large letter</td><td>up to 750 g</td><td>750 g</td><td>1.6535 lb</td></tr>
          <tr><td>UK &mdash; Royal Mail</td><td>Small parcel</td><td>up to 2 kg</td><td>2,000 g</td><td>4.4092 lb</td></tr>
          <tr><td>UK &mdash; Royal Mail</td><td>Medium parcel</td><td>up to 20 kg</td><td>20,000 g</td><td>44.0925 lb</td></tr>
          <tr><td>US &mdash; USPS</td><td>First-Class Package International Service</td><td>up to 4 lb</td><td>1,814.37 g</td><td>4 lb</td></tr>
          <tr><td>US &mdash; USPS</td><td>Priority Mail International</td><td>up to 70 lb</td><td>31,751.47 g</td><td>70 lb</td></tr>
          <tr><td>Canada &mdash; Canada Post</td><td>Small Packet International</td><td>up to 2 kg</td><td>2,000 g</td><td>4.4092 lb</td></tr>
          <tr><td>Canada &mdash; Canada Post</td><td>International parcel</td><td>up to 30 kg</td><td>30,000 g</td><td>66.1387 lb</td></tr>
          <tr><td>Australia &mdash; Australia Post</td><td>Flat-rate satchel/box tiers</td><td>up to 5 kg</td><td>5,000 g</td><td>11.0231 lb</td></tr>
          <tr><td>Australia &mdash; Australia Post</td><td>Parcel Post (own packaging)</td><td>up to 22 kg</td><td>22,000 g</td><td>48.5017 lb</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="rounding">How each country rounds a weight into a bracket</h2>

    <p>USPS rounds a package weight up to the next whole pound for domestic and
    international services alike: a package weighing 3 lb 4 oz is charged at the 4 lb
    bracket, not 3 lb. Some lightweight USPS Ground Advantage items instead round up to
    the next ounce increment (4 oz, 8 oz, 12 oz, 15.999 oz) rather than a full pound.
    Royal Mail, Canada Post and Australia Post all size a package against their published
    gram or kilogram tiers the same way: any weight over a tier's stated maximum moves the
    package into the next tier up, so a 2,100 gram package in the UK falls outside the
    2 kg small parcel tier even though it is only 100 grams over.</p>

    <p>Carriers may also bill by dimensional weight &mdash; a figure calculated from a
    package's length, width and height rather than its scale weight &mdash; and charge
    whichever is higher. That calculation is separate from the gram-to-pound conversion on
    this page and is worth checking directly with the carrier for an oversized but light
    package, since a large, mostly empty box can be billed as if it were much heavier than
    it actually weighs.</p>

    <h2 id="worked">Worked example: where a 3.2 kg parcel lands in each country</h2>

    <p>3,200 grams is 7.0548 pounds. Here is which bracket that weight falls into under
    each system in the table above:</p>

    <div class="worked">
      3,200 g &divide; 453.59237 = <strong>7.0548</strong> lb<br>
      UK (Royal Mail): over the 2 kg small parcel max &rarr; falls in the <strong>medium parcel</strong> tier (up to 20 kg)<br>
      US (USPS): over the 4 lb First-Class Package Intl. max &rarr; falls under <strong>Priority Mail International</strong> (up to 70 lb)<br>
      Canada (Canada Post): over the 2 kg Small Packet Intl. max &rarr; falls under the <strong>international parcel</strong> tier (up to 30 kg)<br>
      Australia (Australia Post): over the 5 kg flat-rate max &rarr; falls under <strong>Parcel Post</strong> priced by weight or cubic weight (up to 22 kg)
    </div>

    <p>The same physical package, unchanged, sits in a different named tier in every
    country simply because the tier boundaries are set at different weights. Converting
    the actual weight to both grams and pounds first, then checking it against the
    current bracket table on the carrier's own site, is the only reliable way to know
    which tier applies before shipping.</p>

    <h2 id="situations">Related guides</h2>

    <p>This page compares bracket boundaries across countries. Two related guides cover
    other parts of the shipping weight question:</p>

    <div class="card-grid">
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
        <h3>US carrier rounding in detail</h3>
        <p>How USPS and other US carriers round a scale weight up to the next whole pound, with the bracket boundaries laid out on their own.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../../guides/shipping-weight-grams-to-pounds/">Read the guide &rarr;</a>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="2"/></svg></span>
        <h3>Grams to pounds conversion chart</h3>
        <p>A general reference table from 100 g to 10,000 g for any weight not covered by a specific bracket above.</p>
        <a class="guide-more" style="display:inline-block;margin-top:0.5rem" href="../grams-to-pounds-conversion-chart/">Read the chart &rarr;</a>
      </article>
    </div>
  `,
  faqs: [
    {
      q: 'Does USPS round package weight up to the next pound?',
      a: 'Yes. USPS rounds a package up to the next whole pound for both domestic and international services, so a package weighing 3 lb 4 oz (1,474.18 g) is charged at the 4 lb (1,814.37 g) bracket. Some lightweight USPS Ground Advantage items round to the next ounce increment instead of a full pound.'
    },
    {
      q: 'Why was my package charged for more weight than it actually weighs?',
      a: "Two separate things can push a billed weight above the scale weight: rounding up to the next bracket (covered above), and dimensional weight, where a carrier calculates a weight from the package's length, width and height and bills whichever figure is higher. A large, lightly packed box can be billed at a higher weight than its actual scale reading for this reason."
    },
    {
      q: 'How many grams is the Royal Mail large letter weight limit?',
      a: 'The Royal Mail large letter limit is 750 grams, which is 1.6535 pounds. Above that weight, an item no longer qualifies as a large letter and is priced as a small parcel instead, which has its own 2 kg (4.4092 lb) maximum.'
    },
    {
      q: 'What is the weight limit for USPS First-Class Package International Service?',
      a: 'The maximum weight for USPS First-Class Package International Service is 4 pounds, which is 1,814.37 grams. A package over that weight moves up to Priority Mail International, which has a 70 pound (31,751.47 gram) maximum.'
    },
    {
      q: 'What is the maximum weight for a Canada Post international parcel?',
      a: "A Canada Post international parcel has a maximum weight of 30 kilograms, which is 66.1387 pounds. Canada Post's lighter Small Packet International service is capped much lower, at 2 kilograms (4.4092 pounds)."
    },
    {
      q: "What is Australia Post's maximum parcel weight?",
      a: "Sending a parcel with your own packaging through Australia Post's Parcel Post service allows up to 22 kilograms, which is 48.5017 pounds. Australia Post's flat-rate satchels and boxes are capped lower, at 5 kilograms (11.0231 pounds), before Parcel Post pricing by weight or cubic weight applies."
    }
  ]
};
