# gramstolbs.com — article pipeline digest

Appended to automatically by the write-article pipeline after each scheduled
run (3x/week). Newest entries at the top. This is what to check instead of
reviewing every article — see `.claude/skills/write-article/SKILL.md`.

## 2026-09-11
- Published: How Many Pounds to Ask For at the Deli When a Recipe Says Grams (https://gramstolbs.com/blog/deli-counter-grams-to-pounds/) — 1,202 words, 6 FAQs
- Angle: converting a recipe's gram amount into what to actually say at a US deli or butcher counter, since counter scales are calibrated in pounds and ounces, not grams or decimal pounds. Covers a 16-row chart of common recipe amounts (100 g–1,500 g), two full worked examples (350 g, 230 g), why US counters use lb/oz while gram-based recipes don't, and why hand-cut orders land close to but not exactly on the requested figure (common quarter-/half-pound counter increments).
- Freshness pass: no live news hook specific to deli ordering; didn't force one, per SOP.
- Duplicate check: clear against content/articles.json (drone-weight, coffee-bag, filament, diamond-carats) and the rest of topic-backlog.json — distinct from the food-labels guide (packaged goods with printed serving sizes) since this covers unpackaged, hand-weighed counter orders.
- Self-verification: every gram→pound and gram→lb/oz figure in the chart and both worked examples was recomputed against `assets/js/convert.js` before publishing; all matched on the first pass.
- First dry-run/audit cycle caught one real issue: the rendered `<title>` tag (metaTitle + " | gramstolbs.com" suffix) was 63 chars, over the site's 60-char head-tag rule flagged by `tools/audit.js`. Shortened metaTitle and republished; second audit came back clean ("no issues found").
- Backlog remaining: 7
- Still manual: Google Search Console submission for today's URL.
- IndexNow submission returned HTTP 403 again — same pattern as every prior run (2026-09-02, 09-04, 09-07, 09-09). Consistent with the standing finding that this environment's outbound proxy blocks `api.indexnow.org` (not in its allowlist); the key file (`90190755243dcbe1b1dd3ccc9d085dab.txt`) is unchanged and committed. Manual re-run recommended: `node tools/indexnow-submit.js https://gramstolbs.com/blog/deli-counter-grams-to-pounds/` from an environment with unrestricted outbound access, or add `api.indexnow.org` to this environment's proxy allowlist — this has now failed identically on five consecutive runs and is worth fixing at the infrastructure level rather than re-noting each time.

## 2026-09-09
- Published: Diamond Carats to Grams to Pounds (and Why They Differ) (https://gramstolbs.com/blog/diamond-carats-grams-to-pounds/) — 1,553 words, 6 FAQs
- Angle: the exact carat-to-gram definition (1 ct = 0.2 g, metric standard since 1907), a full carats-to-grams-to-pounds chart, the reverse fact (1 lb = 2,267.96 ct), three sourced famous-diamond weights (Cullinan, Hope, Excelsior) converted to pounds, and the points-to-carats notation. Stayed strictly to unit conversion per this topic's cautions — no jewelry valuation or investment advice anywhere in the draft.
- Freshness pass: no live news hook for carat weight specifically; didn't force one, per SOP.
- Duplicate check: clear against content/articles.json (drone-weight, coffee-bag, filament) and the rest of topic-backlog.json — genuinely distinct from the gold/troy-ounce guide (different unit system, 1 ct = 200 mg exactly vs. troy ounces).
- Self-verification: every carat→gram→pound figure in the draft (chart rows, famous-diamond weights, the 1 lb = 2,267.96 ct reverse conversion, points table) was recomputed against `assets/js/convert.js` before publishing; two unsourced weight comparisons ("lighter than a can of soup", "two US nickels") were caught as inaccurate during the pass and replaced with plain, verified figures.
- Backlog remaining: 8
- Still manual: Google Search Console submission for today's URL.
- IndexNow submission returned HTTP 403 again (same pattern as 2026-09-02, 09-04, 09-07). Consistent with the prior finding that this environment's outbound proxy blocks `api.indexnow.org` (not in its allowlist) — the key file (`90190755243dcbe1b1dd3ccc9d085dab.txt`) is unchanged and committed. Manual re-run recommended: `node tools/indexnow-submit.js https://gramstolbs.com/blog/diamond-carats-grams-to-pounds/` from an environment with unrestricted outbound access, or add `api.indexnow.org` to this environment's proxy allowlist.

## 2026-09-07
- Published: Filament Spool Weight: 1kg in Pounds (Net vs Gross) (https://gramstolbs.com/blog/3d-printing-filament-grams-to-pounds/) — 1,433 words, 6 FAQs
- Angle: 3D printer filament net weight (filament only, e.g. 1,000 g on a "1kg" spool) vs. gross weight (filament + empty spool, typically +150 to +260 g), covering the common spool sizes, how to weigh a spool to find remaining filament, and why boxed shipping weight runs noticeably higher than the label's net figure.
- Freshness pass: no live regulatory/news hook for this topic (unlike the drone or coffee-shrinkflation angles) — didn't force one, per SOP; the piece leans on the genuine net-vs-gross confusion instead.
- Duplicate check: clear against content/articles.json (drone-weight, coffee-bag) and the rest of topic-backlog.json — nothing else on the site touches 3D printing or filament.
- Backlog remaining: 10
- Still manual: Google Search Console submission for today's URL.
- IndexNow submission returned HTTP 403 for a third consecutive run (also 2026-09-02, 2026-09-04). New evidence this time: `curl "$HTTPS_PROXY/__agentproxy/status"` shows this environment's outbound proxy actively rejecting CONNECT to hosts outside its allowlist (`recentRelayFailures` full of `connect_rejected` / gateway 403 entries for unrelated hosts like google.com), and `api.indexnow.org` isn't in the proxy's `noProxy` allowlist. That's a much stronger signal than the last two runs had that this is an environment egress restriction, not a problem with the site's key file (`90190755243dcbe1b1dd3ccc9d085dab.txt`, committed and unchanged) or with IndexNow itself. Likely fix: add `api.indexnow.org` to the proxy allowlist for this environment, or run `node tools/indexnow-submit.js https://gramstolbs.com/blog/3d-printing-filament-grams-to-pounds/` from a machine with unrestricted outbound access.

## 2026-09-04
- Published: Coffee Bag Sizes in Pounds: 250g, 340g and 1kg Converted (https://gramstolbs.com/blog/coffee-bag-grams-to-pounds/) — 1,458 words, 6 FAQs
- Freshness angle used: coffee bag "shrinkflation" — roasters quietly shrinking bags from 340 g (12 oz) down to 300 g or 250 g at the same shelf price rather than raising prices outright, driven by rising green coffee costs. Worked into its own section plus a price-per-pound example and one FAQ.
- Duplicate check: clear against content/articles.json (only the drone-weight article is published) and the rest of topic-backlog.json — no overlap with the food-label guide (that's nutrition-panel serving sizes; this is whole-bag purchase sizing).
- Backlog remaining: 10
- Still manual: Google Search Console submission for today's URL.
- IndexNow submission returned HTTP 403 again (same as the 2026-09-02 run). The key file (`90190755243dcbe1b1dd3ccc9d085dab.txt`) is unchanged and committed; this environment's outbound proxy still can't reach gramstolbs.com directly to verify the live key file, so this remains unconfirmed as transient vs. a real misconfiguration. Same manual re-run recommendation as last time: `node tools/indexnow-submit.js https://gramstolbs.com/blog/coffee-bag-grams-to-pounds/` from an environment with direct outbound access, or check the key file's live reachability if this keeps failing across runs.

## 2026-09-02
- Published: Drone Weight: 250 Grams to Pounds for FAA Registration (https://gramstolbs.com/blog/drone-weight-grams-to-pounds/) — 1,235 words, 6 FAQs
- Freshness angle used: UK CAA cut its drone registration threshold from 250 g to 100 g, effective 1 Jan 2026 — worked into the country-comparison table and one FAQ.
- Backlog remaining: 11
- Still manual: Google Search Console submission for today's URL.
- Environment fix (not content): `tools/lib/featured-image.js` couldn't find/run headless Chrome in this container (no system Chrome; Playwright's bundled Chromium refused headless as root without `--no-sandbox`). Patched it to (a) fall back to the Playwright-bundled Chromium under `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers` when no system Chrome exists, and (b) add `--no-sandbox` only when running as root. Behavior on a normal dev machine (non-root, real Chrome installed) is unchanged. Worth a look if image rendering ever misbehaves elsewhere.
- IndexNow submission returned HTTP 403 instead of success. The IndexNow key file (`90190755243dcbe1b1dd3ccc9d085dab.txt`) is already committed and was not touched this run, so this may be a transient verification failure on IndexNow's side rather than a real misconfiguration — but it's unconfirmed since this environment's outbound proxy blocks direct requests to gramstolbs.com, so the live key file couldn't be checked from here. Worth a manual re-run of `node tools/indexnow-submit.js https://gramstolbs.com/blog/drone-weight-grams-to-pounds/` or a check of the key file's live reachability if this keeps happening.
