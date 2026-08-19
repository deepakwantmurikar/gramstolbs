# Putting the site on GitHub and deploying it

The repository is already created and the first commit is made. What follows is
what to do next, and an honest comparison of the deployment options.

---

## Step 1 — Create the repository on GitHub

1. Go to <https://github.com/new>
2. Repository name: `gramstolbs` (anything you like)
3. **Leave "Add a README" and "Add .gitignore" unticked.** This project already
   has both, and ticking them causes a conflict on the first push.
4. Public or private is your choice. See the note at the bottom before deciding.
5. Click **Create repository**

## Step 2 — Push the code

GitHub will show you a "push an existing repository" box. Run these in the project
folder, replacing `YOUR-USERNAME`:

```
git remote add origin https://github.com/YOUR-USERNAME/gramstolbs.git
git push -u origin main
```

The first push asks you to sign in. Use the browser sign-in option if offered; it
is the least fiddly. If you are asked for a password, GitHub no longer accepts
account passwords over git — create a Personal Access Token at
<https://github.com/settings/tokens> and paste that instead.

After that, every future change is three commands:

```
git add -A
git commit -m "describe what changed"
git push
```

---

## Step 3 — Choose how it goes live

You have Hostinger already, so there are two sensible routes.

### Option A — GitHub Pages (free hosting, replaces Hostinger)

Best if you would rather not pay for hosting. GitHub serves the site from a global
CDN with free SSL, and it is genuinely fast.

1. In your repository: **Settings → Pages**
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save
3. Wait a minute; the site appears at `https://YOUR-USERNAME.github.io/gramstolbs/`
4. To use your own domain: in the same Pages settings enter `gramstolbs.com` under
   Custom domain, then at your DNS provider add:
   - four `A` records for `@` pointing at `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` pointing at `YOUR-USERNAME.github.io`
5. Tick **Enforce HTTPS** once the certificate is issued (can take an hour)

**Important caveat.** GitHub Pages does not run Apache, so `.htaccess` is ignored
entirely. That file currently handles the HTTPS redirect, the www redirect, caching
and compression. On Pages you lose those settings, though Pages does most of it for
you anyway: HTTPS is automatic, `404.html` is picked up automatically, and
compression and caching are handled by their CDN. The www-to-non-www redirect is
handled by the Custom domain setting. So in practice you lose nothing you need.

### Option B — Keep Hostinger, deploy from GitHub

Best if you are already paying for Hostinger and want to keep it. `.htaccess` keeps
working, so nothing about the current setup changes.

1. In hPanel: **Website → Git**
2. Repository: your GitHub HTTPS URL. Branch: `main`. Directory: `public_html`
3. Click **Create**, then **Deploy** whenever you want to publish

If your repository is private, Hostinger shows you an SSH key to add at
GitHub → Settings → SSH and GPG keys → New SSH key first.

After the first setup, publishing is: `git push`, then click **Deploy** in hPanel.
Hostinger can also give you a webhook URL so a push deploys automatically.

### Option C — Do not deploy from GitHub at all

Perfectly reasonable. Use GitHub purely as a backup and history, and keep uploading
through Hostinger's File Manager as described in `DEPLOY.md`. You still get the main
benefit of version control: nothing is ever lost, and any change can be undone.

---

## Which would I pick?

If the Hostinger plan is already paid for, **Option B**: you keep `.htaccess`, you
keep the control panel you know, and pushing to GitHub still gives you a full backup
and history.

If you are not attached to Hostinger, **Option A** is free, faster for visitors
outside your region, and has one less moving part.

Either way, do Steps 1 and 2. Version control is worth having on its own — it means
you can always see what changed and undo anything.

---

## A note on public versus private

If the repository is **public**, anyone can read your HTML, CSS and JavaScript. For
this site that is harmless: it is a static site, it has no passwords or keys, and all
of it is already visible to anyone who views source in a browser. A public repository
is also mildly useful as a credibility signal, since the conversion code and its
tests can be inspected.

If you would rather keep it **private**, everything still works. Note that GitHub
Pages from a private repository requires a paid GitHub plan, so if you want Option A
for free, the repository must be public.

`CLAUDE.md` and `Docs/` are excluded by `.gitignore` either way, so your working
notes are not published.

---

## Before you push, a reminder

Run the audit once more so you are committing a clean site:

```
node tools/audit.js
```

It should report **no issues found**.
