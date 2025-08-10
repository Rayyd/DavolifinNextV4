// lib/news.ts
import { XMLParser } from 'fast-xml-parser'

export type NewsItem = {
  source: string
  title: string
  url: string
  date: string
  summary?: string
  language?: 'fr'|'nl'|'en'
}

type FeedSource = {
  source: string
  url: string
  language: 'fr'|'nl'|'en'
  enabled: boolean
}

export const SOURCES: FeedSource[] = [
  { source: 'ECB Press',     url: 'https://www.ecb.europa.eu/press/pr/date/rss.en.html', language: 'en', enabled: true },
  { source: 'SPF Finances',  url: 'https://finances.belgium.be/fr/Actualites/rss.xml',   language: 'fr', enabled: true },
  { source: "L'Echo",        url: 'https://www.lecho.be/rss/top_stories.xml',            language: 'fr', enabled: true },
]

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' })

async function fetchFeed(url: string) {
  const res = await fetch(url, {
    // Revalidation ISR — 1h
    next: { revalidate: 3600 },
    // Certains serveurs aiment avoir un UA explicite
    headers: { 'user-agent': 'DavolifinBot/1.0 (+https://davolifin.example)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  const text = await res.text()
  return parser.parse(text)
}

function normalizeItem(source: string, lang: 'fr'|'nl'|'en', raw: any): NewsItem | null {
  const t = raw.title?.['#text'] ?? raw.title ?? ''
  const link = raw.link?.href ?? raw.link ?? raw.guid ?? ''
  const pub = raw.pubDate ?? raw.published ?? raw.updated ?? ''
  const desc = (raw.description?.['#text'] ?? raw.description ?? raw.summary ?? '').toString()
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!t || !link) return null
  const iso = pub ? new Date(pub).toISOString().slice(0,10) : ''

  return { source, title: String(t), url: String(link), date: iso, summary: desc, language: lang }
}

export async function getNews(locale: 'fr'|'nl'|'en'): Promise<NewsItem[]> {
  const active = SOURCES.filter(s => s.enabled && (locale === 'en' ? true : s.language !== 'en' || locale !== 'fr' ? true : true))
  const items: NewsItem[] = []

  await Promise.all(active.map(async (s) => {
    try {
      const xml = await fetchFeed(s.url)
      // Essayer format RSS 2.0
      const rssItems = xml?.rss?.channel?.item
      // Essayer Atom
      const atomItems = xml?.feed?.entry
      const arr = Array.isArray(rssItems) ? rssItems : Array.isArray(atomItems) ? atomItems : []

      for (const it of arr.slice(0, 10)) {
        const n = normalizeItem(s.source, s.language, it)
        if (n) items.push(n)
      }
    } catch (e) {
      // on ignore ce flux si erreur et on continue
      console.warn(`[news] ${s.source} failed`, e)
    }
  }))

  // Trier par date desc
  items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  return items.slice(0, 12)
}
