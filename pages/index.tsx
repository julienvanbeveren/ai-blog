import { getPosts } from '../src/functions/getPosts'

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts: posts,
    },
  }
}

export default function Home({ posts }: any) {
  return (
    <section>
      <h1>Julien Van Beveren{"'"}s Blog </h1>
    </section>
  )
}
