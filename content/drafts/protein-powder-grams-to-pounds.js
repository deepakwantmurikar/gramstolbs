/* Draft: Protein Powder Tub Sizes — Grams to Pounds
   Backlog id: protein-powder-grams-to-pounds
   Angle: converting protein powder and supplement tub/container sizes
   between grams, kilograms and pounds for comparing containers when buying
   — US tubs are typically labeled in pounds, international tubs in grams or
   kilograms, which makes a straight size or price comparison hard without
   converting first.
   Caution from the backlog entry: unit conversion only — no dosing,
   serving-size, or supplement-safety advice. This draft deliberately stays
   on container net weight and price-per-weight only; it does not state
   scoop sizes, servings per container, or protein-per-serving figures,
   since those would cross into serving-size territory the topic is scoped
   to avoid.
   Every number below is taken from assets/js/convert.js, re-derived at the
   terminal before writing (see the self-verification note in the write-
   article skill) — not estimated.
*/

module.exports = {
  slug: 'protein-powder-grams-to-pounds',
  title: 'Protein Powder Tub Sizes: Grams to Pounds Compared',
  metaTitle: 'Protein Powder Grams to Pounds: Tub Size Chart',
  metaDesc: 'Convert protein powder tub sizes between grams, kilograms and pounds, with a US and international size chart and how to compare price per pound.',
  category: 'Guide',
  keywords: [
    'protein powder grams to pounds',
    '2lb tub how many grams',
    'supplement container weight lbs',
    'protein powder tub size chart',
    'how many pounds is a 1kg tub'
  ],
  excerpt: 'US protein powder tubs are sized in pounds while most international tubs are labeled in grams or kilograms. Here is every common tub size converted both ways, plus how to compare price when sizes don’t match.',
  dek: 'A 2 lb tub, a 900 g tub and a 1 kg tub are three different sizes that all show up on the same shelf. This converts every common size both ways so they can be compared directly.',
  datePublished: '2026-11-16',
  featuredImage: {
    eyebrow: 'Guide · Protein Powder',
    stats: ['2 lb tub|907.18 g', '5 lb tub|2267.96 g', '1 kg tub|2.2046 lb']
  },
  featuredImageAlt: 'Protein powder tub size conversion chart showing a 2 pound tub equals 907.18 grams and a 1 kilogram tub equals 2.2046 pounds',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'us-sizes', label: 'US tub sizes in grams' },
    { id: 'intl-sizes', label: 'International tub sizes in pounds' },
    { id: 'price', label: 'Comparing price per pound' },
    { id: 'worked', label: 'Converting a tub size yourself' },
    { id: 'why-differ', label: 'Why labels don’t match' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g',
    'NIST Special Publication 811, <em>Guide for the Use of the International System of Units (SI)</em> &mdash; exact conversion factors between metric and customary units'
  ],
  bodyHTML: `
    <p class="lead">Protein powder and other supplement tubs are sold in pounds in the US and
    in grams or kilograms almost everywhere else, so a "2 lb tub" and a "900 g tub" sitting
    on the same shelf are actually two different weights that look interchangeable until
    they are converted to the same unit. Divide grams by 453.59237 to get pounds, or
    multiply pounds by 453.59237 to get grams &mdash; the charts below apply that to the
    tub sizes shoppers actually see.</p>

    <h2 id="answer">The quick answer</h2>

    <p>To convert a protein powder tub's net weight from grams to pounds, divide the gram
    figure by 453.59237; to go from pounds to grams, multiply by 453.59237. These three
    sizes cover most of what shows up on a supplement shelf or a product listing:</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">2 lb tub</span>
        <span class="stat-lb">907.18 g</span>
        <span class="stat-oz">0.9072 kg</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">5 lb tub</span>
        <span class="stat-lb">2,267.96 g</span>
        <span class="stat-oz">2.2680 kg</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">1 kg tub</span>
        <span class="stat-lb">2.2046 lb</span>
        <span class="stat-oz">2 lb 3.27 oz</span>
      </article>
    </div>

    <h2 id="us-sizes">Common US tub sizes converted to grams and kilograms</h2>

    <p>US protein powder is almost always labeled by net weight in pounds, most often 1,
    2, 4 or 5 lb, with some bulk and "super size" formats going up to 6 lb, 6.6 lb or
    10 lb. Converting each to grams and kilograms makes it possible to line a US tub up
    against an international one labeled the other way:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>US protein powder tub size converted to grams and kilograms</caption>
        <thead>
          <tr><th scope="col">Tub size (lb)</th><th scope="col">Grams (g)</th><th scope="col">Kilograms (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>1 lb</td><td>453.59 g</td><td>0.4536 kg</td></tr>
          <tr><td>1.5 lb</td><td>680.39 g</td><td>0.6804 kg</td></tr>
          <tr><td>2 lb</td><td>907.18 g</td><td>0.9072 kg</td></tr>
          <tr><td>3 lb</td><td>1,360.78 g</td><td>1.3608 kg</td></tr>
          <tr><td>4 lb</td><td>1,814.37 g</td><td>1.8144 kg</td></tr>
          <tr><td>5 lb</td><td>2,267.96 g</td><td>2.2680 kg</td></tr>
          <tr><td>6 lb</td><td>2,721.55 g</td><td>2.7216 kg</td></tr>
          <tr><td>10 lb</td><td>4,535.92 g</td><td>4.5359 kg</td></tr>
        </tbody>
      </table>
    </div>

    <p>The jump from a 2 lb tub to a 5 lb tub is not "a bit bigger" &mdash; it is 1,360.78
    extra grams, more than the entire 2 lb tub again plus half of another one. Reading the
    gram figure rather than just comparing "2" against "5" makes the actual size difference
    concrete.</p>

    <h2 id="intl-sizes">Common international tub sizes converted to pounds</h2>

    <p>Outside the US, protein powder is typically labeled in grams for smaller tubs and
    kilograms for bulk sizes, most commonly 500 g, 750 g, 900 g, 1 kg or 2 kg. None of
    these line up exactly with a whole-pound US size, which is the reason a straight
    label-to-label comparison is misleading:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>International protein powder tub size converted to pounds</caption>
        <thead>
          <tr><th scope="col">Tub size (g)</th><th scope="col">Decimal pounds</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
          <tr><td>750 g</td><td>1.6535 lb</td><td>1 lb 10.46 oz</td></tr>
          <tr><td>900 g</td><td>1.9842 lb</td><td>1 lb 15.75 oz</td></tr>
          <tr><td>1,000 g (1 kg)</td><td>2.2046 lb</td><td>2 lb 3.27 oz</td></tr>
          <tr><td>2,000 g (2 kg)</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
          <tr><td>2,500 g (2.5 kg)</td><td>5.5116 lb</td><td>5 lb 8.18 oz</td></tr>
        </tbody>
      </table>
    </div>

    <p>A 900 g tub, a common international "large" size, is 1.9842 pounds &mdash; close to
    but not the same as a US 2 lb tub, which is 907.18 g. The two look like the same size at
    a glance; the actual difference is 7.18 grams, small enough to ignore for most buying
    decisions but large enough that the two numbers are not interchangeable in a spec sheet
    or an import listing.</p>

    <h2 id="price">Comparing price per pound when tub sizes don't match</h2>

    <p>The only fair way to compare two tubs priced and sized differently is price per
    pound (or per 100 g), not price per tub. A 907 g tub and a 2,000 g tub are not simply
    "one is bigger," they are two specific weights, and converting both to the same unit
    before comparing price is what actually shows which is the better deal:</p>

    <div class="worked">
      Tub A: 907 g for $39.99 &rarr; 1.9996 lb &rarr; <strong>$20.00 per pound</strong><br>
      Tub B: 2,000 g for $74.99 &rarr; 4.4092 lb &rarr; <strong>$17.01 per pound</strong><br>
      Same comparison per 100 g: Tub A <strong>$4.41</strong>, Tub B <strong>$3.75</strong>
    </div>

    <p>In this example Tub B works out to roughly 15% cheaper per pound than Tub A, a
    difference that is invisible if the two listings are only compared by sticker price or
    by tub count. The same method applies to any two sizes: convert both net weights to the
    same unit, divide each price by that weight, and compare the resulting per-pound or
    per-100-gram figures directly.</p>

    <h2 id="worked">Converting a tub size yourself</h2>

    <p>To convert any tub weight not already in the charts above, divide grams by
    453.59237 for pounds, or multiply pounds by 453.59237 for grams. Here is 1,350 grams, a
    size between the 1 kg and 2 kg rows above:</p>

    <div class="worked">
      1,350 &divide; 453.59237 = <strong>2.9762</strong> lb<br>
      whole pounds &rarr; <strong>2</strong> lb<br>
      0.9762 &times; 16 = <strong>15.62</strong> oz<br>
      result &rarr; <strong>2 lb 15.62 oz</strong>
    </div>

    <p>The <a href="../../">converter</a> does this calculation instantly for any gram or
    pound figure, with a choice of 2, 4 or 6 decimal places, which is useful when a product
    page or shipping label gives a tub weight that doesn't match a round chart value.</p>

    <h2 id="why-differ">Why US and international labels don't match</h2>

    <p>US tubs are labeled in pounds because the US uses the avoirdupois pound as its
    standard unit of weight for retail goods, while most other countries label by the
    metric system, in grams and kilograms, following their own packaging regulations.
    Neither system is more accurate than the other &mdash; a pound is defined as exactly
    453.59237 grams, so converting between them is a fixed, exact calculation rather than
    an approximation, and the mismatch is purely about which unit a given market's
    packaging rules require.</p>

    <p>Tub sizes within a single brand also shift over time, sometimes by a small amount,
    as formulas, packaging and manufacturing costs change &mdash; coverage of the
    supplement industry in 2026 has noted several brands adjusting net container weights,
    in both directions, across different markets. None of that changes the conversion
    formula itself: whatever the current net weight on a tub reads, in grams or in pounds,
    453.59237 is still the fixed number that moves a figure from one unit to the other.</p>
  `,
  faqs: [
    {
      q: 'How many grams are in a 2 lb protein powder tub?',
      a: 'A 2 lb protein powder tub is 907.18 grams, from multiplying 2 by 453.59237, the exact number of grams in one pound. This is the net container weight, not a serving size — the same calculation applies to any product sold by the pound.'
    },
    {
      q: 'How many pounds is a 1 kg protein powder tub?',
      a: 'A 1 kg (1,000 gram) protein powder tub is 2.2046 pounds, or 2 lb 3.27 oz written as pounds and ounces. This comes from dividing 1,000 by 453.59237, the fixed number of grams in one pound.'
    },
    {
      q: 'Is a 5 lb tub exactly two and a half times the size of a 2 lb tub?',
      a: 'Yes. 5 lb is 2,267.96 g and 2 lb is 907.18 g, and 2,267.96 divided by 907.18 is exactly 2.5, because converting pounds to grams is a straight multiplication by 453.59237 — the ratio between any two pound amounts carries over unchanged to their gram equivalents.'
    },
    {
      q: 'Why do some protein powder tubs show grams and others show pounds?',
      a: 'It depends on which market the tub is labeled for. US retail packaging is weighed and labeled in pounds, the country’s standard unit for retail goods, while most other countries label in grams or kilograms under their own metric packaging rules. Neither unit is more precise; 453.59237 grams equals exactly one pound either way.'
    },
    {
      q: 'How do I compare price between a tub priced in pounds and one priced in kilograms?',
      a: 'Convert both tubs’ net weight to the same unit first, then divide each price by that weight. For example, a 907 g tub (1.9996 lb) priced at $39.99 works out to $20.00 per pound, while a 2,000 g tub (4.4092 lb) priced at $74.99 works out to $17.01 per pound — only visible once both are converted to the same unit.'
    },
    {
      q: 'Does a tub labeled "2 lb" always weigh exactly 907.18 grams?',
      a: 'It should, since 2 lb is defined as exactly 907.18 g, but the real net weight printed on a label can change between product runs or reformulations even when the pound figure on the front stays the same. The gram figure actually printed on that specific tub’s label is the one to convert, not an assumption based on the pound number alone.'
    }
  ]
};
