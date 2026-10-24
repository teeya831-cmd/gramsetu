# gramsetu
A bilingual, mobile friendly platform for discovering government schemes, checking eligibility and benefits, and finding official sources.
# GramSetu

A bilingual, mobile-friendly platform for discovering government schemes, understanding eligibility and benefits, and visiting official sources.

## Week 1 goal

Build a React + Vite frontend MVP using sample JSON data. It should include a homepage, scheme listings and details, text search, category filters, a Hindi-English switch, responsive layouts, and verified official source links.

Voice search is optional and comes after text search works. Supabase is a Week 2 option only after the frontend is stable.

## Planned project structure

Keep the Vite app at the repository root. Add these files as the team builds each feature.

```text
gramsetu/
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- CategoryFilter.jsx
|   |   |-- LanguageToggle.jsx
|   |   |-- SchemeCard.jsx
|   |   `-- SearchBar.jsx
|   |-- data/
|   |   `-- schemes.json
|   |-- hooks/
|   |   `-- useSchemeFilters.js
|   |-- i18n/
|   |   `-- translations.js
|   |-- pages/
|   |   |-- HomePage.jsx
|   |   `-- SchemeDetailsPage.jsx
|   |-- styles/
|   |   `-- global.css
|   |-- App.jsx
|   `-- main.jsx
|-- .gitignore
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

## Team responsibilities

- **Member 1 — Teeya:** Lead the project, coordinate integration, and maintain the app shell and navigation.
- **Member 2:** Prepare sample scheme data with official links; build scheme cards and detail views.
- **Member 3:** Build text search and category filters.
- **Member 4:** Build the Hindi-English switch, refine responsive layouts, and check source links.

Coordinate before changing shared files. Keep scheme details linked to official sources.

## Run locally

Once the Vite starter files are in the repo:

```bash
npm install
npm run dev
```

Before opening a pull request, create a production build:

```bash
npm run build
```

Vite's production build goes into `dist/`. See the [Vite guide](https://vite.dev/guide/).

## Commit and review workflow

1. Keep `main` ready to deploy. Do not commit directly to `main`.
2. Create a branch for one task from the latest `main`. Examples: `feat/scheme-search`, `feat/hindi-toggle`, `fix/mobile-layout`.
3. Make focused commits with clear messages, such as `feat: add scheme search` or `fix: improve mobile layout`.
4. Push your branch to this repository and open a pull request into `main`.
5. Ask a teammate to review the changes and check the preview deployment.
6. Merge after review, then delete the branch.

This follows [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow).

## Deploy

Use Vercel for the frontend:

1. Import this GitHub repository into Vercel.
2. Use the Vite settings: build command `npm run build`, output directory `dist`.
3. Set `main` as the production branch.
4. Check the preview link for a pull request before merging. Merging to `main` updates the production deployment.

See [Vercel Git deployments](https://vercel.com/docs/git).

## Keep secrets out of Git

Do not commit passwords, tokens, or private keys. If Supabase is added in Week 2, keep real local values in `.env.local` and commit only a placeholder `.env.example`.
