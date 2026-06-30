# Sentry Getting-Started Tutorial — Frontend Sample

A small React + Vite app used by the [Sentry getting-started tutorial](https://docs.sentry.io/product/sentry-basics/getting-started-tutorial/). It's a fake e-commerce site with four product buttons that fetch from a companion [Express backend](https://github.com/getsentry/tracing-tutorial-backend).

You'll add the Sentry SDK to this app during the tutorial and use it to trigger a cross-project distributed trace.

## Run it

Requires **Node 18+**.

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

You'll also need the [backend](https://github.com/getsentry/tracing-tutorial-backend) running on `http://localhost:3001` for the product fetches to succeed.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Tutorial steps

Follow the [tutorial](https://docs.sentry.io/product/sentry-basics/getting-started-tutorial/) for the full flow.
