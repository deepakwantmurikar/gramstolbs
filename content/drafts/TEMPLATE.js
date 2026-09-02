/* Template for a new article draft. Copy this file to <slug>.js and fill it
   in — see .claude/skills/write-article/SKILL.md for the full process this
   feeds into. content/drafts/grams-to-pounds-conversion-chart.js is a real,
   published example of every field below in actual use.

   Required fields are marked. Everything here is validated by
   tools/publish-article.js before anything is written to disk — run
   `node tools/publish-article.js content/drafts/<slug>.js --dry-run` first.
*/

module.exports = {
  // REQUIRED. Lowercase, hyphenated. Becomes the URL: /blog/<slug>/
  slug: 'example-article-slug',

  // REQUIRED. The on-page <h1> and social-card headline. Keep under ~65 chars.
  title: 'Example Article Title',

  // Optional. If set, used as the <title> tag instead of title above — for
  // when the H1 and the SEO title should differ slightly.
  metaTitle: '',

  // REQUIRED. <=155 chars. The meta description and social share text.
  metaDesc: '',

  // Shown as a small pill above the H1, e.g. 'Guide', 'Reference', 'How-to'.
  category: 'Guide',

  // Long-tail keywords this article targets. Goes into schema.org keywords
  // and should each appear naturally in the body — do not force one in.
  keywords: [],

  // REQUIRED. One or two sentences for the /blog/ index card and llms.txt.
  excerpt: '',

  // Optional. A slightly longer version of excerpt shown under the H1 on the
  // article page itself. Falls back to excerpt if omitted.
  dek: '',

  // REQUIRED. YYYY-MM-DD.
  datePublished: '',
  // Optional — set only when re-publishing an edit to an already-live article.
  dateModified: '',

  // REQUIRED. Drives the branded featured image (not a photograph — see
  // tools/lib/featured-image.js for why that distinction matters here).
  featuredImage: {
    eyebrow: '',          // small label on the image, e.g. 'Guide · Baby Weight'
    stats: []              // up to 3, each 'label|value', e.g. '500 g|1.1023 lb'
  },
  // REQUIRED. Descriptive alt text for the featured image — this is what
  // screen readers and image search see; do not leave it generic.
  featuredImageAlt: '',
  // Optional. Caption shown under the image on the article page.
  featuredImageCaption: '',

  // REQUIRED. At least one entry; becomes the sticky "On this page" rail.
  // Each id must match a heading id used in bodyHTML.
  toc: [
    // { id: 'answer', label: 'The quick answer' },
  ],

  // REQUIRED. The article body as HTML, using the helpers in tools/lib/site.js
  // where they fit — lib.articleTable(), lib.statCardGrid(), lib.featureCardGrid(),
  // lib.workedExample() — so tables and cards look native to the site rather
  // than reinventing markup. First H2's first sentence must be the direct
  // answer (site-wide writing rule). Every number must be checked against
  // assets/js/convert.js before it is written, not estimated.
  bodyHTML: `

  `,

  // REQUIRED. At least 5. Phrase questions the way people actually ask a
  // chatbot or type into "People Also Ask", not how they'd type a search
  // query — that distinction is deliberate, see the GEO notes in the skill.
  faqs: [
    // { q: '...', a: '...' },
  ],

  // Optional. Rendered as a short sources list at the end of the article.
  sources: []
};
