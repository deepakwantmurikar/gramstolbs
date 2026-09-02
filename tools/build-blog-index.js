/* Regenerates /blog/index.html from content/articles.json.

   Run standalone:  node tools/build-blog-index.js
   Also called automatically by tools/publish-article.js after each new
   article, so the listing is never stale relative to what has been published.
*/

const fs = require('fs');
const path = require('path');
const lib = require('./lib/site');

const ROOT = path.join(__dirname, '..');

function buildBlogIndex() {
  const articles = lib.loadArticles()
    .slice()
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1)); // newest first

  const page = {
    slug: 'blog',
    title: 'Blog — Grams to Lbs Conversion Guides | gramstolbs.com',
    desc: 'Guides on converting grams to pounds for baby weight, gold, shipping, cooking and more, each with worked examples and a reference table.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [lib.ORG, lib.PERSON,
        {
          '@type': 'CollectionPage',
          name: 'Blog',
          url: lib.SITE + '/blog/',
          description: 'Guides on converting grams to pounds for real situations.'
        },
        lib.crumbs('Blog', 'blog')
      ]
    }
  };

  const p = '../';

  const body = `
  <section class="hero wrap">
    <span class="eyebrow"><span class="dot" aria-hidden="true"></span> Blog</span>
    <h1>Grams to Lbs: Guides and Articles</h1>
    <p>Every article works through a real situation with the exact formula and a
    reference table, not filler. New articles are added as they are researched and written.</p>
  </section>

  <section class="band wrap">
    <div class="blog-layout">
      <div class="blog-main">
        ${articles.length
          ? articles.map((a) => lib.articleCardHTML(p, a)).join('')
          : `<p class="blog-empty">No articles published yet. Check back soon, or see the
             <a href="${p}guides/baby-weight-grams-to-pounds/">core guides</a> in the meantime.</p>`}
      </div>
      ${lib.blogSidebar(p)}
    </div>
  </section>`;

  const html = lib.head(p, page) + body + lib.foot(p);
  fs.mkdirSync(path.join(ROOT, 'blog'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'blog', 'index.html'), html, 'utf8');
  return articles.length;
}

module.exports = { buildBlogIndex };

if (require.main === module) {
  const n = buildBlogIndex();
  console.log('blog/index.html written (' + n + ' article' + (n === 1 ? '' : 's') + ')');
}
