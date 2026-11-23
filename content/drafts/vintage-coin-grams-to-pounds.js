/* Draft: Bullion and Vintage Coin Weight Standards — Grams to Pounds
   Backlog id: vintage-coin-grams-to-pounds
   Angle: specific minted coin weight standards (American Gold Eagle,
   Krugerrand, British Sovereign, vintage pre-1933 US gold coins, etc.)
   converted from their official gram/troy-ounce specification to pounds —
   collectors look these up by coin name, a different search pattern from
   the existing gold/silver-platinum guides, which cover generic bar and
   coin *sizes* rather than named mint specifications.
   Caution from the backlog entry: state only the physical weight standard
   of each coin as minted — no pricing, grading, or investment claims. This
   draft contains no spot prices, no grading terms (MS/AU/VF etc. used only
   once, neutrally, to name a coin series), and no buy/sell framing.
   Duplicate check: content/articles.json has no article naming a specific
   minted coin (American Eagle, Krugerrand, Sovereign, double eagle, etc.);
   the closest is silver-platinum-grams-to-pounds, which covers generic
   bar/coin troy-ounce sizes, not named coin specifications. No other open
   topic-backlog.json entry overlaps.
   Every number below is taken from assets/js/convert.js, re-derived at the
   terminal before writing (see the self-verification note in the write-
   article skill) — not estimated.
*/

module.exports = {
  slug: 'vintage-coin-grams-to-pounds',
  title: 'Bullion & Vintage Coin Weight Standards: Grams to Pounds',
  metaTitle: 'Coin Weight in Pounds: Gold Eagle, Sovereign & More',
  metaDesc: 'Official gram and troy-ounce weight standards for bullion coins, converted to pounds — American Eagle, Krugerrand, Sovereign, double eagle and more.',
  category: 'Guide',
  keywords: [
    'gold coin weight grams to pounds',
    'silver eagle weight in pounds',
    'bullion coin weight conversion',
    'how much does a gold sovereign weigh',
    'double eagle coin weight grams'
  ],
  excerpt: 'The official minted weight of major bullion and vintage coins — American Eagle, Krugerrand, Sovereign, double eagle and more — converted from grams and troy ounces to pounds.',
  dek: 'Mints specify a coin’s weight in grams or troy ounces, not pounds. Here is the official minted weight standard for the most commonly looked-up bullion and vintage coins, converted to pounds.',
  datePublished: '2026-11-23',
  featuredImage: {
    eyebrow: 'Guide · Coin Weights',
    stats: ['1 oz Gold Eagle|33.931 g = 0.0748 lb', 'Gold Sovereign|7.98805 g = 0.0176 lb', '10-coin tube|339.31 g = 0.7481 lb']
  },
  featuredImageAlt: 'Bullion coin weight conversion chart showing a 1 ounce American Gold Eagle at 33.931 grams equals 0.0748 pounds and a British gold sovereign at 7.98805 grams equals 0.0176 pounds',
  toc: [
    { id: 'answer', label: 'The quick answer' },
    { id: 'gold-coins', label: 'Gold bullion coin weights' },
    { id: 'silver-coins', label: 'Silver bullion coin weights' },
    { id: 'vintage-gold', label: 'Vintage US gold coins' },
    { id: 'sovereign', label: 'The British sovereign' },
    { id: 'worked', label: 'Converting a tube or box of coins' },
    { id: 'tolerance', label: 'Minting tolerance' },
    { id: 'faq', label: 'FAQ' }
  ],
  sources: [
    'US Mint, American Eagle Gold &amp; Silver Bullion Coin specifications &mdash; 31 U.S.C. &sect; 5112(a)(7)&ndash;(9) and &sect; 5112(e)',
    'Royal Mint, Sovereign weight and purity specification &mdash; 22 carat (.9167 fine), 7.98805 g standard',
    'NIST Handbook 44, Appendix C &mdash; defines the troy ounce as exactly 31.1034768 g',
    'International Yard and Pound Agreement, 1959 &mdash; defines the international avoirdupois pound as exactly 453.59237 g'
  ],
  bodyHTML: `
    <p class="lead">Mints publish a coin's weight in grams or troy ounces, never in pounds,
    because that is the unit the minting law and the specification sheet are written in.
    Converting one of those official figures to pounds takes one division by 453.59237, the
    exact number of grams in an avoirdupois pound &mdash; the charts below apply that to the
    named bullion and vintage coins collectors look up most, using each mint's own stated
    gross weight rather than a dealer's rounded figure.</p>

    <h2 id="answer">The quick answer</h2>

    <p>A single one-ounce bullion coin weighs well under a tenth of a pound: a 33.931 gram
    American Gold Eagle is 0.0748 pounds, and a 31.103 gram American Silver Eagle is 0.0686
    pounds. A British gold sovereign, which was never struck to a full troy ounce standard,
    is lighter still at 7.98805 grams, or 0.0176 pounds. The figures below come from each
    coin's official minted weight, converted through grams to avoirdupois pounds.</p>

    <div class="card-grid">
      <article class="card stat-card">
        <span class="stat-g">American Gold Eagle (1 oz)</span>
        <span class="stat-lb">33.931 g</span>
        <span class="stat-oz">0.0748 lb</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">American Silver Eagle (1 oz)</span>
        <span class="stat-lb">31.103 g</span>
        <span class="stat-oz">0.0686 lb</span>
      </article>
      <article class="card stat-card">
        <span class="stat-g">British gold sovereign</span>
        <span class="stat-lb">7.98805 g</span>
        <span class="stat-oz">0.0176 lb</span>
      </article>
    </div>

    <h2 id="gold-coins">Modern gold bullion coin weights in pounds</h2>

    <p>A one-ounce American Gold Eagle weighs 33.931 grams as minted, which is 0.0748
    pounds, because the US Mint alloys the coin with silver and copper to reach a full troy
    ounce of pure gold inside a heavier, more durable coin. That same gross-versus-pure
    distinction applies across every 22-karat gold bullion coin below; coins struck in
    .9999 fine gold, like the Canadian Maple Leaf, carry almost no alloy, so their gross
    weight sits much closer to one troy ounce of metal.</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Official minted weight of common one-ounce gold bullion coins</caption>
        <thead>
          <tr><th scope="col">Coin</th><th scope="col">Fineness</th><th scope="col">Gross weight (g)</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>American Gold Eagle</td><td>.9167 (22k)</td><td>33.931 g</td><td>0.0748 lb</td></tr>
          <tr><td>Krugerrand</td><td>.9167 (22k)</td><td>33.93 g</td><td>0.0748 lb</td></tr>
          <tr><td>Canadian Gold Maple Leaf</td><td>.9999</td><td>31.103 g</td><td>0.0686 lb</td></tr>
          <tr><td>Austrian Gold Philharmonic</td><td>.9999</td><td>31.103 g</td><td>0.0686 lb</td></tr>
          <tr><td>Gold Britannia (2013&ndash;present)</td><td>.9999</td><td>31.10 g</td><td>0.0686 lb</td></tr>
          <tr><td>Chinese Gold Panda</td><td>.999</td><td>30 g</td><td>0.0661 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>Notice the Gold Panda is the outlier: since 2016, the China Gold Coin Corporation has
    struck the Panda to a flat 30 grams rather than a troy ounce, so it weighs 0.0661
    pounds, slightly less than the troy-ounce coins above. Everything else in the table is
    specified to one troy ounce of metal (31.1034768 g) and then adjusted upward for alloy
    where the coin isn't struck in nearly pure gold.</p>

    <h2 id="silver-coins">Modern silver bullion coin weights in pounds</h2>

    <p>A one-ounce American Silver Eagle weighs 31.103 grams, or 0.0686 pounds, the same
    troy-ounce-to-gram figure used for any coin struck to a nearly pure one-troy-ounce
    standard. The US Mint's own statute (31 U.S.C. &sect; 5112(e)) sets the Silver Eagle at
    31.103 grams of .999 fine silver, and the Royal Canadian Mint specifies its Silver Maple
    Leaf the same way, at .9999 fine:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Official minted weight of common one-ounce silver bullion coins</caption>
        <thead>
          <tr><th scope="col">Coin</th><th scope="col">Fineness</th><th scope="col">Gross weight (g)</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>American Silver Eagle</td><td>.999</td><td>31.103 g</td><td>0.0686 lb</td></tr>
          <tr><td>Canadian Silver Maple Leaf</td><td>.9999</td><td>31.103 g</td><td>0.0686 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>Because silver coins are struck close to pure metal, their gross weight and their
    troy-ounce content are nearly identical &mdash; unlike the 22-karat gold coins above,
    where the gross weight is noticeably heavier than the metal content alone.</p>

    <h2 id="vintage-gold">Vintage pre-1933 US gold coin weights in pounds</h2>

    <p>A $20 Saint-Gaudens or Liberty Head double eagle, minted before the US left the gold
    coin standard in 1933, weighs 33.436 grams as struck, which is 0.0737 pounds. These
    vintage denominations were minted in .900 fine gold (90% gold, 10% copper), a different
    alloy ratio from any modern bullion coin above, and each denomination has its own fixed
    gross weight set by the Coinage Act specifications of the era:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>Official minted weight of vintage pre-1933 US gold coins, .900 fine</caption>
        <thead>
          <tr><th scope="col">Denomination</th><th scope="col">Gross weight (g)</th><th scope="col">Troy oz</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>$20 double eagle (Liberty Head / Saint-Gaudens)</td><td>33.436 g</td><td>1.075 troy oz</td><td>0.0737 lb</td></tr>
          <tr><td>$10 eagle (Liberty Head / Indian Head)</td><td>16.718 g</td><td>0.5375 troy oz</td><td>0.0369 lb</td></tr>
          <tr><td>$5 half eagle (Liberty Head / Indian Head)</td><td>8.359 g</td><td>0.2687 troy oz</td><td>0.0184 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>Each vintage denomination's gross weight scales linearly with its face value: the
    $10 eagle weighs exactly half of the $20 double eagle, and the $5 half eagle weighs
    exactly a quarter of it, because all three were struck to the same .900 fine standard
    from the same era's Coinage Act specifications.</p>

    <h2 id="sovereign">The British gold sovereign's weight in pounds</h2>

    <p>A British gold sovereign weighs 7.98805 grams as minted, which is 0.0176 pounds, far
    lighter than any one-troy-ounce bullion coin because the sovereign was never struck to a
    troy ounce standard in the first place. The Royal Mint has held this weight, along with
    a 22-carat (.9167) fineness, as the sovereign's standard specification since 1817, and
    it hasn't changed for the modern sovereign since.</p>

    <p>The Royal Mint also strikes the sovereign in smaller and larger fractional sizes,
    each scaled proportionally from the same 7.98805 gram standard:</p>

    <div class="table-scroll breakout">
      <table>
        <caption>British sovereign and its fractional/multiple sizes, converted to pounds</caption>
        <thead>
          <tr><th scope="col">Denomination</th><th scope="col">Gross weight (g)</th><th scope="col">Pounds (lb)</th></tr>
        </thead>
        <tbody>
          <tr><td>Half sovereign</td><td>3.994 g</td><td>0.0088 lb</td></tr>
          <tr><td>Sovereign</td><td>7.98805 g</td><td>0.0176 lb</td></tr>
          <tr><td>Double sovereign</td><td>15.9761 g</td><td>0.0352 lb</td></tr>
          <tr><td>Quintuple sovereign ("five pounds")</td><td>39.9403 g</td><td>0.0881 lb</td></tr>
        </tbody>
      </table>
    </div>

    <p>The quintuple sovereign, despite its "five pounds" face-value name, still weighs less
    than a tenth of an actual avoirdupois pound &mdash; a reminder that a coin's currency
    denomination and its physical weight in pounds are two unrelated numbers that happen to
    share the word "pound."</p>

    <h2 id="worked">Converting a tube or box of coins to pounds</h2>

    <p>To find the pound weight of several identical coins, multiply one coin's official
    gram weight by the coin count, then divide the result by 453.59237. Mints and dealers
    package bullion coins in standard tube and box counts, so the same two-step math applies
    whether the count is 10, 20, or 500:</p>

    <div class="worked">
      10-coin tube of American Gold Eagles (1 oz each):<br>
      33.931 &times; 10 = <strong>339.31</strong> g<br>
      339.31 &divide; 453.59237 = <strong>0.7481</strong> lb<br>
      result &rarr; <strong>0 lb 11.97 oz</strong>
    </div>

    <div class="worked">
      20-coin tube of American Silver Eagles (1 oz each):<br>
      31.103 &times; 20 = <strong>622.06</strong> g<br>
      622.06 &divide; 453.59237 = <strong>1.3714</strong> lb<br>
      result &rarr; <strong>1 lb 5.94 oz</strong>
    </div>

    <div class="worked">
      500-coin "monster box" of American Silver Eagles:<br>
      31.103 &times; 500 = <strong>15,551.5</strong> g<br>
      15,551.5 &divide; 453.59237 = <strong>34.2852</strong> lb<br>
      result &rarr; <strong>34 lb 4.56 oz</strong>
    </div>

    <p>The same multiply-then-divide method works for any coin and any count &mdash; a
    25-coin tube of Krugerrands (33.93 g each) comes to 848.25 grams, or 1.8701 pounds,
    using the exact same two steps. The <a href="../../">converter</a> performs the division
    step instantly for any gram total, at 2, 4, or 6 decimal places.</p>

    <h2 id="tolerance">Minting tolerance: why a real coin can vary slightly</h2>

    <p>A real coin's actual weight on a scale can differ from its official specification by
    a small, legally defined margin called minting tolerance, not an error. US bullion coin
    law (31 U.S.C. &sect; 5112) sets the gram figures above as the legal standard weight,
    but allows a fractional-gram variance in either direction during striking, since no
    mechanical process produces every coin at the exact same mass down to the milligram.</p>

    <p>This tolerance is normal manufacturing variance, not a sign a coin is underweight or
    counterfeit, though a coin that falls noticeably outside its mint's published tolerance
    range is worth re-checking against that specification. The gram figures throughout this
    guide are each mint's stated standard weight &mdash; the number stamped into law or
    listed on the mint's own specification page, not a weight read off any individual coin.</p>
  `,
  faqs: [
    {
      q: 'How much does a one-ounce gold bullion coin weigh in pounds?',
      a: 'A one-ounce gold bullion coin weighs roughly 0.07 to 0.075 pounds, depending on its alloy. A 33.931 gram American Gold Eagle (22 karat) is 0.0748 pounds, while a 31.103 gram Canadian Gold Maple Leaf (.9999 fine, almost no alloy) is slightly lighter at 0.0686 pounds. Both coins contain one troy ounce of pure gold; the difference is the extra copper and silver alloy in the 22-karat coins.'
    },
    {
      q: 'What is the weight of a British gold sovereign in pounds?',
      a: 'A British gold sovereign weighs 7.98805 grams, which is 0.0176 pounds. The Royal Mint has held this as the sovereign’s standard weight, at 22-carat (.9167) fineness, since 1817. A sovereign is much lighter than a one-troy-ounce bullion coin because it was never struck to that standard in the first place.'
    },
    {
      q: 'Why do gold bullion coins weigh more than exactly one troy ounce?',
      a: 'Most "one ounce" gold bullion coins weigh more than 31.1034768 grams (one troy ounce) because the "one ounce" refers to the pure gold content, not the coin’s total mass. A 22-karat coin like the American Gold Eagle or Krugerrand is alloyed with copper and silver for durability, which adds weight: the gold content stays at one troy ounce, but the gross coin comes to 33.93–33.931 grams. Coins struck in .9999 fine gold, like the Canadian Maple Leaf, have almost no added alloy, so their gross weight sits much closer to the pure one-troy-ounce figure.'
    },
    {
      q: 'How much does a Krugerrand weigh?',
      a: 'A standard one-ounce Krugerrand weighs 33.93 grams, which is 0.0748 pounds. Like the American Gold Eagle, it is struck in 22-karat (.9167 fine) gold, so its gross weight is higher than the 31.1034768 grams of pure gold it actually contains.'
    },
    {
      q: 'How much does an American Silver Eagle weigh in grams and pounds?',
      a: 'An American Silver Eagle weighs 31.103 grams by federal statute (31 U.S.C. § 5112(e)), which is 0.0686 pounds. It is struck in .999 fine silver, close enough to pure that its gross weight and its troy-ounce silver content are effectively the same number.'
    },
    {
      q: 'Can a coin’s actual weight differ from its official specification?',
      a: 'Yes, by a small, legally allowed margin called minting tolerance. Mints specify both a standard weight and a permitted variance, since no striking process produces every coin at an identical mass. A coin a fraction of a gram off its stated specification is normal manufacturing variance; one noticeably outside that tolerance is worth re-checking against the mint’s own published figures.'
    }
  ]
};
