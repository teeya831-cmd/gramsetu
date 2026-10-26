# GramSetu

GramSetu is a bilingual, mobile-friendly platform designed to help people discover government schemes, understand eligibility requirements and benefits, and find official information sources.

## Project Goal

Build a simple and accessible portal for Panchayat services and government scheme information.

## Planned Features

* Homepage with a clear introduction to GramSetu.
* Government scheme listings and detail pages.
* Text search and category filters.
* Hindi and English language support.
* Responsive design for mobile and desktop.
* Links to verified official sources.
* Optional voice search, after text search works reliably.

## Technology Stack

* React
* Vite
* JavaScript
* CSS
* JSON for initial sample data

Supabase may be introduced in Week 2 if the frontend is stable and a database is needed.

## Project Structure

```text
gramsetu/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── translations/
│   ├── App.jsx
│   └── main.jsx
├── docs/
├── tests/
├── index.html
├── package.json
└── vite.config.js
```

The structure may evolve as features are implemented.

## Development Plan

**Week 1:** Build and test the frontend using sample JSON data.

**Week 2:** Complete integration, improve accessibility, verify information sources, test the application, and deploy if possible.

## Important Note

GramSetu is an informational platform. Users should consult official government sources for authoritative scheme details and application procedures.
