# ZCZR — insulated drinkware B2B demo

A static, company-focused website demo for **Wuxi Zhenchuang Zhuorui International Trade Co., Ltd. (ZCZR)**.

The site is intentionally focused on **one product category: insulated stainless-steel drinkware** — tumblers, bottles, jugs, kettles and coffee cups. The current demo imports **25 representative models** from the supplied 60-slide catalogue; the remaining models can be added with the same data structure. Ceramics, machinery, electronics and other products from the supplied folder are deliberately excluded.

The homepage leads with the company profile, factory access and OEM/ODM capabilities, then presents the drinkware range. The buying flow is quote-based rather than retail checkout.

## Stack

- **Astro 7** — static HTML output, no runtime server
- **Custom CSS** with design tokens and local WOFF2 fonts
- **Inline SVG product renders** — replace with real product photography when available
- **Vanilla JS** for filters, color/capacity switching, search, menu and demo forms
- **Nginx** config and an rsync deploy script in `deploy/`
- No database. No CMS. No video storage on the server.

## Run locally

```bash
npm install
npm run dev
# http://localhost:4321
```

Production build:

```bash
npm run build
npm run preview
# http://localhost:4321
```

The generated static site is in `dist/`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Company-first homepage: hero, credentials, company profile, drinkware range, capabilities, process, QC, core model, FAQ, quote CTA |
| `/collections/` | Filterable reference range |
| `/products/40oz-handled-tumbler/` | Product detail template (25 catalogue models generated) |
| `/technology/` | Construction, working process, quality control, comparison and FAQ |
| `/about/` | Company profile, facts and operating principles |
| `/resources/` | Three B2B buyer guides |
| `/contact/` | B2B inquiry form, company details and FAQ |
| `/404.html` | Not-found page |

## Content editing

- Products, capacities, colors and specifications: `src/data/products.ts`
- Buyer guides: `src/data/resources.ts`
- Navigation: `src/components/Header.astro`
- Footer and company contact placeholders: `src/components/Footer.astro`
- Homepage sections: `src/pages/index.astro`
- Company page: `src/pages/about.astro`
- Contact form: `src/pages/contact.astro`
- Global design tokens and layout: `src/styles/global.css`

## Product catalogue imported from the PPT

- Source: `产品目录esp.pptx` (60 slides)
- Current site: 25 representative models across five categories
- Images: exported from the PPT to `public/products/` as WebP, used as temporary product photography
- Specifications: reference dimensions, material, weight, packing quantity and carton size from each slide
- Color names: translated from the Spanish catalogue fields into short English labels

## Company facts used

The following facts come from the supplied company text/FAQ and are used in the site:

- Legal name: Wuxi Zhenchuang Zhuorui International Trade Co., Ltd.
- Chinese name: 无锡臻创卓锐国际贸易有限公司
- Head office: Wuxi, Jiangsu, China
- Factory: Yixing, Jiangsu
- Business model: manufacturing and trading company integrating production, sales and export
- Customization: OEM accepted
- Samples: available; sample cost and freight confirmed
- Payments: T/T, Alibaba Trade Assurance
- Packing: shock-resistant packing and cartons; wooden crates or pallets for larger programs
- Quality: inspections at every stage of the supply chain

Product images, model names, dimensions, weights and packing quantities are extracted from the supplied `产品目录esp.pptx`. They are reference values and must be confirmed on the approved sample. The demo imports 25 representative models from the 60-slide catalogue.

## Important security note

The supplied `详情页素材/（必填）公司资料.docx` contains an Alibaba International Station account name and a plain-text password. It should be removed from shared folders, excluded from any repository, and the password should be rotated. No credentials from that document were copied into this project.

A `.gitignore` entry excludes the entire `公司资料/` folder from Git. Check any backup or file-sharing tool as well.

## Free hosting: Cloudflare Pages

This repository is configured for **Cloudflare Pages** at the site root. No `base` path changes are needed.

### Option A — Git integration (recommended)

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select `Imladris/zczr-drinkware-site`.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: **`npm run build`**
   - Build output directory: **`dist`**
   - Node version: **22** (also pinned in `.nvmrc`)
4. Deploy. The project name in `wrangler.toml` is `zczr-drinkware-site`.

The expected URL is:

```text
https://zczr-drinkware-site.pages.dev
```

### Option B — Direct upload from this machine

```bash
npx wrangler login
npm run deploy:cloudflare
```

`public/_headers` is copied into `dist/_headers` at build time and controls caching and baseline security headers on Cloudflare Pages.

### Custom domain

In Cloudflare Pages → project → Custom domains, add your domain and follow the DNS instructions. HTTPS is issued automatically.

---

## Deployment (Plan B: VPS + Nginx)

### 1. Server baseline

A 2 vCPU / 2 GB RAM / 40 GB NVMe VPS with Debian 12 or Ubuntu 24.04 is plenty. A 1 vCPU / 1 GB server can also serve the static site.

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync
sudo mkdir -p /var/www/zczr/current
sudo chown -R "$USER":www-data /var/www/zczr
```

### 2. Nginx

Copy `deploy/nginx.conf` to `/etc/nginx/sites-available/zczr`, replace `zczr.example.com`, enable it, and test:

```bash
sudo ln -s /etc/nginx/sites-available/zczr /etc/nginx/sites-enabled/zczr
sudo nginx -t
sudo systemctl reload nginx
```

Point your DNS `A`/`AAAA` records at the VPS, then issue TLS:

```bash
sudo certbot --nginx -d zczr.example.com -d www.zczr.example.com
```

### 3. Deploy

```bash
VPS_HOST=203.0.113.42 VPS_USER=deploy ./deploy/deploy.sh
```

The script runs `npm ci`, `npm run build`, rsyncs `dist/` to `/var/www/zczr/current`, and reloads Nginx. The `--delete` flag is intentional: point `VPS_PATH` at a dedicated site directory, never at `/var/www` itself.

## Before a real launch

- Replace the placeholder email `sales@zczr.example` and confirm the inquiry routing.
- Replace the demo SVG product renders with real product photography.
- Confirm every specification and performance claim against an approved sample.
- Add real privacy, terms, accessibility, warranty and shipping pages as required.
- Add a factory tour or product film through the existing YouTube facade pattern if you want video on the site. The current build does not use unrelated stock footage as a stand-in for a factory video.
- Replace Unsplash photography with owned/licensed assets if required.
- Connect the contact/newsletter forms to a real endpoint (Formspree, Cloudflare Worker + Resend, or your CRM). The current forms only show a success message.
- Update `astro.config.mjs` and `public/robots.txt` with the real domain.
- Add analytics and a consent banner if required for your market.
