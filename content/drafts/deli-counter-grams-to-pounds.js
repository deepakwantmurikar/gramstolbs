/* Draft: Deli Counter — Grams to Pounds
   Backlog id: deli-counter-grams-to-pounds
   Angle: converting a gram-based recipe amount into what to actually say at
   a US deli or butcher counter, since counter scales read pounds and ounces,
   not decimal pounds or grams.
   Every number below is taken from assets/js/convert.js, re-derived at the
   terminal before writing (see the self-verification note in the write-
   article skill) — not estimated.
*/

module.exports = {
  slug: 'deli-counter-grams-to-pounds',
  title: 'How Many Pounds to Ask For at the Deli When a Recipe Says Grams',
  metaTitle: 'Deli Counter Grams to Pounds | gramstolbs.com',
  metaDesc: 'Convert a recipe’s gram amount into pounds and ounces so you can order it correctly at a US deli or butcher counter, with a chart and worked examples.',
  category: 'Guide',
  keywords: [
    'grams to pounds deli counter',
    'how many pounds to ask for at the deli',
    'convert recipe grams to pounds',
    'deli meat grams to pounds chart'
  ],
  excerpt: 'A US deli scale reads pounds and ounces, not the grams your recipe gives you. Here is the chart and the formula to convert any recipe amount to what to say at the counter.',
  dek: 'US deli and butcher scales are calibrated in pounds and ounces. This converts any gram amount from a recipe into the figure to actually say at the counter.',
  datePublished: '2026-09-11',
  featuredImage: {
    eyebrow: 'Guide · Deli Counter',
    stats: ['250 g|0.5512 lb', '500 g|1.1023 lb', '1000 g|2.2046 lb']
  },
  featuredImageAlt: 'Deli counter conversion chart showing 250 grams equals 0.5512 pounds and 500 grams equals 1.1023 pounds, for converting a recipe gram amount to a pound order at a US deli counter',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'chart', label: 'Recipe amounts converted' },
    { id: 'pounds-ounces', label: 'Why the scale reads lb & oz' },
    { id: 'worked', label: 'Worked examples' },
    { id: 'rounding', label: 'Why it won’t match exactly' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g, and the avoirdupois ounce as exactly 28.349523125 g',
    'Tony’s Delicatessen &amp; Fresh Meats, <em>How Many Pounds Should I Order at the Deli?</em> &mdash; on quarter- and half-pound as the common US deli counter ordering increments'
  ],
  bodyHTML: `
    <p class="lead">A recipe or spec sheet written in grams does not match what a US deli
    counter scale reads, because that scale is calibrated in pounds and ounces, not grams
    or decimal pounds. Divide the gram figure by 453.59237 to get decimal pounds, or use
    the chart and worked examples below to get the exact figure worth saying out loud at
    the counter.</p>

    <h2 id="answer">The quick answer</h2>

    <p>To convert a recipe's gram amount into what to ask for at a US deli counter,
    divide the grams by 453.59237 to get decimal pounds, then multiply the decimal part
    by 16 to get ounces &mdash; a pounds-and-ounces figure is closer to how a counter
    scale actually displays the weight than a decimal pound is. These three amounts cover
    most recipe conversions people look up:</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">225 g</span>
        <span class="stat-lb">0.496 lb</span>
        <span class="stat-oz">0 lb 7.94 oz</span>
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

    <h2 id="chart">Recipe amounts converted to deli-counter pounds and ounces</h2>

    <p>This chart converts the recipe gram amounts most often looked up for a deli or
    butcher order, from a 100 g garnish quantity up to a 1.5 kg roast, into decimal
    pounds and the pounds-and-ounces figure a counter scale actually shows. For any
    amount not listed here, the <a href="../../">grams to lbs converter</a> gives an
    exact figure instantly.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Recipe grams converted to pounds and to pounds &amp; ounces</caption>
        <thead>
          <tr><th scope="col">Recipe amount (g)</th><th scope="col">Decimal pounds</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>100 g</td><td>0.2205 lb</td><td>0 lb 3.53 oz</td></tr>
          <tr><td>150 g</td><td>0.3307 lb</td><td>0 lb 5.29 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>225 g</td><td>0.4960 lb</td><td>0 lb 7.94 oz</td></tr>
          <tr><td>250 g</td><td>0.5512 lb</td><td>0 lb 8.82 oz</td></tr>
          <tr><td>300 g</td><td>0.6614 lb</td><td>0 lb 10.58 oz</td></tr>
          <tr><td>340 g</td><td>0.7496 lb</td><td>0 lb 11.99 oz</td></tr>
          <tr><td>400 g</td><td>0.8818 lb</td><td>0 lb 14.11 oz</td></tr>
          <tr><td>450 g</td><td>0.9921 lb</td><td>0 lb 15.87 oz</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
          <tr><td>600 g</td><td>1.3228 lb</td><td>1 lb 5.16 oz</td></tr>
          <tr><td>750 g</td><td>1.6535 lb</td><td>1 lb 10.46 oz</td></tr>
          <tr><td>900 g</td><td>1.9842 lb</td><td>1 lb 15.75 oz</td></tr>
          <tr><td>1000 g</td><td>2.2046 lb</td><td>2 lb 3.27 oz</td></tr>
          <tr><td>1250 g</td><td>2.7558 lb</td><td>2 lb 12.09 oz</td></tr>
          <tr><td>1500 g</td><td>3.3069 lb</td><td>3 lb 4.91 oz</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="pounds-ounces">Why the counter scale reads pounds and ounces, not grams</h2>

    <p>US deli and butcher scales are calibrated in avoirdupois pounds and ounces
    because that is the customary system the United States has kept, while most
    countries that write recipes in grams switched their scales to the metric system
    decades ago. One avoirdupois pound is defined as exactly 453.59237 grams, and it
    splits into 16 ounces of exactly 28.349523125 grams each &mdash; that 16-way split
    is why a counter scale shows a figure like "1 lb 1.64 oz" instead of a single
    decimal number. A commercial deli scale can usually be switched to display grams
    or kilograms, but the default the counter staff read from, and the increments they
    are used to cutting to, are pounds and ounces.</p>

    <h2 id="worked">Worked examples</h2>

    <p>Two gram amounts that do not land on a round pound figure, worked step by step,
    show the same method used for any number a recipe gives.</p>

    <div class="worked">
      Recipe calls for <strong>350 g</strong> of prosciutto<br>
      350 &divide; 453.59237 = <strong>0.7716</strong> lb<br>
      whole pounds &rarr; <strong>0</strong> lb<br>
      0.7716 &times; 16 = <strong>12.35</strong> oz<br>
      result &rarr; <strong>0 lb 12.35 oz</strong>, close enough to say "twelve ounces,
      or three-quarters of a pound"
    </div>

    <div class="worked">
      Recipe calls for <strong>230 g</strong> of salami<br>
      230 &divide; 453.59237 = <strong>0.5071</strong> lb<br>
      whole pounds &rarr; <strong>0</strong> lb<br>
      0.5071 &times; 16 = <strong>8.11</strong> oz<br>
      result &rarr; <strong>0 lb 8.11 oz</strong>, close enough to say "eight ounces,
      or half a pound"
    </div>

    <h2 id="rounding">Why the number on the receipt won't always match exactly</h2>

    <p>A deli counter slices to the nearest cut, not to the nearest hundredth of a
    pound, so the figure converted from a recipe's gram amount is a target to ask for
    rather than a guarantee of what the scale will read. Many delis, including
    independent butcher counters, default to quarter-pound and half-pound increments
    when someone orders by ear rather than by an exact written weight, since those are
    the fractions staff cut to fastest and most consistently. That is why the worked
    examples above end in a plain-language amount like "three-quarters of a pound"
    rather than the unrounded decimal: saying "0.7716 pounds" to a person slicing meat
    is far less useful than saying "twelve ounces," even though both describe the same
    350 grams. If a recipe genuinely needs the precise figure &mdash; for a formulated
    product rather than a home dish, say &mdash; ask the counter to weigh to the tenth
    of an ounce and adjust the slice count, rather than relying on the round-number
    request to land exactly.</p>
  `,
  faqs: [
    {
      q: 'What is 500 grams of meat in pounds?',
      a: '500 grams is 1.1023 pounds, or 1 pound 1.64 ounces. That comes from dividing 500 by 453.59237, the exact number of grams in one international avoirdupois pound. At a US deli counter, the practical way to say this is "a little over one pound," or "one pound and about one and two-thirds ounces" if the scale is reading ounces.'
    },
    {
      q: 'How do I convert grams to pounds and ounces instead of just decimal pounds?',
      a: 'Divide the gram figure by 453.59237 to get decimal pounds, then multiply everything after the decimal point by 16 to get ounces. For example, 350 grams divided by 453.59237 is 0.7716 pounds; 0.7716 multiplied by 16 is 12.35 ounces, so 350 grams is 0 pounds 12.35 ounces, the form a deli scale actually displays.'
    },
    {
      q: 'Why do recipes list weight in grams while US delis sell by the pound?',
      a: 'Most gram-based recipes come from countries that switched their scales to the metric system decades ago, where cooks weigh ingredients directly in grams. The United States never replaced its customary system for everyday commerce, so deli and butcher scales are still calibrated in pounds and ounces, the units a counter transaction is priced and weighed in.'
    },
    {
      q: 'What if my recipe’s gram amount doesn’t convert to a round pound figure, like 340 grams?',
      a: 'Convert it anyway and ask for the closest practical fraction. 340 grams is 0.7496 pounds, or 0 pounds 11.99 ounces — close enough to 12 ounces, three-quarters of a pound, that a counter cutting to that fraction will land well within the normal slicing variance of a hand-cut order.'
    },
    {
      q: 'Should I ask for more than the recipe’s gram figure to allow for cooking loss?',
      a: 'Only if the recipe’s gram figure is a cooked weight rather than a raw one — check which the recipe specifies before converting. Whole cuts of meat commonly lose roughly a fifth to a quarter of their weight during cooking, so a recipe written around a cooked-weight figure needs a larger raw order than the same number converted directly, while a recipe written around a raw or as-purchased weight needs no adjustment.'
    },
    {
      q: 'Can I just tell the deli counter the number in grams?',
      a: 'Some digital deli scales have a grams setting, but most US counters are calibrated in pounds and ounces by default, and the person slicing may not have a quick way to convert on the spot. Converting the figure yourself before ordering, using the chart above or the grams to lbs converter, is the more reliable way to get the amount the recipe actually calls for.'
    }
  ]
};
