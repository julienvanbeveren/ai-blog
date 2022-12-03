import { getPosts } from '../src/functions/getPosts'
import BlogCard from '../src/components/BlogCard'

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts: posts,
    },
    revalidate: 60,
  }
}

export default function Home({ posts }: any) {
  return (
    <>
      <section>
        <div style={{ alignItems: 'center' }} className="container">
          <h1>Julien Van Beveren{"'"}s Blog </h1>
        </div>
      </section>
      <section>
        <div className="container cards-wrapper">
          {posts.map((post: any) => {
            return <BlogCard key={post.id} data={post}></BlogCard>
          })}
        </div>
      </section>
    </>
  )
}
