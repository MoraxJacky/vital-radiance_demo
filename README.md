# Vital Radiance Demo

React + Vite site for the Vital Radiance product and business-plan demo.

## Local workflow

```bash
npm install
npm run dev
```

Build the production version with:

```bash
npm run build
```

## GitHub Pages

The `main` branch stores the source code. Every push to `main` runs the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`, builds the Vite app, and publishes the generated `dist` output to the `gh-pages` branch.

The live Pages URL is:

https://moraxjacky.github.io/vital-radiance_demo/
