import '../src/styles/normalize.scss'
import '../src/styles/index.scss'
import '../src/styles/blogpost.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
