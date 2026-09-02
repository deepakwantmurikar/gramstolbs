/* Draft: Drone Weight in Grams to Pounds (FAA 250g registration threshold)
   Backlog id: drone-weight-grams-to-pounds
   Every number below is taken straight from assets/js/convert.js, re-derived
   independently at write time — see the terminal output this was built from
   (node -e against convert.js, 2026-09-02).
*/

module.exports = {
  slug: 'drone-weight-grams-to-pounds',
  title: 'Drone Weight: 250 Grams to Pounds for FAA Registration',
  metaTitle: 'Drone Weight Grams to Pounds — FAA 250g Rule Explained',
  metaDesc: 'A 250 gram drone equals 0.5512 pounds, the FAA registration threshold. See exact grams-to-pounds figures for US, UK, Canada and Australia drone rules.',
  category: 'Guide',
  keywords: [
    'drone weight grams to pounds',
    '250 gram drone rule',
    'FAA drone weight limit lbs',
    'drone registration weight limit'
  ],
  excerpt: 'The FAA draws its drone registration line at 250 grams, which is 0.5512 pounds. Here is that figure and the UK, Canada and Australia thresholds, all converted and sourced.',
  dek: 'The FAA requires registration at 250 grams (0.5512 pounds) and up. The UK, Canada and Australia set their own thresholds — this page converts each one and cites the source.',
  datePublished: '2026-09-02',
  featuredImage: {
    eyebrow: 'Guide · Drone Weight Rules',
    stats: ['250 g|0.5512 lb', '100 g|0.2205 lb', '25 kg|55.1156 lb']
  },
  featuredImageAlt: 'Drone weight conversion chart showing 250 grams equals 0.5512 pounds, the FAA registration threshold, alongside the UK 100 gram threshold',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'table', label: 'Drone weight chart' },
    { id: 'included', label: 'What counts toward the weight' },
    { id: 'countries', label: 'US vs UK vs Canada vs Australia' },
    { id: 'examples', label: 'Real drone weights' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'Federal Aviation Administration, <a href="https://www.faa.gov/uas/getting_started/register_drone" target="_blank" rel="noopener">How to Register Your Drone</a> &mdash; 250 g / 0.55 lb registration threshold',
    '14 CFR &sect; 48.15, Code of Federal Regulations &mdash; defines the 0.55 lb (250 g) lower weight bound for the FAA small unmanned aircraft registration rule',
    'UK Civil Aviation Authority, <a href="https://www.caa.co.uk/media/csmfqbs1/the-drone-code-march-2026.pdf" target="_blank" rel="noopener">The Drone Code</a> &mdash; 100 g Flyer ID threshold in effect from 1 January 2026',
    'Transport Canada, Drone Safety guidance &mdash; 250 g to 25 kg registration and pilot certificate band',
    'Civil Aviation Safety Authority (CASA) Australia, drone rules guidance &mdash; commercial registration required regardless of weight; recreational registration currently paused'
  ],
  bodyHTML: `
    <p class="lead">A 250 gram drone weighs 0.5512 pounds, or 8.82 ounces &mdash; the exact
    figure the US Federal Aviation Administration uses as its registration threshold. This
    page converts that figure and the other weight thresholds that US, UK, Canadian and
    Australian regulators use, so a spec sheet listed in grams can be checked against a
    rule written in pounds.</p>

    <h2 id="answer">The quick answer</h2>

    <p>250 grams equals 0.5512 pounds (8.82 ounces), and that is the weight at which the
    FAA requires most drones to be registered before their first flight. The regulation
    itself, 14 CFR &sect; 48.15, states the line as 0.55 lb, which converts to 249.48
    grams &mdash; in practice, manufacturers and pilots treat 250 g as the round-number
    threshold, and a drone at exactly 250 g is already at or past it.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">100 g</span>
        <span class="stat-lb">0.2205 lb</span>
        <span class="stat-oz">0 lb 3.53 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">249 g</span>
        <span class="stat-lb">0.5490 lb</span>
        <span class="stat-oz">0 lb 8.78 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">250 g</span>
        <span class="stat-lb">0.5512 lb</span>
        <span class="stat-oz">0 lb 8.82 oz</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">25,000 g</span>
        <span class="stat-lb">55.1156 lb</span>
        <span class="stat-oz">55 lb 1.85 oz</span>
      </article>
    </div>

    <h2 id="table">Drone weight chart: grams to pounds</h2>

    <p>The table below covers the weight range most consumer and prosumer drones fall
    into, from ultralight sub-250 g models to heavier camera drones. Each row is
    calculated from the exact conversion factor of 453.59237 grams per pound.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Common drone weights converted from grams to pounds and ounces</caption>
        <thead>
          <tr><th scope="col">Grams (g)</th><th scope="col">Pounds (lb)</th><th scope="col">Pounds &amp; ounces</th></tr>
        </thead>
        <tbody>
          <tr><td>100 g</td><td>0.2205 lb</td><td>0 lb 3.53 oz</td></tr>
          <tr><td>200 g</td><td>0.4409 lb</td><td>0 lb 7.05 oz</td></tr>
          <tr><td>249 g</td><td>0.5490 lb</td><td>0 lb 8.78 oz</td></tr>
          <tr><td>250 g</td><td>0.5512 lb</td><td>0 lb 8.82 oz</td></tr>
          <tr><td>300 g</td><td>0.6614 lb</td><td>0 lb 10.58 oz</td></tr>
          <tr><td>500 g</td><td>1.1023 lb</td><td>1 lb 1.64 oz</td></tr>
          <tr><td>900 g</td><td>1.9842 lb</td><td>1 lb 15.75 oz</td></tr>
          <tr><td>1,200 g</td><td>2.6455 lb</td><td>2 lb 10.33 oz</td></tr>
          <tr><td>2,000 g</td><td>4.4092 lb</td><td>4 lb 6.55 oz</td></tr>
          <tr><td>5,000 g</td><td>11.0231 lb</td><td>11 lb 0.37 oz</td></tr>
          <tr><td>20,000 g</td><td>44.0925 lb</td><td>44 lb 1.48 oz</td></tr>
          <tr><td>25,000 g</td><td>55.1156 lb</td><td>55 lb 1.85 oz</td></tr>
        </tbody>
      </table>
    </div>

    <p>For any drone weight not listed here, the <a href="../../">grams to lbs
    converter</a> gives an exact figure at 2, 4 or 6 decimal places.</p>

    <h2 id="included">What counts toward a drone's registration weight</h2>

    <p>A drone's registration weight is its complete ready-to-fly weight, including the
    battery, propellers, and any attached accessories such as a camera, gimbal guard, or
    landing light. The FAA states this explicitly: the comparison is against the aircraft
    as it will actually fly, not the bare airframe weight printed on a box. This matters
    because a drone advertised as "sub-250 g" using its standard battery can cross the
    threshold the moment a heavier optional battery, propeller guard, or strobe light is
    attached.</p>

    <div class="worked">
      Standard battery: 242 g airframe + battery &rarr; <strong>under 250 g</strong><br>
      + propeller guards (14 g) &rarr; 256 g &rarr; <strong>over 250 g</strong><br>
      256 &divide; 453.59237 = <strong>0.5644</strong> lb (9.03 oz)<br>
      result &rarr; now above the FAA registration threshold
    </div>

    <h2 id="countries">US, UK, Canada and Australia thresholds compared</h2>

    <p>The United States, Canada, and (until recently) the UK all used 250 grams as
    their drone registration line, but the UK lowered its threshold to 100 grams
    effective 1 January 2026 &mdash; the figures are not interchangeable across
    borders, and a drone legal to fly unregistered in one country can require
    registration in another.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Drone weight thresholds by country, converted to pounds</caption>
        <thead>
          <tr><th scope="col">Country / regulator</th><th scope="col">Threshold</th><th scope="col">In pounds</th></tr>
        </thead>
        <tbody>
          <tr><td>United States (FAA)</td><td>250 g (0.55 lb)</td><td>0.5512 lb</td></tr>
          <tr><td>United Kingdom (CAA)</td><td>100 g, effective 1 Jan 2026</td><td>0.2205 lb</td></tr>
          <tr><td>Canada (Transport Canada)</td><td>250 g to 25 kg registration band</td><td>0.5512 lb to 55.1156 lb</td></tr>
          <tr><td>Australia (CASA)</td><td>250 g (commercial registration applies at any weight)</td><td>0.5512 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>In the United States, a drone under 250 g flown purely for recreation is exempt
    from FAA registration, though airspace restrictions and state laws still apply
    regardless of weight. In the United Kingdom, the Civil Aviation Authority now
    requires a Flyer ID for any drone at or above 100 g, and an Operator ID as well if
    that drone carries a camera. In Canada, Transport Canada requires both registration
    and a drone pilot certificate for any drone between 250 g and 25 kg. In Australia,
    the Civil Aviation Safety Authority currently does not require recreational drone
    registration at any weight, but commercial operation requires CASA registration
    regardless of the drone's weight. None of this is legal advice; each regulator's own
    published guidance, linked in the sources below, is the current authority on its
    own rules.</p>

    <h2 id="examples">Real drone weights near the threshold</h2>

    <p>Several popular consumer drones are built specifically to land just under 250 g,
    illustrating how close to the line a real product can sit. A drone listed at 249 g
    converts to 0.5490 pounds (8.78 ounces), just under the FAA's 0.55 lb line, while the
    same airframe with a heavier optional battery attached can weigh 267 g, which
    converts to 0.5886 pounds (9.42 ounces) and crosses the threshold. The lesson for
    reading any drone's spec sheet is the same one covered above: check the
    "with battery" or "ready to fly" weight, not the lightest configuration listed, and
    convert that number rather than the marketing headline.</p>

    <div class="worked">
      267 &divide; 453.59237 = <strong>0.5886</strong> lb<br>
      whole pounds &rarr; <strong>0 lb</strong><br>
      0.5886 &times; 16 = <strong>9.42</strong> oz<br>
      result &rarr; <strong>0 lb 9.42 oz</strong>, over the 0.55 lb / 250 g line
    </div>
  `,
  faqs: [
    {
      q: 'Do I need to register a drone that weighs under 250 grams?',
      a: 'In the United States, no, if the drone is flown purely for recreation: the FAA exempts recreational drones under 250 grams (0.55 lb) from registration under the Exception for Limited Recreational Operations. Flying the same drone commercially removes that exemption, and registration is required regardless of weight. Airspace rules and Remote ID requirements can still apply to a sub-250 g drone even without registration.'
    },
    {
      q: 'How many pounds is the FAA’s 250 gram drone limit?',
      a: '250 grams converts to 0.5512 pounds, or 8.82 ounces. The regulation itself, 14 CFR § 48.15, is written as 0.55 lb, which is technically 249.48 grams — in practice, 250 grams is the round number used across the industry as the threshold.'
    },
    {
      q: 'What weight does the FAA actually measure for drone registration?',
      a: 'The FAA measures the drone’s complete ready-to-fly weight, including the battery, propellers, and any attached accessories like a camera or propeller guard. A drone marketed as under 250 grams with its lightest battery can exceed that weight once a heavier optional battery or accessory is attached, at which point registration becomes required.'
    },
    {
      q: 'Is the UK drone weight threshold the same as the US?',
      a: 'No. The US FAA threshold is 250 grams (0.5512 pounds), but the UK Civil Aviation Authority lowered its threshold to 100 grams (0.2205 pounds), effective 1 January 2026. A drone that needs no registration in the US can require a UK Flyer ID, and an Operator ID as well if it has a camera.'
    },
    {
      q: 'Does Canada use the same 250 gram threshold as the US?',
      a: 'Canada uses the same lower bound: Transport Canada requires registration and a drone pilot certificate for any drone weighing between 250 grams (0.5512 pounds) and 25 kilograms (55.1156 pounds). Below 250 grams, Transport Canada does not require registration or a pilot certificate.'
    },
    {
      q: 'What happens if my drone weighs slightly over 250 grams?',
      a: 'Crossing 250 grams (0.5512 pounds) in the US moves a recreational drone out of the sub-250 g exemption, meaning it must be registered with the FAA before its next flight, marked with the registration number, and in most cases broadcast Remote ID. The same crossing has similar effects in Canada and the UK, though each country’s specific requirements differ, as covered above.'
    }
  ]
};
