// components/NewsList.tsx
import { getNews } from '@/lib/news'

export default async function NewsList({ locale }: { locale: 'fr'|'nl'|'en' }) {
  const news = await getNews(locale)

  if (!news.length) {
    return (
      <section className="py-16 border-t">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold">Actualités & Alerts</h2>
          <p className="mt-3 text-sm text-gray-600">Aucune actualité disponible pour le moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 border-t">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold">Actualités & Alerts</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <article key={i} className="rounded-2xl border p-5 bg-white">
              <div className="text-xs text-gray-500">{n.source} • {n.date || '—'}</div>
              <a href={n.url} target="_blank" className="mt-2 block font-semibold hover:underline">{n.title}</a>
              {n.summary ? <p className="mt-2 text-sm text-gray-600 line-clamp-4">{n.summary}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
