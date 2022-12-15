import '../styles/globals.css'
import '../styles/tab.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '../context/CartContext'
import { AdmProvider } from '../context/admContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdmProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AdmProvider>
  )
}
