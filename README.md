# Levan Makharashvili — Law Office Website

Static homepage for DLG & Case (Levan Makharashvili), Tbilisi, Georgia. Plain HTML/CSS/JS,
no build step, no external dependencies.

## Files
- `index.html` — single page, tab navigation (Home, About, Practice Areas, Experience & Cases, Contact)
- `styles.css`, `script.js`
- `.github/workflows/deploy.yml` — deploys to GitHub Pages on every push to `main`

## Deploy to GitHub Pages
1. Push this repo to GitHub (`main` branch).
2. In the repo settings: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. On the next push, the `deploy.yml` workflow builds and publishes automatically.

## Custom domain — geolaw.net (Cloudflare DNS)
A `CNAME` file containing `geolaw.net` is already in this repo, so GitHub Pages will pick it up
once the site is deployed once via Actions.

1. In the repo: **Settings → Pages → Custom domain**, confirm it shows `geolaw.net`, and save.
2. In the Cloudflare dashboard for `geolaw.net`, add DNS records:
   - Four `A` records for `@` (apex) pointing to GitHub Pages' IPs: `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - A `CNAME` record for `www` pointing to `<github-username>.github.io`.
   - Set these records to **DNS only** (grey cloud, not proxied) until HTTPS is issued by GitHub;
     you can switch to proxied (orange cloud) afterward if desired.
3. Wait for DNS propagation, then enable "Enforce HTTPS" in Pages settings.

## Content notes
The "Experience & Cases" tab currently describes categories of experience only — no named
clients or case specifics. Add named case studies there only with client consent.
