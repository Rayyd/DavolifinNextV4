import Link from 'next/link'

export default function Header({ locale }: { locale: 'fr'|'nl'|'en' }){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-semibold">Davolifin</Link>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#news" className="hover:text-gray-600">Actualités</a>
          <Link href={`/${locale}/resources`} className="hover:text-gray-600">Ressources</Link>
        </nav>
      </div>
    </header>
  )
}
