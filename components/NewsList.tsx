import { getNews } from '@/lib/news'

export default async function NewsList({ locale }:{ locale: 'fr'|'nl'|'en' }) {
  const news = await getNews()
  return (
    <section id="news" className="py-16 border-t">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold">Actualités & Alerts</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n, i)=>(
            <article key={i} className="rounded-2xl border p-5">
              <div className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()} • {n.source}</div>
              <a href={n.url} target="_blank" className="block mt-2 font-semibold hover:underline">{n.title}</a>
              {n.summary && <p className="mt-2 text-sm text-gray-600">{n.summary}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
