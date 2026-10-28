/* Draft: Diamond Carats to Grams to Pounds
   Topic: content/topic-backlog.json id "diamond-carats-grams-to-pounds".
   Every carat->gram figure uses the exact metric definition (1 ct = 0.2 g,
   standardized 1907). Every gram->pound figure is computed with
   assets/js/convert.js's gramsToPounds() — see the terminal pass this was
   built from (node -e against convert.js, carats * 0.2 fed in as grams).
   Scope: unit conversion only. No jewelry valuation or investment advice,
   per this topic's cautions field.
*/

module.exports = {
  slug: 'diamond-carats-grams-to-pounds',
  title: 'Diamond Carats to Grams to Pounds (and Why They Differ)',
  metaTitle: 'Diamond Carats to Grams to Pounds Converter & Chart',
  metaDesc: 'A carat is exactly 0.2 grams, so 1 carat is 0.0004 pounds. Convert any diamond or gemstone carat weight to grams and pounds, with a full chart.',
  category: 'Guide',
  keywords: [
    'carat to grams to pounds',
    'how many carats in a pound',
    'diamond weight in pounds',
    'carat weight conversion chart'
  ],
  excerpt: 'A carat is defined as exactly 0.2 grams, which makes it 0.0004 pounds. Here is the full carat-to-gram-to-pound chart, plus what a pound of diamonds would actually mean.',
  dek: 'Carats are not grams and were never meant to be a shortcut for them. Here is the exact relationship, a full chart, and what carats look like once converted to pounds.',
  datePublished: '2026-09-09',
  featuredImage: {
    eyebrow: 'Guide · Carats & Gemstones',
    stats: ['1 ct|0.2 g', '5 ct|1 g', '1 lb|2,267.96 ct']
  },
  featuredImageAlt: 'Diamond carat weight conversion chart showing 1 carat equals 0.2 grams and 1 pound equals 2,267.96 carats',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'what-is-a-carat', label: 'What a carat actually is' },
    { id: 'chart', label: 'Carats to grams to pounds chart' },
    { id: 'pound', label: 'How many carats in a pound' },
    { id: 'famous', label: 'Famous diamonds, in pounds' },
    { id: 'points', label: 'Carats and points' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'International Bureau of Weights and Measures (BIPM), 4th General Conference on Weights and Measures, 1907 &mdash; adopted the metric carat of 200 mg',
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g',
    'Smithsonian Institution, National Museum of Natural History &mdash; Hope Diamond weight (45.52 ct), measured 1974',
    'Royal Collection Trust &mdash; Cullinan Diamond rough weight (3,106.75 ct)'
  ],
  bodyHTML: `
    <p class="lead">One carat is exactly 0.2 grams, and 0.2 grams is 0.0004 pounds. Carats
    convert to grams by a fixed, exact definition rather than an approximation, so a 1 carat
    diamond and a 0.2 gram weight are the same physical mass by law, not by coincidence. From
    there, converting to pounds works exactly like any other gram figure: divide by 453.59237.</p>

    <h2 id="answer">The quick answer</h2>

    <p>1 carat equals 0.2 grams, which equals 0.0004 pounds. Multiply any carat figure by 0.2 to
    get grams, then divide that result by 453.59237 to get pounds. A 1 carat diamond, a 5 carat
    sapphire and a 500 carat rough stone all convert the same way &mdash; only the number of
    carats changes, never the 0.2 gram factor itself.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">0.5 ct</span>
        <span class="stat-lb">0.1000 g</span>
        <span class="stat-oz">0.0002 lb</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">1 ct</span>
        <span class="stat-lb">0.2000 g</span>
        <span class="stat-oz">0.0004 lb</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">2 ct</span>
        <span class="stat-lb">0.4000 g</span>
        <span class="stat-oz">0.0009 lb</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">5 ct</span>
        <span class="stat-lb">1.0000 g</span>
        <span class="stat-oz">0.0022 lb</span>
      </article>
    </div>

    <h2 id="what-is-a-carat">What a carat actually is</h2>

    <p>A carat is a fixed unit of mass equal to exactly 200 milligrams, defined that way by
    international agreement since 1907. Before that date, at least 23 different local
    definitions of the carat were in use around the world, ranging from about 187 mg to 216 mg,
    which meant the same stated carat weight could mean a physically different stone depending
    on which country's scale it was weighed on. In 1907 the 4th General Conference on Weights
    and Measures fixed the metric carat at 200 mg exactly, tying it directly to the gram rather
    than to a local custom, and that single definition is the one still used everywhere gemstones
    are traded today.</p>

    <p>The word itself is older than the metric definition and comes from the carob seed, which
    traders once used as a small, reasonably consistent counterweight on a balance scale. That
    origin is historical rather than functional now &mdash; a modern carat has nothing to do with
    an actual seed's mass, it is simply 200 mg, full stop. It is also worth separating from
    "karat" with a k, which measures gold purity out of 24 parts and shares no numeric
    relationship with the gemstone carat at all; the two words sound identical but answer
    completely different questions.</p>

    <h2 id="chart">Carats to grams to pounds chart</h2>

    <p>The table below covers the range from a small accent stone to a museum-scale rough
    diamond. Every gram figure is the carat count multiplied by 0.2 exactly; every pound figure
    is that gram figure divided by 453.59237, the exact size of an international avoirdupois
    pound.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Carats converted to grams and pounds</caption>
        <thead>
          <tr><th scope="col">Carats (ct)</th><th scope="col">Grams (g)</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>0.25 ct</td><td>0.0500 g</td><td>0.0001 lb</td></tr>
          <tr><td>0.5 ct</td><td>0.1000 g</td><td>0.0002 lb</td></tr>
          <tr><td>0.75 ct</td><td>0.1500 g</td><td>0.0003 lb</td></tr>
          <tr><td>1 ct</td><td>0.2000 g</td><td>0.0004 lb</td></tr>
          <tr><td>1.5 ct</td><td>0.3000 g</td><td>0.0007 lb</td></tr>
          <tr><td>2 ct</td><td>0.4000 g</td><td>0.0009 lb</td></tr>
          <tr><td>3 ct</td><td>0.6000 g</td><td>0.0013 lb</td></tr>
          <tr><td>5 ct</td><td>1.0000 g</td><td>0.0022 lb</td></tr>
          <tr><td>10 ct</td><td>2.0000 g</td><td>0.0044 lb</td></tr>
          <tr><td>20 ct</td><td>4.0000 g</td><td>0.0088 lb</td></tr>
          <tr><td>50 ct</td><td>10.0000 g</td><td>0.0220 lb</td></tr>
          <tr><td>100 ct</td><td>20.0000 g</td><td>0.0441 lb</td></tr>
          <tr><td>500 ct</td><td>100.0000 g</td><td>0.2205 lb</td></tr>
          <tr><td>1000 ct</td><td>200.0000 g</td><td>0.4409 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>For a value not listed here, the formula is short enough to do by hand: multiply carats
    by 0.2 for grams, then divide by 453.59237 for pounds. The <a href="../../">grams to lbs
    converter</a> handles the second step for any number directly, once the carat figure has
    been turned into grams.</p>

    <h2 id="pound">How many carats are in a pound</h2>

    <p>One pound is 2,267.96 carats. That comes from the same relationship run in reverse: a
    pound is 453.59237 grams exactly, and each carat is 0.2 grams, so dividing 453.59237 by 0.2
    gives 2,267.96185 carats to a pound. In practical terms, no cut diamond ever approaches a
    pound &mdash; even the largest rough diamond ever found, covered below, is a small fraction
    of that.</p>

    <div class="worked">
      1 lb &divide; 0.2 g per ct = <strong>2,267.96</strong> ct<br>
      check: 2,267.96 &times; 0.2 = <strong>453.592</strong> g &asymp; 453.59237 g (rounding only)
    </div>

    <p>This figure matters mainly as a sense of scale rather than a practical conversion, since
    gemstones are essentially never weighed in pounds in trade &mdash; carats, and for larger
    parcels sometimes grams, are what invoices and grading reports actually use. A pound of loose
    diamonds is a useful mental benchmark for just how light a single carat is, not a real-world
    unit anyone asks for at a counter.</p>

    <h2 id="famous">Famous diamonds, converted to pounds</h2>

    <p>Even the largest diamonds ever found weigh a small fraction of a pound once their carat
    figure is converted. The Cullinan Diamond, the largest gem-quality rough diamond ever
    recovered, weighed 3,106.75 carats before cutting &mdash; 621.35 grams, or 1.3698 pounds,
    still under a pound and a half. The Hope Diamond, one of the most famous cut stones in the
    world, is 45.52 carats: 9.104 grams, or 0.0201 pounds, roughly two hundredths of a pound.</p>

    <div class="card-grid">
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z"/><path d="M9 12l2 2 4-4"/></svg></span>
        <h3>Cullinan Diamond (rough)</h3>
        <p>3,106.75 carats &mdash; 621.35 grams, or 1.3698 pounds. Discovered in South Africa in
        1905, later cut into the Cullinan I and II now in the British Crown Jewels.</p>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
        <h3>Hope Diamond</h3>
        <p>45.52 carats &mdash; 9.104 grams, or 0.0201 pounds. Held at the Smithsonian National
        Museum of Natural History, weighed on its current setting-free figure since 1974.</p>
      </article>
      <article class="card feature-card">
        <span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="2"/></svg></span>
        <h3>Excelsior Diamond (rough)</h3>
        <p>995.2 carats &mdash; 199.04 grams, or 0.4388 pounds. Found at the Jagersfontein Mine
        in South Africa in 1893, at the time the largest rough diamond on record.</p>
      </article>
    </div>

    <p>None of these, even added together, would come close to a full pound of diamond by
    weight. The Cullinan alone accounts for most of the combined total above, and it is still
    under a pound and a half.</p>

    <h2 id="points">Carats and points</h2>

    <p>A point is one hundredth of a carat, so 100 points always equal 1 carat, and a "75-point"
    diamond is jeweler's shorthand for a 0.75 carat stone. Points exist because small stones are
    often sold or graded in increments smaller than a whole carat, and "75 points" reads more
    precisely on an invoice than "0.75 carats" while meaning the exact same weight.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Points converted to carats and grams</caption>
        <thead>
          <tr><th scope="col">Points</th><th scope="col">Carats (ct)</th><th scope="col">Grams (g)</th></tr>
        </thead>
        <tbody>
          <tr><td>10 pts</td><td>0.10 ct</td><td>0.0200 g</td></tr>
          <tr><td>25 pts</td><td>0.25 ct</td><td>0.0500 g</td></tr>
          <tr><td>50 pts</td><td>0.50 ct</td><td>0.1000 g</td></tr>
          <tr><td>75 pts</td><td>0.75 ct</td><td>0.1500 g</td></tr>
        </tbody>
      </table>
    </div>

    <p>Converting points to grams is a two-step version of the same carat formula: divide points
    by 100 to get carats, then multiply by 0.2 to get grams. A 25-point stone, for example, is
    0.25 carats, which is 0.05 grams &mdash; the same weight whether it is labeled "0.25 ct" or
    "25 pts" on a certificate.</p>

    <p>The distinction from a gram, and from precious metal weight, is worth keeping straight.
    Gold and other bullion are typically priced in troy ounces of 31.1034768 grams each, a
    completely different system from the metric carat used for gemstones &mdash; see the
    <a href="../../guides/gold-grams-to-pounds-troy/">gold to pounds and troy ounces guide</a>
    for that conversion. A carat and a troy ounce measure the same kind of thing, mass, but by
    unrelated scales, and mixing them up produces a nonsense figure rather than just a rounding
    error.</p>
  `,
  faqs: [
    {
      q: 'What does carat weight actually mean on a diamond?',
      a: 'Carat weight is a measure of mass, not size or visual dimension: it describes how much a diamond weighs, exactly 0.2 grams per carat, regardless of how the stone is cut or how large it looks face-up. Two diamonds of the same carat weight can look different sizes depending on their cut and proportions, because carat weight is measuring mass, not diameter.'
    },
    {
      q: 'How many carats should a diamond be for an engagement ring?',
      a: 'There is no fixed rule, but commonly cited figures put the average engagement ring stone between roughly 1 and 1.9 carats, which in weight terms is 0.2 to 0.38 grams, or about 0.0004 to 0.0008 pounds. That average is a market pattern, not a requirement; carat weight is a unit conversion question, and choosing a size is a separate personal decision this page does not weigh in on.'
    },
    {
      q: 'Is a half carat diamond too small?',
      a: 'In weight terms, a half carat diamond is 0.1 grams, or 0.0002 pounds, below the commonly cited engagement-ring average but a completely standard, widely sold size on its own. "Too small" is a matter of personal preference and how a stone is cut rather than anything the weight figure itself determines.'
    },
    {
      q: 'What carat weight is typical for diamond stud earrings?',
      a: 'Diamond studs are commonly sold in the 0.25 to 1 carat range per ear, which converts to 0.05-0.2 grams, or roughly 0.0001-0.0004 pounds, per stone. As with ring stones, that range reflects common buying patterns rather than a technical requirement.'
    },
    {
      q: 'How many carats are in a pound?',
      a: 'One pound is 2,267.96 carats, found by dividing 453.59237 grams (an exact pound) by 0.2 grams (an exact carat). It is a useful benchmark for scale rather than a practical unit: gemstones are carat-denominated in trade, and pounds essentially never appear on a diamond invoice or grading report.'
    },
    {
      q: 'Why are diamonds measured in carats instead of grams?',
      a: 'Diamonds are measured in carats because the unit was standardized specifically for gemstone trading in 1907, fixed at exactly 0.2 grams, and the entire global grading, invoicing and certification system built around that figure since then has no practical reason to switch. A carat is not a competing unit to the gram so much as a fixed multiple of it, so any carat figure converts to grams by simply multiplying by 0.2 &mdash; there is no ambiguity to resolve, unlike the troy-versus-avoirdupois ounce confusion in precious metals.'
    }
  ]
};
