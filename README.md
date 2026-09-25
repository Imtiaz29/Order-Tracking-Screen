# Order Tracking — Mobile E-commerce UI

A responsive React + Vite implementation of a modern order-tracking experience. It demonstrates the same product UI across three important delivery states:

- **Delayed Order** — clearly surfaces the delay, new ETA, timeline, and issue-reporting action.
- **Delivered but Not Received** — explains the carrier status and provides a missing-package support action.
- **Tracking Not Available Yet** — replaces a confusing empty/loading screen with an informative preparation state and ETA.

It also includes a loading skeleton, error state, order/product summary, support entry point, responsive mobile layout, and small interaction feedback.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Deploy

This is a static Vite app and can be deployed to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Build command: `npm run build`. Output directory: `dist`.

For Vercel, connect the GitHub repository and deploy with the default Vite settings. For Netlify, use `npm run build` and publish `dist`.

## Project structure

- `index.html` — application shell
- `src/main.jsx` — UI, mock state data, timeline and interactions
- `src/styles.css` — responsive mobile-first styling

## Notes

Backend integration is intentionally not required. The demo uses static order data and a state switcher so an evaluator can inspect all required states from one deployed screen.
