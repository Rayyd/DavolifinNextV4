import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Davolifin — Cabinet comptable & fiscal',
  description: 'Davolifin — Cabinet comptable & fiscal (Nivelles, Belgique)',
}

export default function Layout({ children }:{ children: React.ReactNode }){
  return <html lang="fr"><body><Header locale="fr"/>{children}<Footer/></body></html>
}
