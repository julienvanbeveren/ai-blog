import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <link rel="icon" href="/assets/favicon.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M4L85X2ST8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7HQ0MCGH9PG-M4L85X2ST8');
          `,
          }}
        ></script>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
