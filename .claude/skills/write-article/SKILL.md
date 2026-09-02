---
name: write-article
description: Runs gramstolbs.com's autonomous blog pipeline — pulls the next vetted topic, researches it, writes, self-verifies, and publishes a new article without asking Deepak first. Use on the 3x/week schedule, or when he asks to write/publish an article, check the backlog, or run the pipeline.
---

# gramstolbs.com autonomous article pipeline

Agreed with Deepak on 2026-09-02, superseding the earlier on-demand/review-gate
version of this skill: **fully autonomous, no per-article approval.** The
pipeline researches, writes, self-verifies, publishes, and submits for
indexing in one run, with no pause for Deepak — except the one safety valve
below, which he explicitly asked to keep.

**Cadence: 3x per week, not daily.** He asked for daily; the backlog math
doesn't support it without eventually forcing duplicate or thin content in
this scope-locked niche (~12 vetted topics = 4 weeks at 3x/week, 5-7 weeks at
daily). He picked 3x/week specifically to avoid that. If he overrides this in
a future message, follow the override — don't silently keep 3x/week against
a direct instruction — but don't revert to daily on your own judgment either.

**The one safety valve (his choice, confirmed): queue and skip, never
force-publish.** If self-verification or validation fails for the day's
topic, save the draft, mark the topic `needs-review` in the backlog, publish
nothing that day, and note it in the weekly digest. A skipped day is fine. A
wrong number or a duplicate page live on the site is not.

Scope reminder (see [[gramstolbs-scope-and-keyword-style]] in memory): this
site is grams↔lbs only. Every topic in `content/topic-backlog.json` was
already scope-checked when it was added — do not add a new topic outside that
file's vetted list without a genuine reason, and never invent one purely
because the backlog ran low (see Step 0).

## Three corrections to hold onto while doing this

Raised with Deepak directly, more than once. Repeat them if a request assumes
otherwise — don't quietly work around it or pretend a capability exists.

1. **No submission API exists for ChatGPT, Perplexity, or Gemini.** They
   crawl the open web on their own schedule. The real levers: robots.txt
   allows them (verified by `tools/audit.js`), content is written to be
   retrieval-friendly (this SOP does that), and `tools/site-report.js --logs`
   is how you'd verify actual crawler visits if Deepak provides an access log.
2. **Google Trends has no official free API.** There is no programmatic way
   to pull real search-volume or trending data without a paid third-party
   service (SerpApi, DataForSEO). Absent that, "trending" signal comes from
   an ordinary `WebSearch` pass for recent news on the day's topic (Step 1) —
   real freshness, but not Trends data. Say so plainly if asked; don't imply
   otherwise.
3. **"Self-verified" and "plagiarism-free" mean different things here.**
   Every number is mechanically checked against `assets/js/convert.js`
   (Step 2.5, mandatory, not optional). Originality is a *writing discipline*
   — draft from the formulas, never with a competitor page open — not an
   independent scan. Deepak has no plagiarism-API key set up; if that
   changes, wire it into Step 3 as a real automated check.

## Step 0 — Get the next topic

```
node tools/next-topic.js
```

Returns the next `open` entry from `content/topic-backlog.json` as JSON:
`angle`, `why` (why it doesn't cannibalize existing content), `seedKeywords`,
and `cautions` (a scope/YMYL note written when the topic was vetted — follow
it exactly; if the topic can't be written without crossing it, mark it
`needs-review` via `--mark-needs-review <id> "<reason>"` and stop for that
run rather than force it).

**If the backlog is empty** (`"topic": null`), stop. Do not invent a new
topic unattended — topic selection includes a scope/YMYL judgment call that
deserves a human pass, which is the entire reason the backlog exists instead
of picking topics live. Note it in the digest so Deepak knows to add more.

**If `remaining` is 3 or fewer**, still proceed with today's topic, but flag
the low count in the digest.

## Step 1 — Research

1. `WebSearch` the topic's `seedKeywords` and the angle itself. Note what
   currently ranks — the gap in existing coverage is the actual opportunity.
2. Freshness pass: search for recent news relevant to the topic (e.g., a
   regulatory change, a price move, a seasonal hook). If there's a genuine
   current angle, use it. If not, don't force one — the article doesn't need
   to pretend to be timely.
3. Pull at least 5 real "People Also Ask"-style questions from the search
   results and from `"<topic>" reddit` / `"<topic>" forum` — these become the
   FAQ section. Do not invent them.
4. **Duplicate check, mandatory, two sources**: read `content/articles.json`
   (everything already published) AND `content/topic-backlog.json` (so you
   don't overlap another queued-but-unpublished topic). If the angle turns
   out to already be covered, mark this backlog entry `needs-review` with
   that reason and stop for this run rather than publish a near-duplicate.

## Step 2 — Write the draft

Copy `content/drafts/TEMPLATE.js` to `content/drafts/<slug>.js`, using the
backlog `id` as the slug (or a close variant). Use the backlog topic's
`angle` as the article's actual angle — don't drift from it mid-write.
`content/drafts/grams-to-pounds-conversion-chart.js` is a complete real
example to pattern-match against.

**Non-negotiable content rules** (from `CLAUDE.md`, enforced sitewide):

- **Minimum 1,200 words**, body plus FAQ answers combined.
  `tools/publish-article.js` refuses to publish under that.
- Under every H2, the first sentence is the complete, direct answer.
  Explanation follows — this is also the GEO rule.
- Every section must make sense lifted out on its own; restate the numbers
  it depends on rather than "as shown above."
- Facts as declarative sentences, number and unit together: "500 grams
  equals 1.1023 pounds," never "the result is 1.1023."
- Banned phrases: "in this article", "in today's world", "when it comes
  to", "delve", "it's important to note", "whether you're a X or a Y", "look
  no further", "we've got you covered", "seamless", "unlock".
- Never write the misspellings grms, grans, or gms into body copy.
- Write from first principles using the formulas. Never draft with a
  competitor page open — work from the numbers, not their sentences. This is
  the actual originality safeguard in the absence of a plagiarism-scan API.
- Respect the backlog topic's `cautions` field exactly, especially any YMYL
  boundary (e.g. pet food and baby formula topics are unit-conversion only —
  no feeding/dosing guidance of any kind).

**Tables and cards** — `tools/lib/site.js` has ready helpers so generated
content matches the site's look: `lib.articleTable(...)`,
`lib.statCardGrid(...)`, `lib.featureCardGrid(...)`, `lib.workedExample(...)`.
Use what the topic actually calls for, not all four by default.

**Featured image**: `featuredImage: { eyebrow, stats }`. This renders a
branded *data card* — eyebrow pill and stat readouts, deliberately with no
title text baked in, because the image sits directly under the real `<h1>`
on the article page and a second copy of the headline inside the image
reads as a duplicated, oversized mess (this was a real bug, fixed
2026-09-02 — don't reintroduce it by adding title text back into the
template). Write real, specific `featuredImageAlt` text.

## Step 2.5 — Self-verify every numeric claim (mandatory, not optional)

Before validating, list every number you wrote in the draft and re-derive
each one independently:

```
node -e "
$(cat assets/js/convert.js)
console.log(roundTo(gramsToPounds(750), 4));
"
```

Compare each result against what's written in `bodyHTML`. This has caught
real errors before (five wrong figures in the original guides, caught this
exact way). Do not skip this because the numbers "look right" — that's
exactly the failure mode it exists to catch. If any number doesn't match,
fix the draft before moving on, not after.

## Step 3 — Validate

```
node tools/publish-article.js content/drafts/<slug>.js --dry-run
```

Enforces: slug format, title/meta-desc length, required fields, **1,200-word
minimum**, minimum 5 FAQs. If it fails:

```
node tools/next-topic.js --mark-needs-review <id> "<what failed>"
```

Save the draft as-is (don't delete it — it may just need editing next run),
publish nothing today, stop this run. This is the safety valve; use it
rather than forcing a publish.

If the dry run is clean:

```
node tools/publish-article.js content/drafts/<slug>.js
node tools/audit.js
```

Both must succeed. `audit.js` must report "no issues found."

## Step 4 — Publish and index (no approval needed)

```
git add -A
git commit -m "Add blog article: <title>"
git push
node tools/next-topic.js --mark-published <id>
```

Wait for Hostinger's auto-deploy (confirmed working, a few seconds), then:

```
node tools/indexnow-submit.js https://gramstolbs.com/blog/<slug>/
```

Real, automatable, covers Bing/Yandex/IndexNow participants. Google has no
equivalent without one-time OAuth setup (see `tools/site-report.js` header);
until Deepak sets that up, note in the digest that manual Search Console
submission is still outstanding for this URL — don't skip mentioning it just
because it can't be automated yet.

## Step 5 — Log to the digest

Append one entry to `content/digest-log.md` (create it if missing) — this is
what Deepak checks on his own time instead of reviewing every article:

```
## YYYY-MM-DD
- Published: <title> (<url>) — <word count> words, <n> FAQs
- Backlog remaining: <n>
- [if anything was skipped] Skipped: <topic id> — <reason>, needs review
- [if backlog is low] Backlog has <n> topics left — add more soon
- Still manual: Google Search Console submission for today's URL
```

Don't message Deepak per-article. The digest is the report; he reads it
when he has time.

## Adding a cross-link from existing pages

A new article starts with exactly one inbound link (from `blog/index.html`).
If it's genuinely relevant to an existing guide, add one contextual link from
there with descriptive anchor text. Don't force it if the topics don't
actually relate.

## Growing the backlog

When it runs low (Step 0 flags this at 3 remaining), don't invent new
entries unattended. Note it in the digest. If Deepak asks you to top it up,
apply the same bar the existing 12 entries meet: genuinely distinct from
everything already published (check `content/articles.json`), inside
grams↔lbs scope, tier-1-country relevant, and — for anything adjacent to
health, safety, or finance — an explicit `cautions` line drawn narrowly
enough that a self-verifying pipeline can actually stay inside it.
