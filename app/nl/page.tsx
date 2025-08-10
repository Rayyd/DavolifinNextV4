import NewsList from '@/components/NewsList'

export default function Page(){
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-extrabold">Davolifin</h1>
          <p className="mt-3 text-gray-600">Cabinet comptable & fiscal — Nivelles, Belgique</p>
        </div>
      </section>
      <NewsList locale="nl"/>
    </main>
  )
}
