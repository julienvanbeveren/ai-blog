import '../src/styles/normalize.scss'
import '../src/styles/globals.css'
import '../src/styles/blogpost.scss'
import '../src/styles/home.scss'
import 'highlight.js/scss/a11y-dark.scss'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
