# Deployment checklist — gramstolbs.com

## LIVE since 19 August 2026

Deployed to Hostinger from GitHub (Advanced → GIT, branch main, root public_html).
Verified live: all 22 URLs return 200, custom 404 active, HTTPS and www redirects
working, internal notes return 403, SSL valid, 12 URLs in sitemap.

To publish a change: commit, push, then click Redeploy in hPanel (or enable the
auto-deployment webhook so a push deploys by itself).

Everything below is in the order it should be done. Items marked **[you]** are things
only you can do; the rest is already finished in the repository.

---

## 1. Before uploading

- [x] All 13 pages build and every internal link resolves (214 references checked)
- [x] `node tools/audit.js` reports no issues (run it again after any content edit)
- [x] Conversion test suite passes 20/20 at `/test.html`
- [x] Every published number verified against the conversion engine
- [x] No horizontal scrolling at 320 / 375 / 430 px
- [x] All content readable with JavaScript disabled
- [x] `robots.txt`, `sitemap.xml`, `llms.txt`, `ads.txt`, `404.html`, `.htaccess` present
- [ ] **[you]** Add your bio to `about/index.html` (search the file for `TODO`)
- [ ] **[you]** Run the homepage and the four guides through Copyscape or Quetext.
      Target under 5% matched, and any match should only be the standard numeric facts.

## 2. What to upload

Upload the **contents** of the project folder to `public_html/` on Hostinger, via
File Manager or FTP.

**Upload these:**

```
index.html      404.html        favicon.svg     robots.txt
sitemap.xml     llms.txt        ads.txt         .htaccess
about/          contact/        editorial-policy/
guides/         lbs-to-grams/   methodology/
privacy-policy/ terms/          assets/
test.html
```

**Do NOT upload these** — they are working files, not part of the site:

```
tools/      Docs/      CLAUDE.md      DEPLOY.md
```

Two notes. `.htaccess` starts with a dot, so File Manager may hide it — turn on
"show hidden files" and confirm it uploaded. And `test.html` is worth keeping public:
it is a genuine trust signal, and the methodology page links to it.

## 3. Immediately after uploading

- [ ] Visit `https://gramstolbs.com` and confirm the converter works
- [ ] Visit a made-up URL such as `https://gramstolbs.com/nope/` and confirm the
      custom 404 page appears (this proves `.htaccess` is active)
- [ ] Confirm `http://` redirects to `https://`
- [ ] Confirm `www.gramstolbs.com` redirects to `gramstolbs.com`
- [ ] Check `https://gramstolbs.com/robots.txt` and `/sitemap.xml` both load
- [ ] Click every footer link once

## 4. Search Console and indexing **[you]**

- [ ] Add and verify the domain in Google Search Console
- [ ] Submit `https://gramstolbs.com/sitemap.xml`
- [ ] Use "URL Inspection" on the homepage and request indexing
- [ ] Validate the structured data at <https://search.google.com/test/rich-results>
- [ ] Run the page through <https://pagespeed.web.dev> and note the four scores
- [ ] Add the site to Bing Webmaster Tools as well — Bing's index feeds Copilot

## 5. Original photography **[you]**

This is the single highest-value item left, and nothing in the code can substitute
for it.

- [ ] Take 3–4 photos of a real kitchen or jewellery scale with an actual reading
      showing, ideally a gram reading you then convert on the site
- [ ] Save them into `assets/img/`
- [ ] Tell me and I will place them on the homepage and in the relevant guides with
      correct `width`, `height`, `alt` and lazy loading

Original photography is the strongest "Experience" signal in E-E-A-T and it is the one
thing a competitor scraping your content cannot fake.

## 6. AdSense **[you]** — only after the above

Do not apply on day one. Wait until the site has been indexed and has some real
traffic history. Applying to a brand-new site is the most common rejection cause.

When you are approved:

- [ ] Add exactly **one** publisher line to `ads.txt`:
      `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
- [ ] In `assets/css/style.css`, find the `.ad-slot` block and **uncomment** the two
      `min-height` rules. They are switched off so empty boxes do not leave gaps, but
      they must be on before ads load or the page will jump (a Core Web Vitals failure)
- [ ] Place the AdSense script and the ad units in `#ad-top` and `#ad-mid`

**Only one publisher ID may appear anywhere on the site** — in `ads.txt` or in any
page's HTML. You have had duplicate publisher ID trouble before; this is where it
comes from.

## 7. Ongoing

- [ ] Add a contextual link from gramstocup.com to this site, with natural anchor text
      rather than "grams to lbs converter" repeated
- [ ] About a month after launch, check the Hostinger access logs for these crawler
      names to see who is actually visiting:
      `Googlebot`, `Bingbot`, `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`
- [ ] Once a month, ask ChatGPT, Perplexity and Gemini "how many pounds is 500 grams"
      and see whether you are cited. Crude, but it is the honest measure

---

## Rebuilding pages

The seven sub-pages and four guides are generated. After editing content in
`tools/build-pages.js`:

```
node tools/build-pages.js
```

`index.html` is hand-maintained and is **not** regenerated. If you change the header
or footer, change it in both `index.html` and the generator's `head()` / `foot()`.

To preview locally:

```
node tools/serve.js
```

then open <http://localhost:8080>.
