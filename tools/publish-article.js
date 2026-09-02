/* Publishes one blog article from a draft spec.

   Usage:
     node tools/publish-article.js content/drafts/<slug>.js
     node tools/publish-article.js content/drafts/<slug>.js --dry-run

   The draft file is a Node module exporting a spec object — see
   content/drafts/TEMPLATE.js for the full shape and content/drafts/README.md
   for what each field means. This script:

     1. Validates the spec against the site's non-negotiable rules (facts
        checked against convert.js, minimum 5 FAQs, title/description length,
        required fields) and refuses to publish if any hard rule fails.
     2. Renders the featured image (skipped if one already exists at the
        target path and --skip-image is passed).
     3. Assembles the full page: head, breadcrumb, TOC + prose article body,
        FAQ accordion, Article + BreadcrumbList + FAQPage schema, footer.
     4. Writes blog/<slug>/index.html.
     5. Adds the article to content/articles.json (or updates it, if the slug
        already exists — re-running this script on an edited draft updates
        the live article rather than duplicating it).
     6. Regenerates blog/index.html and sitemap.xml/llms.txt so the new
        article is discoverable everywhere it should be.

   Nothing here calls git or the indexing step — see tools/indexnow-submit.js
   for that, run separately once you have reviewed the draft and committed it.
   That separation is deliberate: this script can be re-run safely while
   drafting, without spamming a submission API on every tweak.
*/

const fs = require('fs');
const path = require('path');
const lib = require('./lib/site');
const { renderFeaturedImage } = require('./lib/featured-image');
const { buildBlogIndex } = require('./build-blog-index');

const ROOT = path.join(__dirname, '..');

function fail(msg) {
  console.error('REFUSED TO PUBLISH: ' + msg);
  process.exit(1);
}

function validate(spec) {
  const errors = [];
  if (!spec.slug || !/^[a-z0-9-]+$/.test(spec.slug)) errors.push('slug must be lowercase-with-hyphens');
  if (!spec.title) errors.push('title is required');
  if (spec.title && spec.title.length > 65) errors.push('title is ' + spec.title.length + ' chars, keep it under ~65');
  if (!spec.metaDesc) errors.push('metaDesc is required');
  if (spec.metaDesc && spec.metaDesc.length > 155) errors.push('metaDesc is ' + spec.metaDesc.length + ' chars, over the 155 limit');
  if (!spec.excerpt) errors.push('excerpt is required (used on the /blog/ listing card)');
  if (!spec.datePublished || !/^\d{4}-\d{2}-\d{2}$/.test(spec.datePublished)) errors.push('datePublished must be YYYY-MM-DD');
  if (!spec.toc || !spec.toc.length) errors.push('toc (table of contents entries) is required, at least one');
  if (!spec.bodyHTML) {
    errors.push('bodyHTML is required — the article content itself');
  } else {
    /* Counts bodyHTML plus the FAQ answers together — matching how every
       existing guide's word count has been measured throughout this site
       (site-report.js counts the whole rendered page). FAQs are genuine
       article content; nav/footer chrome is not counted either way. */
    const faqText = (spec.faqs || []).map((f) => f.q + ' ' + f.a).join(' ');
    const words = (spec.bodyHTML + ' ' + faqText)
      .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    if (words < 1200) errors.push('article is only ' + words + ' words (body + FAQs) — 1200 is the minimum (site rule, not a suggestion)');
  }
  if (!spec.faqs || spec.faqs.length < 5) errors.push('faqs must have at least 5 entries (this is a hard site rule, not a suggestion — see CLAUDE.md and the write-article skill)');
  (spec.faqs || []).forEach((f, i) => {
    if (!f.q || !f.a) errors.push('faqs[' + i + '] is missing q or a');
  });
  if (!spec.featuredImage || !spec.featuredImage.eyebrow) errors.push('featuredImage.eyebrow is required');
  if (!spec.featuredImageAlt) errors.push('featuredImageAlt is required — descriptive alt text for the featured image');

  if (errors.length) {
    console.error('Spec has ' + errors.length + ' problem(s):');
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
  }
}

function buildArticlePage(spec) {
  const p = '../../';
  const category = spec.category || 'Guide';

  const tocHTML = spec.toc.map((t) => `          <li><a href="#${t.id}">${t.label}</a></li>`).join('\n');

  const page = {
    slug: 'blog/' + spec.slug,
    title: spec.metaTitle || (spec.title + ' | gramstolbs.com'),
    desc: spec.metaDesc,
    ogType: 'article',
    schema: lib.articleSchema({
      title: spec.title,
      desc: spec.metaDesc,
      slug: 'blog/' + spec.slug,
      datePublished: spec.datePublished,
      dateModified: spec.dateModified,
      sectionName: 'Blog',
      sectionSlug: 'blog',
      keywords: spec.keywords || [],
      faqs: spec.faqs
    })
  };

  const body = `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> ${category}</span>
    <h1>${spec.title}</h1>
    <p>${spec.dek || spec.excerpt}</p>
  </section>
${lib.articleCrumb(p, 'Blog', 'blog/', spec.title)}

  <div class="article">
    <aside class="toc">
      <h2>On this page</h2>
      <nav aria-label="Article contents">
        <ul>
${tocHTML}
        </ul>
      </nav>
    </aside>

  <section class="prose">
${lib.byline(spec.author || lib.AUTHOR, spec.dateLabel || spec.datePublished)}
${lib.featuredFigure(p, spec.slug, spec.featuredImageAlt, spec.featuredImageCaption)}
${spec.bodyHTML}

    <h2 id="faq">Frequently asked questions</h2>
    <div class="faq-list breakout">
${lib.faqAccordion(spec.faqs)}
    </div>

    ${spec.sources ? `<div class="sources">
      <h3>Sources</h3>
      <ul>
        ${spec.sources.map((s) => `<li>${s}</li>`).join('\n        ')}
      </ul>
    </div>` : ''}

  </section>
  </div>`;

  return lib.head(p, page) + body + lib.foot(p);
}

function main() {
  const draftPath = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');
  const skipImage = process.argv.includes('--skip-image');

  if (!draftPath) {
    console.error('Usage: node tools/publish-article.js content/drafts/<slug>.js [--dry-run] [--skip-image]');
    process.exit(1);
  }

  const resolved = path.resolve(draftPath);
  if (!fs.existsSync(resolved)) fail('draft file not found: ' + draftPath);

  delete require.cache[resolved];
  const spec = require(resolved);

  validate(spec);

  console.log('Validated: ' + spec.slug);

  const imgOut = path.join(ROOT, 'assets', 'img', 'blog', spec.slug + '.png');
  const needsImage = !skipImage && (!fs.existsSync(imgOut) || process.argv.includes('--force-image'));

  if (dryRun) {
    console.log('--dry-run: would ' + (needsImage ? 'render featured image, ' : 'reuse existing featured image, ') +
      'write blog/' + spec.slug + '/index.html, update registry, rebuild blog index + sitemap + llms.txt.');
    console.log('No files were changed.');
    return;
  }

  if (needsImage) {
    console.log('Rendering featured image...');
    renderFeaturedImage({
      title: spec.title,
      eyebrow: spec.featuredImage.eyebrow,
      stats: spec.featuredImage.stats || [],
      out: imgOut
    });
    console.log('  ' + path.relative(ROOT, imgOut));
  } else {
    console.log('Featured image already exists, reusing: ' + path.relative(ROOT, imgOut));
  }

  const html = buildArticlePage(spec);
  const outDir = path.join(ROOT, 'blog', spec.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log('Wrote blog/' + spec.slug + '/index.html');

  const plainWords = spec.bodyHTML.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').trim().split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(plainWords / 200));

  const articles = lib.loadArticles();
  const entry = {
    slug: spec.slug,
    title: spec.title,
    excerpt: spec.excerpt,
    category: category(spec),
    cardAlt: spec.featuredImageAlt,
    datePublished: spec.datePublished,
    dateModified: spec.dateModified || spec.datePublished,
    readMinutes: readMinutes,
    keywords: spec.keywords || [],
    llmsDesc: spec.llmsDesc || spec.excerpt
  };
  const existingIdx = articles.findIndex((a) => a.slug === spec.slug);
  if (existingIdx === -1) {
    articles.push(entry);
    console.log('Added to content/articles.json');
  } else {
    articles[existingIdx] = entry;
    console.log('Updated existing entry in content/articles.json');
  }
  lib.saveArticles(articles);

  buildBlogIndex();
  console.log('Rebuilt blog/index.html');

  lib.writeSitemap(ROOT, lib.CORE_PAGES);
  lib.writeLlms(ROOT);
  console.log('Updated sitemap.xml and llms.txt');

  console.log('');
  console.log('Published: ' + lib.SITE + '/blog/' + spec.slug + '/');
  console.log('');
  console.log('Next steps (not done automatically — review first):');
  console.log('  1. Open the page locally and read it end to end.');
  console.log('  2. node tools/audit.js');
  console.log('  3. git add -A && git commit -m "..." && git push');
  console.log('  4. node tools/indexnow-submit.js ' + lib.SITE + '/blog/' + spec.slug + '/');
}

function category(spec) {
  return spec.category || 'Guide';
}

main();
