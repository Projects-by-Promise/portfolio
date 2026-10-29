# Promise Igbo — DevOps Engineer Portfolio

A fast, accessible, responsive personal portfolio built with **plain HTML5, CSS3 and vanilla JavaScript**.
No build step, no backend, no dependencies — it is designed to be hosted **for free on GitHub Pages**.

> **Before you publish:** search the project for `[ADD` and `[PLACEHOLDER` and replace every placeholder with your real information. Nothing professional (employers, certifications, metrics, dates) has been invented.

---

## Contents

1. [Project structure](#1-project-structure)
2. [Run the site locally](#2-run-the-site-locally)
3. [Customise the portfolio](#3-customise-the-portfolio)
4. [Replace images](#4-replace-images)
5. [Add projects](#5-add-projects)
6. [Add certifications](#6-add-certifications)
7. [Update the CV](#7-update-the-cv)
8. [Change social links](#8-change-social-links)
9. [Deploy with GitHub Pages](#9-deploy-with-github-pages)
10. [Connect a custom domain](#10-connect-a-custom-domain-later)
11. [Placeholder checklist](#11-placeholder-checklist)

---

## 1. Project structure

```
/
├── index.html                  # The whole one-page site (all sections)
├── 404.html                    # Friendly "page not found" page (GitHub Pages uses it automatically)
├── .nojekyll                   # Tells GitHub Pages to serve files as-is (no Jekyll processing)
├── .gitignore
├── README.md
├── css/
│   └── style.css               # All styles; colours are CSS variables at the top
├── js/
│   └── script.js               # SITE_CONFIG (your links), theme, menu, nav highlighting, animations
└── assets/
    ├── images/
    │   ├── favicon.svg          # Browser tab icon
    │   ├── favicon-32.png       # PNG fallback icon
    │   ├── apple-touch-icon.png # iOS home-screen icon
    │   ├── og-image.png         # 1200×630 social preview image
    │   ├── profile-placeholder.svg
    │   ├── projects/            # One diagram/screenshot per project
    │   │   ├── azure-terraform.svg
    │   │   ├── cicd-pipeline.svg
    │   │   ├── kubernetes-deployment.svg
    │   │   ├── devsecops-pipeline.svg
    │   │   └── ai-devops.svg
    │   └── certifications/
    │       └── certification-placeholder.svg
    └── documents/
        └── Promise-Igbo-CV.pdf  # Placeholder CV — replace with your real CV
```

**Page sections (in order):** Hero · About · Skills · DevOps Flow · Projects · Experience · Certifications · Education (optional) · Technical Writing · Contact · Footer.

Every path in the project is **relative** (e.g. `css/style.css`, `assets/images/...`). Never start a path with `/` — that would break the site in a project repository such as `https://username.github.io/portfolio/`.

---

## 2. Run the site locally

You can simply double-click `index.html`, but a local web server behaves more like GitHub Pages. Pick any one:

```bash
# Python 3 (installed on most machines)
python -m http.server 8000
# then open http://localhost:8000
```

```bash
# Node.js (only if you already have it — not needed for the site itself)
npx serve .
```

In **VS Code** you can also use the *Live Server* extension → right-click `index.html` → *Open with Live Server*.

---

## 3. Customise the portfolio

| What | Where |
|------|-------|
| Email, GitHub, LinkedIn, CV path, location | `js/script.js` → `SITE_CONFIG` (top of file) |
| Text in every section | `index.html` (each section is marked with a `<!-- ==== SECTION ==== -->` comment) |
| Colours (dark and light themes) | `css/style.css` → section **1. DESIGN TOKENS** |
| Fonts | `--font-sans` and `--font-mono` in `css/style.css` |
| Page title, description, social preview | `<head>` of `index.html` |

### Colours
All colours are CSS variables. The dark theme is defined in `:root, [data-theme="dark"]` and the light theme in `[data-theme="light"]`. For example, to change the accent colour:

```css
--color-accent: #3b9dff;        /* buttons, links, highlights */
--color-accent-strong: #0078d4;
--color-accent-2: #50e6ff;      /* secondary highlight */
```

Keep text/background contrast at WCAG AA (4.5:1) or better — e.g. check with the contrast checker in your browser's DevTools.

### Skills
Edit the `<li>` items inside each `.skill-card` in the **SKILLS** section. To add a category, copy one `<article class="card skill-card reveal">…</article>` block. The site intentionally shows no proficiency percentages.

### Experience
In the **EXPERIENCE** section, replace `[JOB TITLE]`, `[COMPANY]`, `[LOCATION]`, `[START DATE]`, `[END DATE / Present]` and `[ACHIEVEMENT 1..3]`. Copy the block between `EXPERIENCE ENTRY` and `END EXPERIENCE ENTRY` to add a role. Remove the `<span class="ph">` wrappers once the text is real (they render the yellow placeholder style).

### Education
Fill in the **EDUCATION** block, or delete the whole `<section id="education">` if you don't want it.

### Technical writing
Each article card has a `data-placeholder` link. When you publish an article (e.g. on Hashnode, Dev.to, Medium or LinkedIn), replace:

```html
<a class="text-link" href="#" data-placeholder="[ADD ARTICLE LINK]">
```
with
```html
<a class="text-link" href="https://your-article-url" target="_blank" rel="noopener noreferrer">
```
and change the `Placeholder` badge, title, date and summary.

### How placeholders behave
- Text placeholders use `<span class="ph">[ADD …]</span>` and appear highlighted in yellow so you can spot them.
- Links with `data-placeholder="…"` do not navigate; clicking shows a small message. **Removing the `data-placeholder` attribute and setting a real `href` makes the link live.**

---

## 4. Replace images

| Image | File | Recommended |
|-------|------|-------------|
| Profile photo | `assets/images/profile-placeholder.svg` | JPG/WebP, ~800×915 px (7:8), < 200 KB |
| Project images | `assets/images/projects/*.svg` | PNG/SVG/WebP, 1280×720 (16:9) |
| Certification badges | `assets/images/certifications/` | PNG/SVG, square, ~144×144 |
| Social preview | `assets/images/og-image.png` | 1200×630 PNG/JPG |
| Favicon | `assets/images/favicon.svg` (+ `favicon-32.png`, `apple-touch-icon.png`) | Square |

Example — profile photo:

1. Save your photo as `assets/images/profile.jpg`.
2. In `index.html`, find `profile-placeholder.svg` and change it to:
   ```html
   <img class="profile-photo" src="assets/images/profile.jpg" width="420" height="480" alt="Promise Igbo" loading="lazy" decoding="async">
   ```

**Tips:** file names are **case-sensitive** on GitHub Pages (`Profile.JPG` ≠ `profile.jpg`); always write meaningful `alt` text; compress images (e.g. squoosh.app) to keep the site fast.

---

## 5. Add projects

1. Open `index.html` and find `PROJECT CARD — copy this whole <article> block`.
2. Copy everything from `<article class="card project-card reveal">` to its closing `</article>`.
3. Paste it inside `<div class="projects-grid">` and edit:
   - `src` / `alt` of the image (put the image in `assets/images/projects/`)
   - Badge: delete `<span class="badge badge-template">Template</span>` for real projects
   - Project name, **Problem**, **Solution**, **Key technical highlights**, **technology tags**
   - Buttons:
     ```html
     <a class="btn btn-sm btn-secondary" href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">…Repository</a>
     <a class="btn btn-sm btn-ghost" href="https://your-demo-url" target="_blank" rel="noopener noreferrer">…Live Demo</a>
     ```
     (remove `data-placeholder`; delete the Live Demo button if there is no demo)
4. Delete the template cards you don't need, and the yellow **Template notice** paragraph once all projects are real.

---

## 6. Add certifications

1. Find `CERTIFICATION CARD — copy this <article> block` in `index.html`.
2. Copy the `<article class="card cert-card reveal">…</article>` block.
3. Replace `[CERTIFICATION NAME]`, `[ISSUER]`, `[DATE EARNED]`, `[CREDENTIAL ID]`.
4. Add the badge image to `assets/images/certifications/` and update the `<img src>` and `alt` (e.g. `alt="[Certification name] badge"`).
5. Set the verify button to your credential URL (e.g. Microsoft Learn or Credly):
   ```html
   <a class="btn btn-sm btn-secondary" href="https://your-verification-url" target="_blank" rel="noopener noreferrer">…Verify Credential</a>
   ```
6. Delete unused placeholder cards.

---

## 7. Update the CV

The **Download CV** button points to `assets/documents/Promise-Igbo-CV.pdf`, which is currently a one-page placeholder (`[ADD CV]`).

- **Easiest:** replace that file with your real CV using exactly the same name.
- **Different name:** put your file in `assets/documents/` and change `cvUrl` in `SITE_CONFIG` (`js/script.js`) **and** the `href` of the Download CV button in `index.html` (used if JavaScript is disabled).

> A CV on a public site is visible to everyone — consider leaving out your phone number and home address.

---

## 8. Change social links

Open `js/script.js` and edit `SITE_CONFIG`:

```js
var SITE_CONFIG = {
  email: "you@example.com",
  githubUrl: "https://github.com/your-username",
  linkedinUrl: "https://www.linkedin.com/in/your-profile",
  cvUrl: "assets/documents/Promise-Igbo-CV.pdf",
  location: "Nigeria",
  emailSubject: "Hello Promise — opportunity / collaboration"
};
```

This one change updates **every** GitHub/LinkedIn/email button (hero, contact, footer), the contact details text and the `mailto:` link. Links open in a new tab with `rel="noopener noreferrer"`.

> Optional: for visitors with JavaScript disabled, you can also replace `href="#"` on those buttons in `index.html` with the real URLs.

---

## 9. Deploy with GitHub Pages

### How GitHub Pages works
GitHub Pages serves the static files in a repository branch as a website. Because this site has no build step, GitHub simply publishes `index.html`, `css/`, `js/` and `assets/` exactly as they are. Every push to the chosen branch republishes the site automatically (usually within 1–2 minutes).

### Step 1 — Create the repository
1. Sign in to <https://github.com> → **New repository** (the **+** menu, top right).
2. Name it, for example, `portfolio`.
   - Repository named `portfolio` → site URL `https://<username>.github.io/portfolio/`
   - Repository named exactly `<username>.github.io` → site URL `https://<username>.github.io/`
3. Set it to **Public** (GitHub Pages is free for public repositories).
4. Do **not** add a README/.gitignore/licence (this project already has them) → **Create repository**.

### Step 2 — Push the files
From inside this project folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

No Git installed? On the new repository page click **uploading an existing file**, drag in **all files and folders** (including `.nojekyll`), and commit.

### Step 3 — Enable GitHub Pages
1. In the repository: **Settings → Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*.
3. **Branch:** `main`, folder **`/ (root)`** → **Save**.
4. Wait 1–2 minutes and refresh; the URL appears at the top of the Pages settings (also under the **Actions** tab you can watch the `pages build and deployment` run).

### Step 4 — After the first deploy
- Open the site and test it on desktop and mobile.
- In `index.html` `<head>`, uncomment the `canonical` and `og:url` tags and set `og:image` / `twitter:image` to **absolute** URLs, e.g. `https://<username>.github.io/portfolio/assets/images/og-image.png` (social networks require absolute image URLs).
- Every later change: edit → `git add . && git commit -m "Update projects" && git push`.

### Optional — deploy with GitHub Actions instead
If you prefer a workflow-based deployment (a nice touch for a DevOps portfolio), set **Settings → Pages → Source** to **GitHub Actions** and add `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

Use only one source: either *Deploy from a branch* **or** *GitHub Actions*.

---

## 10. Connect a custom domain later

1. Buy a domain from any registrar (e.g. `promiseigbo.com`).
2. In GitHub: **Settings → Pages → Custom domain** → enter `www.promiseigbo.com` → **Save**. GitHub creates a `CNAME` file in the repository (pull it before your next push: `git pull`).
3. At your DNS provider:
   - For `www`: a **CNAME** record `www` → `<username>.github.io`
   - For the apex domain (`promiseigbo.com`): **A** records to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (optional **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
4. Wait for DNS to propagate (minutes to 24 h), then tick **Enforce HTTPS**.
5. Recommended: verify the domain under your GitHub account **Settings → Pages → Verified domains** to prevent domain takeover.
6. Update the canonical / `og:url` / `og:image` URLs in `index.html` to the new domain.

Because all paths are relative, the site works unchanged on a custom domain.

Official docs: <https://docs.github.com/pages>

---

## 11. Placeholder checklist

Search the project for `[ADD`, `[PLACEHOLDER`, `[JOB`, `[COMPANY`, `[CERTIFICATION`, `[DEGREE` and `data-placeholder`.

- [ ] `js/script.js` → `SITE_CONFIG`: email, GitHub URL, LinkedIn URL
- [ ] `assets/documents/Promise-Igbo-CV.pdf` → your real CV
- [ ] About → personal summary; profile photo
- [ ] Projects → replace the 5 templates (text, images, repository/demo links) and remove the template notice
- [ ] Experience → roles, companies, dates, achievements
- [ ] Certifications → names, issuers, dates, credential IDs, verify links, badge images
- [ ] Education → fill in or delete the section
- [ ] Technical writing → article titles, dates, summaries, links
- [ ] `<head>` → canonical, `og:url`, absolute `og:image`/`twitter:image` after deploying

---

## Features

- Semantic HTML5 landmarks, one `h1`, logical heading order, skip link
- Keyboard-accessible navigation (Escape closes the mobile menu), visible focus styles
- Dark/light theme (respects system preference, remembers choice)
- Active section highlighting in the navigation
- Subtle scroll reveal animations that switch off for `prefers-reduced-motion`
- No external fonts, frameworks, or CDNs — fast first load
- Honest static contact section (no fake contact form)
