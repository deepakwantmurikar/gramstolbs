/* Draft: Yarn and Craft Material Weight — Grams to Pounds
   Backlog id: yarn-craft-grams-to-pounds
   Angle: converting yarn skein and ball weights (printed in grams on most
   labels) to pounds for bulk/wholesale buying, where US craft suppliers
   often price and ship by the pound. Also covers how many skeins make a
   pound, wholesale cone/pack sizes, and the common confusion between yarn
   "weight category" (thickness, e.g. DK or worsted) and actual mass weight.
   No cautions on this topic (not YMYL) — straightforward unit conversion.
   Every number below is taken from assets/js/convert.js, re-derived at the
   terminal before writing (see the self-verification note in the write-
   article skill) — not estimated.
*/

module.exports = {
  slug: 'yarn-craft-grams-to-pounds',
  title: 'Yarn Weight in Pounds: Converting Skein Grams for Bulk Buying',
  metaTitle: 'Yarn Grams to Pounds: Skein & Bulk Buying Chart',
  metaDesc: 'Convert yarn skein, ball and wholesale cone weights between grams and pounds, with a chart, a bulk-buying table, and how many skeins make a pound.',
  category: 'Guide',
  keywords: [
    'yarn grams to pounds',
    'how many pounds of yarn',
    'skein weight grams to lbs',
    'how many skeins in a pound of yarn',
    'yarn weight conversion chart'
  ],
  excerpt: 'Yarn and craft skein weights are printed in grams, but wholesale cones and bulk packs are usually priced by the pound. Here is the chart, the formula, and how many skeins actually make a pound.',
  dek: 'Skein and ball labels are almost always printed in grams, while bulk and wholesale craft yarn is priced and shipped by the pound. This converts a figure from either system into the other.',
  datePublished: '2026-11-13',
  featuredImage: {
    eyebrow: 'Guide · Yarn & Craft',
    stats: ['100 g|0.2205 lb', '454 g|1.0009 lb', '5 lb|2267.96 g']
  },
  featuredImageAlt: 'Yarn weight conversion chart showing a 100 gram skein equals 0.2205 pounds and a 5 pound wholesale cone equals 2267.96 grams',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'skeins', label: 'Skein & ball sizes in pounds' },
    { id: 'bulk', label: 'Bulk cones & wholesale packs' },
    { id: 'skeins-per-pound', label: 'How many skeins make a pound?' },
    { id: 'worked', label: 'Converting a pattern’s total' },
    { id: 'category', label: '“Yarn weight” vs. actual weight' },
    { id: 'other-materials', label: 'Other craft fill by weight' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g',
    'NIST Special Publication 811, <em>Guide for the Use of the International System of Units (SI)</em> &mdash; exact conversion factors between metric and customary units',
    'Craft Yarn Council, <em>Standard Yarn Weight System</em> &mdash; the lace-to-jumbo thickness categories referenced below'
  ],
  bodyHTML: `
    <p class="lead">Yarn and craft fiber labels are printed in grams almost everywhere, but
    US wholesale and bulk craft supply is commonly priced, listed and shipped by the pound.
    Divide a gram figure by 453.59237 to get decimal pounds, or multiply a pound figure by
    453.59237 to get grams &mdash; the charts below apply that formula to skein sizes, bulk
    packs, and the project totals a knitting or crochet pattern gives you.</p>

    <h2 id="answer">The quick answer</h2>

    <p>To convert a yarn or craft material weight from grams to pounds, divide the number
    of grams by 453.59237; to go the other way, multiply the number of pounds by
    453.59237. These three sizes cover a lot of what shows up on skein labels and
    wholesale listings:</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">100 g skein</span>
        <span class="stat-lb">0.2205 lb</span>
        <span class="stat-oz">0 lb 3.53 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">454 g (16 oz) skein</span>
        <span class="stat-lb">1.0009 lb</span>
        <span class="stat-oz">1 lb 0.01 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">5 lb wholesale cone</span>
        <span class="stat-lb">2,267.96 g</span>
        <span class="stat-oz">2.268 kg</span>
      </article>
    </div>

    <h2 id="skeins">Common skein and ball sizes converted to pounds</h2>

    <p>Most consumer skeins and balls are labeled in grams &mdash; 25 g, 50 g and 100 g are
    the sizes seen most often, with some brands going up to 150 g or 200 g. A handful of
    worsted-weight skeins are labeled in ounces instead and sold at 16 oz, which is close
    to but not exactly one true pound.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Skein or ball weight converted to pounds and ounces</caption>
        <thead>
          <tr><th scope="col">Skein weight (g)</th><th scope="col">Decimal pounds</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>25 g</td><td>0.0551 lb</td><td>0 lb 0.88 oz</td></tr>
          <tr><td>50 g</td><td>0.1102 lb</td><td>0 lb 1.76 oz</td></tr>
          <tr><td>100 g</td><td>0.2205 lb</td><td>0 lb 3.53 oz</td></tr>
          <tr><td>150 g</td><td>0.3307 lb</td><td>0 lb 5.29 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>250 g</td><td>0.5512 lb</td><td>0 lb 8.82 oz</td></tr>
          <tr><td>400 g</td><td>0.8818 lb</td><td>0 lb 14.11 oz</td></tr>
          <tr><td>453.59 g (a true pound)</td><td>1.0000 lb</td><td>1 lb 0.00 oz</td></tr>
          <tr><td>454 g (16 oz, labeled)</td><td>1.0009 lb</td><td>1 lb 0.01 oz</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
        </tbody>
      </table>
    </div>

    <p>A skein marked "16 oz" or "1 lb" on the label is normally rounded to 454 grams by
    the manufacturer, which is 1.0009 pounds &mdash; close enough to one true pound
    (453.59 g) that the difference, about 0.4 grams, never matters for buying or shipping.</p>

    <h2 id="bulk">Bulk cones and wholesale packs converted to grams and kilograms</h2>

    <p>Wholesale and bulk craft yarn is usually listed by the pound in the US, sold as
    cones or multi-pound packs rather than individual skeins. Converting that pound figure
    to grams or kilograms matters when comparing a US pound-priced listing to a
    metric-labeled cone, or when a shipping weight limit is given in kilograms.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Wholesale pack size in pounds converted to grams and kilograms</caption>
        <thead>
          <tr><th scope="col">Pack size (lb)</th><th scope="col">Grams (g)</th><th scope="col">Kilograms (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>1 lb</td><td>453.59 g</td><td>0.4536 kg</td></tr>
          <tr><td>4 lb</td><td>1,814.37 g</td><td>1.8144 kg</td></tr>
          <tr><td>5 lb</td><td>2,267.96 g</td><td>2.2680 kg</td></tr>
          <tr><td>10 lb</td><td>4,535.92 g</td><td>4.5359 kg</td></tr>
        </tbody>
      </table>
    </div>

    <p>A cone sometimes gets marketed with a rounded metric figure that does not line up
    exactly with its pound figure &mdash; a "4.5 kg / 10 lb" bulk pack, for example, is
    actually 9.9208 pounds (4,500 grams divided by 453.59237), not an even 10. Wholesalers
    also commonly note that a cone's exact weight varies slightly from the listed figure
    and that the invoice reflects the real weighed amount, not the rounded label &mdash;
    worth checking if a bulk order's packing slip looks a little off from what was ordered.</p>

    <h2 id="skeins-per-pound">How many skeins make a pound of yarn?</h2>

    <p>It depends on the skein size, but a true pound (453.59237 g) works out to about
    9.07 skeins of 50 gram yarn or about 4.54 skeins of 100 gram yarn. Some shopping
    guides round this down to "about eight 50-gram skeins per pound" for a quick mental
    estimate, which is close but slightly low &mdash; eight 50 gram skeins is only 400
    grams (0.8818 lb), not a full pound. For an exact count for any skein size, divide
    453.59237 by the skein's gram weight.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Skeins needed to reach one true pound (453.59237 g), by skein size</caption>
        <thead>
          <tr><th scope="col">Skein size</th><th scope="col">Skeins per pound (exact)</th></tr>
        </thead>
        <tbody>
          <tr><td>25 g</td><td>18.14</td></tr>
          <tr><td>50 g</td><td>9.07</td></tr>
          <tr><td>100 g</td><td>4.54</td></tr>
          <tr><td>150 g</td><td>3.02</td></tr>
          <tr><td>200 g</td><td>2.27</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="worked">Converting a pattern's total yarn weight to pounds</h2>

    <p>A pattern or project sheet sometimes lists its total yarn requirement in grams,
    which is useful to convert to pounds when comparing against a bulk pack's pound-based
    price or weight limit. Here is 1,800 grams, a figure in the range patterns commonly
    list for a full adult sweater in worsted weight:</p>

    <div class="worked">
      Pattern lists <strong>1,800 g</strong> total<br>
      1,800 &divide; 453.59237 = <strong>3.9683</strong> lb<br>
      whole pounds &rarr; <strong>3</strong> lb<br>
      0.9683 &times; 16 = <strong>15.49</strong> oz<br>
      result &rarr; <strong>3 lb 15.49 oz</strong>
    </div>

    <p>At 100 grams per skein, 1,800 grams is exactly 18 skeins; at 50 grams per skein, it
    is 36 skeins. The gram figure from the pattern, not the pound figure, is the one to
    divide by the skein's own gram weight &mdash; converting to pounds first and then
    dividing by a skein count in ounces introduces a rounding step that is not needed.</p>

    <h2 id="category">"Yarn weight" is a thickness category, not how much it weighs</h2>

    <p>A skein's "weight category" &mdash; lace, fingering, sport, DK, worsted, bulky,
    super bulky or jumbo &mdash; describes how thick the strand is, not the mass printed
    on the label, and the two are easy to mix up. The Craft Yarn Council's Standard Yarn
    Weight System names eight thickness categories, from finest to thickest:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Standard yarn weight categories, by strand thickness (not mass)</caption>
        <thead>
          <tr><th scope="col">Category number</th><th scope="col">Common name</th></tr>
        </thead>
        <tbody>
          <tr><td>0</td><td>Lace</td></tr>
          <tr><td>1</td><td>Fingering / Superfine</td></tr>
          <tr><td>2</td><td>Sport / Fine</td></tr>
          <tr><td>3</td><td>DK / Light</td></tr>
          <tr><td>4</td><td>Worsted / Aran / Medium</td></tr>
          <tr><td>5</td><td>Bulky</td></tr>
          <tr><td>6</td><td>Super Bulky</td></tr>
          <tr><td>7</td><td>Jumbo / Roving</td></tr>
        </tbody>
      </table>
    </div>

    <p>A 100 gram skein of fingering weight and a 100 gram skein of bulky weight are both
    0.2205 pounds &mdash; the same mass, converted the same way &mdash; even though the
    bulky skein is a much shorter length of much thicker strand. Thickness category and
    gram weight are two separate numbers on the same label, and only the gram figure
    converts to pounds with the formula on this page.</p>

    <h2 id="other-materials">Other craft fill materials sold by weight</h2>

    <p>Polyester fiberfill, wool batting and spinning fiber (roving or top) are also sold
    by straight weight rather than by area or length, so the same gram-to-pound formula
    applies directly. Bulk bags and boxes of stuffing or fiber follow the same wholesale
    pound sizes as yarn cones:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Bulk fiberfill, batting or spinning fiber pack size converted to grams and kilograms</caption>
        <thead>
          <tr><th scope="col">Pack size (lb)</th><th scope="col">Grams (g)</th><th scope="col">Kilograms (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>1 lb</td><td>453.59 g</td><td>0.4536 kg</td></tr>
          <tr><td>5 lb</td><td>2,267.96 g</td><td>2.2680 kg</td></tr>
          <tr><td>10 lb</td><td>4,535.92 g</td><td>4.5359 kg</td></tr>
        </tbody>
      </table>
    </div>

    <p>Woven and knit fabric is the one common craft material that does not fit this
    chart, because fabric is priced by area (grams per square meter, or ounces per square
    yard) rather than by a flat total weight, so converting it needs the fabric's width in
    addition to a weight figure. Yarn, fiberfill, batting and spinning fiber all convert
    with the single division or multiplication used throughout this page; fabric by the
    yard does not.</p>
  `,
  faqs: [
    {
      q: 'How many grams are in a pound of yarn?',
      a: 'One pound of yarn, or of any other material, is 453.59237 grams, because a pound is defined as exactly that many grams under the international avoirdupois standard. This is a fixed unit conversion and does not change with fiber type, so wool, cotton and acrylic yarn all convert the same way.'
    },
    {
      q: 'How many 50 gram skeins make a pound of yarn?',
      a: 'About 9.07 skeins of 50 gram yarn make a true pound (453.59237 g), from dividing 453.59237 by 50. Some shopping guides round this to "about eight" for a quick estimate, but eight 50 gram skeins is only 400 grams, which is 0.8818 pounds, slightly under a full pound.'
    },
    {
      q: 'Does "yarn weight" mean how much a skein weighs?',
      a: 'No. "Yarn weight" is a thickness category &mdash; lace, fingering, sport, DK, worsted, bulky, super bulky or jumbo &mdash; describing how thick the strand is, not the gram figure on the label. A fingering weight skein and a bulky weight skein can both weigh 100 grams (0.2205 lb); only the label’s printed gram weight converts to pounds.'
    },
    {
      q: 'How many pounds is a 100 gram skein of yarn?',
      a: 'A 100 gram skein is 0.2205 pounds, or 0 pounds 3.53 ounces, from dividing 100 by 453.59237. A 50 gram skein, half that weight, is 0.1102 pounds.'
    },
    {
      q: 'Why doesn’t my wholesale yarn cone weigh exactly what was listed?',
      a: 'Wholesale cones are often listed at a rounded weight, and the actual weighed amount can vary slightly &mdash; some suppliers note this directly and bill from the real weight on the invoice rather than the rounded listing. A cone marketed as "4.5 kg / 10 lb," for example, is actually 9.9208 pounds (4,500 grams divided by 453.59237), not an even 10.'
    },
    {
      q: 'Can I convert a yarn’s gram weight directly into yardage?',
      a: 'No, not with a weight conversion alone. Grams measure mass and yards measure length, and the relationship between them depends on how thick the yarn is, so converting weight to length needs the yardage-per-gram figure printed on that specific skein’s own label, not a general formula.'
    }
  ]
};
