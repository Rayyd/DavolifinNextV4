import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Davolifin — Accounting & Tax',
  description: 'Davolifin — Cabinet comptable & fiscal (Nivelles, Belgique)',
}

export default function Layout({ children }:{ children: React.ReactNode }){
  return <html lang="en"><body><Header locale="en"/>{children}<Footer/></body></html>
}
