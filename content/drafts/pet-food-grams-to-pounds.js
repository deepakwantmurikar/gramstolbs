/* Draft: Pet Food — Grams to Pounds
   Backlog id: pet-food-grams-to-pounds
   Angle: converting pet food and treat weights between grams (common on
   packaging, portion charts and vet handouts) and pounds (how US bags are
   sold and priced). This is a unit-conversion page only — it does not
   recommend or imply any feeding amount, portion, or dosage. It converts
   whatever weight figure the reader already has, whether that is a bag
   size, a can size, or a number written on a package or handed to them by
   a vet.
   Every number below is taken from assets/js/convert.js, re-derived at the
   terminal before writing (see the self-verification note in the write-
   article skill) — not estimated.
*/

module.exports = {
  slug: 'pet-food-grams-to-pounds',
  title: 'Pet Food Grams to Pounds: Dog and Cat Food Bag & Can Sizes',
  metaTitle: 'Pet Food Grams to Pounds | gramstolbs.com',
  metaDesc: 'Convert dog and cat food bag, can and treat weights between grams and pounds, with a chart for US bag sizes, imported kg bags, and wet food containers.',
  category: 'Guide',
  keywords: [
    'dog food grams to pounds',
    'pet food portion grams to lbs',
    'cat food grams to pounds',
    'pet food bag size grams to pounds'
  ],
  excerpt: 'US pet food bags are priced and labeled in pounds, but portion charts, vet handouts and imported packaging are often printed in grams. Here is the chart to convert either direction.',
  dek: 'Pet food packaging mixes units: US bags are sold by the pound, while portion charts, ingredient labels and imported packaging are often printed in grams. This converts a figure from either system into the other.',
  datePublished: '2026-09-14',
  featuredImage: {
    eyebrow: 'Guide · Pet Food',
    stats: ['400 g|0.8818 lb', '2 kg|4.4092 lb', '30 lb|13.6078 kg']
  },
  featuredImageAlt: 'Pet food weight conversion chart showing 400 grams equals 0.8818 pounds, 2 kilograms equals 4.4092 pounds, and a 30 pound bag equals 13.6078 kilograms',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'bag-sizes', label: 'US bag sizes in grams & kg' },
    { id: 'international', label: 'Imported kg bags in pounds' },
    { id: 'wet-food', label: 'Cans, pouches & treats' },
    { id: 'worked', label: 'Converting a figure from a label' },
    { id: 'scope', label: 'What this page does not do' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g',
    'NIST Special Publication 811, <em>Guide for the Use of the International System of Units (SI)</em> &mdash; exact conversion factors between metric and customary units'
  ],
  bodyHTML: `
    <p class="lead">Pet food packaging mixes two unit systems, because US bags are priced
    and labeled by the pound while portion charts, ingredient panels, vet handouts and
    imported packaging are frequently printed in grams. Divide a gram figure by
    453.59237 to get decimal pounds, or multiply a pound figure by 453.59237 to get
    grams &mdash; the chart and worked example below apply that formula to the bag,
    can and treat sizes people look up most.</p>

    <h2 id="answer">The quick answer</h2>

    <p>To convert a pet food weight from grams to pounds, divide the number of grams by
    453.59237; to go the other way, multiply the number of pounds by 453.59237. These
    three sizes cover a large share of what shows up on dog and cat food packaging:</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">400 g</span>
        <span class="stat-lb">0.8818 lb</span>
        <span class="stat-oz">0 lb 14.11 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">2 kg</span>
        <span class="stat-lb">4.4092 lb</span>
        <span class="stat-oz">4 lb 6.55 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">30 lb bag</span>
        <span class="stat-lb">13,607.77 g</span>
        <span class="stat-oz">13.6078 kg</span>
      </article>
    </div>

    <h2 id="bag-sizes">US dry pet food bag sizes converted to grams and kilograms</h2>

    <p>A US dry food bag is sold by the pound, and common sizes run from around 3 to 4
    pounds for a small bag up to 30 to 40 pounds for the largest bags stores carry.
    Converting the printed pound figure to grams or kilograms is useful when comparing
    a US bag to a metric-labeled product, or when a shipping, storage or scale limit is
    given in a metric unit.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>US bag size in pounds converted to grams and kilograms</caption>
        <thead>
          <tr><th scope="col">Bag size (lb)</th><th scope="col">Grams (g)</th><th scope="col">Kilograms (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>3 lb</td><td>1,360.78 g</td><td>1.3608 kg</td></tr>
          <tr><td>4 lb</td><td>1,814.37 g</td><td>1.8144 kg</td></tr>
          <tr><td>5 lb</td><td>2,267.96 g</td><td>2.2680 kg</td></tr>
          <tr><td>6 lb</td><td>2,721.55 g</td><td>2.7216 kg</td></tr>
          <tr><td>7 lb</td><td>3,175.15 g</td><td>3.1751 kg</td></tr>
          <tr><td>15 lb</td><td>6,803.89 g</td><td>6.8039 kg</td></tr>
          <tr><td>20 lb</td><td>9,071.85 g</td><td>9.0718 kg</td></tr>
          <tr><td>25 lb</td><td>11,339.81 g</td><td>11.3398 kg</td></tr>
          <tr><td>30 lb</td><td>13,607.77 g</td><td>13.6078 kg</td></tr>
          <tr><td>40 lb</td><td>18,143.69 g</td><td>18.1437 kg</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="international">Imported kilogram bags converted to pounds</h2>

    <p>A dry pet food bag labeled in kilograms &mdash; common on packaging made for the UK,
    the EU, Canada or Australia &mdash; converts to pounds by multiplying the kilogram
    figure by 1,000 to get grams, then dividing by 453.59237. This is the comparison to
    make when a metric-labeled bag is priced next to a US pound-labeled one and the two
    sizes are not obviously equivalent.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Kilogram bag size converted to pounds</caption>
        <thead>
          <tr><th scope="col">Bag size (kg)</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>1 kg</td><td>2.2046 lb</td></tr>
          <tr><td>2 kg</td><td>4.4092 lb</td></tr>
          <tr><td>3 kg</td><td>6.6139 lb</td></tr>
          <tr><td>4 kg</td><td>8.8185 lb</td></tr>
          <tr><td>6 kg</td><td>13.2277 lb</td></tr>
          <tr><td>10 kg</td><td>22.0462 lb</td></tr>
          <tr><td>12 kg</td><td>26.4555 lb</td></tr>
          <tr><td>15 kg</td><td>33.0693 lb</td></tr>
          <tr><td>20 kg</td><td>44.0925 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>A 15 kg bag, a common large size on metric packaging, is 33.0693 pounds &mdash;
    close to, but not the same as, a US 30 lb bag, since 30 pounds is 13.6078 kilograms
    while 15 kilograms is 33.0693 pounds. The two numbers "15" and "30" describe
    different weights depending on which unit follows them, which is exactly why
    checking the actual figure matters when a size looks familiar.</p>

    <h2 id="wet-food">Wet food cans, pouches and treat bags converted to pounds</h2>

    <p>Wet food and treats are usually sold in much smaller units than dry bags, and the
    weight is almost always printed in grams even on US packaging, since that is how
    can and pouch sizes are labeled internationally. The same formula applies at this
    smaller scale.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Wet food and treat package weight converted to pounds</caption>
        <thead>
          <tr><th scope="col">Package weight (g)</th><th scope="col">Decimal pounds</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>85 g</td><td>0.1874 lb</td><td>0 lb 3.00 oz</td></tr>
          <tr><td>156 g</td><td>0.3439 lb</td><td>0 lb 5.50 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>226 g</td><td>0.4982 lb</td><td>0 lb 7.97 oz</td></tr>
          <tr><td>400 g</td><td>0.8818 lb</td><td>0 lb 14.11 oz</td></tr>
          <tr><td>800 g</td><td>1.7637 lb</td><td>1 lb 12.22 oz</td></tr>
          <tr><td>2000 g</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
        </tbody>
      </table>
    </div>

    <p>A single-serve wet food can around 85 grams is 0.1874 pounds, or just under 3
    ounces, which is why a case of small cans is usually described in count rather than
    total weight. A larger 800 gram tin, more common on imported or bulk packaging, is
    1.7637 pounds &mdash; 1 pound 12.22 ounces on a scale that reads pounds and ounces.</p>

    <h2 id="worked">Converting a portion figure printed on a label or handout</h2>

    <p>Packaging, a printed feeding chart, or a vet's own handout sometimes gives a
    weight in grams that needs to be read in pounds, or the other way around. The
    method is the same division or multiplication used above, applied to whatever
    number is already on the page &mdash; this page converts the figure given, it does
    not supply or suggest one.</p>

    <div class="worked">
      Package or handout states <strong>340 g</strong><br>
      340 &divide; 453.59237 = <strong>0.7496</strong> lb<br>
      whole pounds &rarr; <strong>0</strong> lb<br>
      0.7496 &times; 16 = <strong>11.99</strong> oz<br>
      result &rarr; <strong>0 lb 11.99 oz</strong>, essentially three-quarters of a pound
    </div>

    <div class="worked">
      Package or handout states <strong>1.5 lb</strong><br>
      1.5 &times; 453.59237 = <strong>680.39</strong> g<br>
      result &rarr; <strong>680.39 g</strong>, or 0.6804 kg
    </div>

    <h2 id="scope">What this page does not do</h2>

    <p>This page converts a weight figure from one unit to another; it does not
    recommend a feeding amount, a portion size, or a dosage for any dog or cat. How much
    to feed a specific animal depends on its weight, age, activity level, body
    condition and the specific food's calorie density, and that judgment belongs to the
    packaging's own feeding guidelines or a veterinarian, not a unit converter. If a
    package, a printed chart, or a vet has already given a weight in grams or pounds,
    the tables and formula above convert that exact figure &mdash; they do not adjust,
    validate, or second-guess the amount itself.</p>
  `,
  faqs: [
    {
      q: 'How many grams are in a pound of pet food?',
      a: 'One pound of pet food, or of anything else, is 453.59237 grams, because a pound is defined as exactly that many grams under the international avoirdupois standard. This is a fixed unit conversion and does not depend on the type of food, the brand, or how densely it is packed.'
    },
    {
      q: 'How much does a 30 lb bag of dog food weigh in kilograms?',
      a: 'A 30 pound bag is 13.6078 kilograms, or 13,607.77 grams, calculated by multiplying 30 by 453.59237. The figure describes only the pound-to-kilogram conversion of the labeled bag weight, not how much food that bag actually contains once opened.'
    },
    {
      q: 'How many pounds is a can of wet cat food?',
      a: 'A small single-serve wet food can around 85 grams is 0.1874 pounds, just under 3 ounces, while a larger 5.5 ounce (156 gram) can is 0.3439 pounds. The exact figure depends on the can’s printed weight, which is worth checking directly since sizes vary by brand.'
    },
    {
      q: 'How many grams is a 5 pound bag of pet food?',
      a: 'A 5 pound bag is 2,267.96 grams, or 2.2680 kilograms, from multiplying 5 by 453.59237. Each additional pound adds another 453.59237 grams, so a 6 pound bag is 2,721.55 grams and a 7 pound bag is 3,175.15 grams.'
    },
    {
      q: 'How many pounds is a 400 gram bag of cat food?',
      a: '400 grams is 0.8818 pounds, or 0 pounds 14.11 ounces, from dividing 400 by 453.59237. That is just under a full pound, which is why a 400 gram bag and a 1 pound (453.59 gram) bag look close in size but are not identical.'
    },
    {
      q: 'Is pet food weighed differently from other food when converting grams to pounds?',
      a: 'No. Grams and pounds both measure mass, so the same 453.59237 grams-per-pound conversion applies to pet food, human food, or any other product with no adjustment for what is being weighed. What varies by product is only the number printed on the package, not the formula used to convert it.'
    }
  ]
};
