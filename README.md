# Davolifin — Next.js auto‑news (ECB, SPF, L'Echo)

## Live news (server-side, hourly)
- **ECB Press Releases (EN)**: https://www.ecb.europa.eu/press/pr/date/rss.en.html
- **SPF Finances (FR)**: https://finances.belgium.be/fr/Actualites/rss.xml
- **L'Echo top stories (FR)**: https://www.lecho.be/rss/top_stories.xml

> Configure or extend feeds in `lib/news.ts` (SOURCES array).

## Dev
```bash
npm i
npm run dev
# open http://localhost:3000/fr
```

## Deploy (Vercel)
- Import repo → Next.js auto-detected.
- Revalidation is set to 3600s via `fetch(... { next: { revalidate: 3600 } })`.

