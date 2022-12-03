import { getPosts } from '../src/functions/getPosts'

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map(post => {
         return `
       <url>
           <loc>https://blog.julienvanbeveren.com/${post.properties.Slug.rich_text[0]?.plain_text || ''}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

export default function SiteMap() {}

export async function getServerSideProps({ res }: any) {
  const posts = await getPosts()

  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
