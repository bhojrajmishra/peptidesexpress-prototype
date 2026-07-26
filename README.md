# Peptides Express — Prototype

A static, self-contained demo of the Peptides Express storefront. It has **no
backend and no database** — all products, categories, blog posts, FAQs and
certificates are hard-coded in `src/**/data/*.ts` files. This makes it free to
host (Vercel's free/Hobby tier) since there's nothing to run except the
Next.js app itself.

Things that write data in the live site (checkout, contact form, newsletter
popup) are wired up to simulate a successful submission after a short delay,
instead of calling a real API. No orders, messages or emails are actually
sent. The admin panel has been removed entirely, since there is nothing for
it to manage without a database.

## What's included

- Home page, product catalog, product detail pages (real product photos),
  cart, checkout (simulated), blog, FAQs, certificates of analysis, contact
  page (simulated), legal pages
- Client-side search across products, blog posts and FAQs
- Cart persisted to `localStorage`

## What's different from the live site

- All content is static (edit the files under `src/modules/*/data/` to
  change products, categories, blog posts, FAQs)
- Checkout "places" the order locally (clears the cart, shows a confirmation
  screen with a generated discount code) but never contacts a server
- The contact form and newsletter popup simulate a successful submission
- Discount codes at checkout are checked against a fixed list in
  `src/app/checkout/page.tsx` (`WELCOME10`, `SAVE15`, `RESEARCH20`)
- No admin panel

## Running locally

Requires Node.js 18.18+ (Node 20 recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test a production build locally:

```bash
npm run build
npm run start
```

## Deploying to Vercel

No environment variables or database are required.

**Option A — via the Vercel dashboard**
1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
3. Framework preset: Next.js (auto-detected). Leave build settings as default.
4. Click **Deploy**.

**Option B — via the CLI**
```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

Every push to the repo's default branch will auto-deploy if you connect the
GitHub repo through the dashboard (Option A).

## Editing content

| Content | File |
|---|---|
| Products | `src/modules/products/data/static-products.ts` |
| Categories | `src/modules/categories/data/static-categories.ts` |
| Blog posts | `src/modules/blog/data/static-blog-posts.ts` |
| FAQs | `src/modules/home/data/static-faqs.ts` |
| Certificates of Analysis | `src/modules/certificates/data/static-certificates.ts` and `static-coa-details.ts` |
| Announcement bar messages | `src/shared/components/AnnouncementBar.tsx` |
| Newsletter popup text | `src/shared/components/PopupModal.tsx` |
| Checkout discount codes | `src/app/checkout/page.tsx` (`DISCOUNT_CODES`) |

Product images live in `public/products/`. To add a new product, drop its
image there and add an entry to `static-products.ts` referencing it.
