import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Davolifin — Boekhoudkantoor',
  description: 'Davolifin — Cabinet comptable & fiscal (Nivelles, Belgique)',
}

export default function Layout({ children }:{ children: React.ReactNode }){
  return <html lang="nl"><body><Header locale="nl"/>{children}<Footer/></body></html>
}
