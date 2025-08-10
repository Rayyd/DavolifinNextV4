import { XMLParser } from 'fast-xml-parser'

export type NewsItem = {
  source: string
  title: string
  url: string
  date: string
  summary?: string
  language?: 'fr'|'nl'|'en'
  tags?: string[]
}

type FeedSource = { source: string; url: string; language: 'fr'|'nl'|'en'|'en+fr'; enabled: boolean }

export const SOURCES: FeedSource[] = [
  { source: 'ECB Press', url: 'https://www.ecb.europa.eu/press/pr/date/rss.en.html', language: 'en', enabled: true },
  { source: 'SPF Finances', url: 'https://finances.belgium.be/fr/Actualites/rss.xml', language: 'fr', enabled: true },
  { source: 'L\'Echo', url: 'https://www.lecho.be/rss/top_stories.xml', language: 'fr', enabled: true },
]

export async function getNews({ maxPerSource = 5 } = {}): Promise<NewsItem[]>{
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' })
  const results: NewsItem[] = []

  await Promise.all(SOURCES.filter(s=>s.enabled).map(async (s) => {
    try {
      const r = await fetch(s.url, { next: { revalidate: 3600 } })
      const xml = await r.text()
      const j = parser.parse(xml)
      const channel = j.rss?.channel || j.feed
      const items = (channel?.item || channel?.entry || []).slice(0, maxPerSource)
      for (const it of items) {
        const title = it.title?.['#text'] || it.title || 'Sans titre'
        const link = it.link?.href || it.link || it.guid || it.id || ''
        const url = typeof link === 'string' ? link : (link[0]?.href || '')
        const pubDate = it.pubDate || it.published || it.updated || ''
        const desc = (it.description?.['#text'] || it.description || it.summary || '').toString().replace(/<[^>]+>/g,'').slice(0,280)
        results.push({ source: s.source, title, url, date: pubDate, summary: desc, language: s.language as any })
      }
    } catch (e) {
      // ignore
    }
  }))

  results.sort((a,b)=> (new Date(b.date).getTime()||0) - (new Date(a.date).getTime()||0))
  return results.slice(0, 12)
}
