/* Draft: 3D Printer Filament Spool Weight — Net vs Gross, Grams to Pounds
   Every number below is checked against assets/js/convert.js before writing
   (see the terminal output this was built from — Step 2.5 of the pipeline).
   Empty-spool weight ranges are sourced from manufacturer support pages and
   maker forum threads (3D-Fuel, Bambu Lab forum, Prusa forum) rather than
   any single competitor guide; where sources conflicted on a specific brand
   figure, this draft uses the range both sides agree on instead of picking one.
*/

module.exports = {
  slug: '3d-printing-filament-grams-to-pounds',
  title: 'Filament Spool Weight: 1kg in Pounds (Net vs Gross)',
  metaTitle: '1kg Filament Spool Weight in Pounds — Net vs Gross',
  metaDesc: 'A 1kg filament spool is 2.2046 lb of filament, but the spool itself adds 150-260 g. Here is the net weight, the gross shipping weight, and why they differ.',
  category: 'Guide',
  keywords: [
    '1kg filament in pounds',
    'filament spool weight grams',
    '3d printer filament weight lbs',
    'filament net weight vs gross weight'
  ],
  excerpt: 'A 1kg filament spool is 1,000 grams of printable material, or 2.2046 pounds net. The empty spool adds 150 to 260 grams on top, so a full spool weighed on a scale reads higher than the label.',
  dek: 'The label says "1kg" but the scale says more. Here is the exact net weight in pounds, the typical gross weight with the spool included, and how to work out either one for any spool size.',
  datePublished: '2026-09-07',
  featuredImage: {
    eyebrow: 'Guide · 3D Printing',
    stats: ['1000 g filament|2.2046 lb', '+200 g spool|+0.4409 lb', '1200 g total|2.6455 lb']
  },
  featuredImageAlt: 'Chart showing a 1000 gram spool of 3D printer filament equals 2.2046 pounds net, with a typical 200 gram empty spool added for a gross weight near 2.6455 pounds',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'netgross', label: 'Net weight vs. gross weight' },
    { id: 'table', label: 'Filament weight chart' },
    { id: 'spoolweights', label: 'How much the empty spool adds' },
    { id: 'worked', label: 'Weighing a spool to check what is left' },
    { id: 'shipping', label: 'Why this matters for shipping' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g',
    '3D-Fuel, <em>What are the sizes and weights of your spools?</em> &mdash; manufacturer-published spool weights',
    'Bambu Lab community forum, spool weight threads &mdash; user-measured empty spool weights by brand and material'
  ],
  bodyHTML: `
    <p class="lead">A "1kg" filament spool contains 1,000 grams of printable material, which is
    2.2046 pounds net. That figure never changes. What does change is the weight of the empty
    spool itself, which is typically 150 to 260 grams depending on the brand and whether it is
    plastic or cardboard &mdash; so a full spool weighed whole on a kitchen scale reads
    somewhere around 1,150 to 1,260 grams, or roughly 2.54 to 2.78 pounds.</p>

    <h2 id="answer">The quick answer</h2>

    <p>1,000 grams of filament is 2.2046 pounds, and that is the number printed on almost
    every spool label. If you are estimating shipping weight or just want to know what the
    whole package weighs, add the empty spool: a typical mid-weight spool adds about 200 grams
    (0.4409 lb), putting a full 1kg spool at roughly 1,200 grams, or 2.6455 pounds, once the
    spool is included.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">1000 g filament (net)</span>
        <span class="stat-lb">2.2046 lb</span>
        <span class="stat-oz">2 lb 3.27 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">+200 g spool (typical)</span>
        <span class="stat-lb">+0.4409 lb</span>
        <span class="stat-oz">+0 lb 7.05 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">1200 g full spool (gross)</span>
        <span class="stat-lb">2.6455 lb</span>
        <span class="stat-oz">2 lb 10.33 oz</span>
      </article>
    </div>

    <h2 id="netgross">Net weight vs. gross weight, and why filament labels only show one</h2>

    <p>Net weight is the filament alone; gross weight is the filament plus the spool it is
    wound on, and every mainstream filament brand labels its packaging by net weight only.
    That convention exists because net weight is what a maker actually cares about &mdash; it
    is the figure that predicts how many meters of a print a spool can finish &mdash; while the
    spool itself is packaging, not product. The trouble is that "1kg" on the box gets read as
    the weight of the whole thing in hand, and it is not: it is the weight of just the plastic
    filament wound around the spool, not the spool underneath it.</p>

    <p>This only becomes a problem in two situations: estimating the shipping weight of an
    order before it is boxed, and weighing a partly-used spool to work out how much filament is
    left. Both need the gross figure, and neither is printed on the label, so both require
    adding the spool's own weight back in by hand.</p>

    <h2 id="table">Filament weight chart, grams to pounds</h2>

    <p>These are the net weights &mdash; filament only &mdash; for every common spool size sold
    to consumer 3D printers. Use the <a href="../../">grams to lbs converter</a> for any value
    not listed here.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Filament net weight by common spool size, grams to pounds</caption>
        <thead>
          <tr><th scope="col">Spool size</th><th scope="col">Net weight (g)</th><th scope="col">Net weight (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>250 g mini spool</td><td>250 g</td><td>0.5512 lb</td></tr>
          <tr><td>500 g spool</td><td>500 g</td><td>1.1023 lb</td></tr>
          <tr><td>750 g spool</td><td>750 g</td><td>1.6535 lb</td></tr>
          <tr><td>1 kg spool (most common)</td><td>1000 g</td><td>2.2046 lb</td></tr>
          <tr><td>2 kg bulk spool</td><td>2000 g</td><td>4.4092 lb</td></tr>
          <tr><td>5 kg bulk spool</td><td>5000 g</td><td>11.0231 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>These are net figures only, because spool weight varies too much by brand and size to
    put a single gross number next to each row. The next section covers that variation and how
    to work out the gross weight for the size you actually have.</p>

    <h2 id="spoolweights">How much the empty spool adds</h2>

    <p>An empty filament spool typically weighs 150 to 260 grams, and which end of that range
    depends mainly on what the spool is made from. Injection-molded plastic spools, the kind
    most brands reuse across their whole product line, run heavier &mdash; commonly 180 to 260
    grams. Cardboard and pressed-fiber spools, used by some brands specifically to cut shipping
    weight, run lighter &mdash; commonly 120 to 190 grams. A handful of premium plastic spools
    built for durability run past 260 grams, but that is the exception, not the norm.</p>

    <p>In pounds, that range works out to about 0.3307 to 0.5732 lb for the spool alone. Add
    that to the 2.2046 lb of filament on a full 1kg spool and the gross weight lands between
    2.5353 lb (light cardboard spool) and 2.7778 lb (heavy plastic spool), which matches the
    1,150-to-1,260-gram range a full spool actually shows on a kitchen scale. If the exact spool
    weight matters &mdash; for precise shipping calculations, for example &mdash; the only
    reliable number is the one printed on that brand's own spec sheet or spool, since even
    spools from the same manufacturer change weight between product lines.</p>

    <h2 id="worked">Weighing a spool to check how much filament is left</h2>

    <p>To find remaining filament weight, weigh the whole spool and subtract the empty spool's
    own weight; whatever is left over is the filament. This is the standard way makers track
    remaining material on printers that do not have a filament sensor, and it only takes a
    kitchen scale and the empty weight of that specific spool, which is often printed on the
    spool itself or listed on the manufacturer's site.</p>

    <div class="worked">
      Full spool on the scale &rarr; <strong>850 g</strong><br>
      Empty spool weight (this brand) &rarr; <strong>215 g</strong><br>
      850 &minus; 215 = <strong>635 g</strong> of filament remaining<br>
      635 &divide; 453.59237 = <strong>1.3999 lb</strong> remaining (1 lb 6.40 oz)
    </div>

    <p>The same subtraction works at any point in the spool's life: a fresh 1kg spool with a
    200-gram spool weighs 1,200 g gross; halfway through a print job that has used 300 g of
    filament, the same spool weighs 900 g gross, meaning 700 g (1.5432 lb) of filament remains.</p>

    <h2 id="shipping">Why this matters for shipping and postage</h2>

    <p>Shipping weight is always the gross weight, so a single 1kg spool almost never ships at
    exactly 2.2046 pounds. Add the spool (0.33 to 0.57 lb depending on brand) plus any box,
    padding, or vacuum bag, and one spool typically lands closer to 2.6 to 3 pounds once boxed.
    That gap matters most when ordering several spools at once: five spools at a nominal "2.2 lb
    each" is 11.02 lb of filament alone, but the actual box on a carrier's scale, with five
    spools and packaging included, commonly weighs 13 to 15 lb &mdash; enough to cross into a
    higher shipping-rate bracket than the filament weight alone would suggest. Checking a
    retailer's stated package weight before ordering, rather than multiplying the per-spool net
    figure, avoids being surprised by the actual carrier charge.</p>
  `,
  faqs: [
    {
      q: 'How much does an empty 3D printer filament spool weigh?',
      a: 'An empty spool typically weighs 150 to 260 grams (0.33 to 0.57 lb), depending on the material. Cardboard and pressed-fiber spools run lighter, usually 120 to 190 grams, while injection-molded plastic spools run heavier, usually 180 to 260 grams. The exact figure varies by brand, so the manufacturer spec sheet or the weight printed on the spool itself is the most reliable source for any specific product.'
    },
    {
      q: 'How much does a full 1kg spool of filament weigh in pounds?',
      a: 'The filament itself is 2.2046 lb (1,000 g), which is what the label states. Including the empty spool, a full 1kg spool typically weighs 2.54 to 2.78 lb (1,150 to 1,260 g) total, depending on whether the spool is a light cardboard type or a heavier plastic type.'
    },
    {
      q: 'Why does the box only say 1kg instead of the total weight?',
      a: 'Filament is labeled by net weight, meaning the filament alone, because that figure is what determines how much material is actually available to print with. The spool is treated as packaging rather than product, the same way a bag of flour is labeled by the flour\'s weight and not the bag\'s. That convention is consistent across nearly every filament brand, so "1kg" on any spool means 1,000 g of filament plus an unlisted spool weight on top.'
    },
    {
      q: 'Does a 2kg filament spool come on one spool or two?',
      a: 'A 2kg spool is almost always a single, larger spool rather than two separate 1kg spools, wound wider or with a bigger diameter to hold the extra material. Its net weight is 4.4092 lb (2,000 g) of filament. Because the spool itself is also bigger, some printers and spool holders sized for standard 1kg spools cannot fit a 2kg spool without an adapter.'
    },
    {
      q: 'How do I figure out how much filament is left on a spool?',
      a: 'Weigh the whole spool on a kitchen scale, then subtract the empty spool\'s own weight; the remainder is the filament left. For example, a spool that weighs 850 g total, on a spool known to weigh 215 g empty, has 635 g (1.3999 lb) of filament remaining. This is the standard method for printers without a built-in filament sensor, and it works at any point in the spool\'s life, not just when it is nearly empty.'
    },
    {
      q: 'Is filament sold by weight or by length?',
      a: 'Filament is sold and labeled by weight in grams or kilograms, such as "1kg" or "500 g," not by length. Length varies with material density and filament diameter even at the same weight, so two 1kg spools of different materials (like PLA versus PETG) contain different total lengths despite having identical net weight.'
    }
  ]
};
