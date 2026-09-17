# YOUR CACAO — static storefront

A responsive, original cacao product website inspired by modern cacao / craft food storefronts.

## What is included
- Responsive single-page storefront
- Product variants (150g / 300g / 500g)
- Quantity selector
- Demo cart drawer and subtotal
- Brand story, product details, preparation ritual, newsletter, footer
- Local SVG product artwork
- No build step and no framework required

## Run locally
Option 1: double-click `index.html`.

Option 2 (recommended):
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Customize before launch
Search the project for `YOUR CACAO` and replace it with your real brand name.

Also edit:
- Product title and description in `index.html`
- Product prices in the `data-price` attributes in `index.html`
- Currency in `script.js` (`currency: 'EUR'`)
- Email address / social links / policy links in `index.html`
- Ingredient, origin, storage, shelf-life, and claims so they match your actual product
- `assets/product-pack.svg` with your real packshot when available

## Important: checkout is currently a demo
The cart works in the browser, but payment is not connected. For a real shop, connect a commerce platform such as Shopify, WooCommerce, Snipcart, Stripe Payment Links, or a custom Stripe Checkout backend.

## Deploy
This is a plain static site. It works on GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any static host.
