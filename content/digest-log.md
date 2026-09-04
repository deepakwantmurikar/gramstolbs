# gramstolbs.com — article pipeline digest

Appended to automatically by the write-article pipeline after each scheduled
run (3x/week). Newest entries at the top. This is what to check instead of
reviewing every article — see `.claude/skills/write-article/SKILL.md`.

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
