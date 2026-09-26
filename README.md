# Gollu — Candy with a big mouth

DTC candy store. React + TypeScript + Tailwind (Vite).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to /dist
```

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel (framework: Vite). `vercel.json` already rewrites all routes to `index.html` so `/products/raw-deal` etc. work on refresh.

## Routes
`/` · `/shop` (supports `?q=`, `?mood=`, `?taste=`) · `/collections/tuck-shop` · `/collections/detention` · `/products/:slug` · `/bundles` · `/our-story` · `/checkout`

## Where things live
- `src/data/products.ts` — all 9 SKUs (copy, prices, taste notes, FAQs, cross-sells)
- `src/data/bundles.ts`, `collections.ts`, `reviews.ts`, `cravings.ts`
- `src/data/config.ts` — CRO knobs: free-shipping threshold, multi-buy tiers, quick-add behaviour (toast vs drawer), homepage discovery order (product-first vs flavour-first), announcement copy
- `src/lib/pricing.ts` — cart maths (tiers apply to single pouches only)
- `src/lib/search.ts` — keyword/mood/flavour search
- `public/images/` — processed assets (webp cutouts, mascot poses, flavour crops)

## Not wired yet
Checkout is front-end only: `placeOrder` in `src/pages/Checkout.tsx` is where Shopify / Razorpay / your order backend plugs in. Newsletter form and account icon are also front-end only.
