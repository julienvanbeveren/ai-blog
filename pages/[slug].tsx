import { getPost } from '../src/functions/getPost'
import { getPostBySlug } from '../src/functions/getPostBySlug'
import { getPosts } from '../src/functions/getPosts'
import * as bp from '../src/components/content-types/ContentTypes'

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map(post => {
    return {
      // @ts-ignore
      params: { slug: post.properties.Slug.rich_text[0]?.plain_text || '' },
    }
  })
  return { paths: paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostBySlug(params.slug)
  return {
    props: {
      postData: postData,
    },
    revalidate: 60,
  }
}

interface Props {
  // podcastData: {
  //   id: string
  //   data: DocumentData
  //   transcription: string
  // }
}

export default function BlogPost({ postData }: any) {
  // console.log(postData)
  return (
    <>
      <section>
        <article className="container">
          <img src={postData.cover} alt="" className="bp-image bp-cover" />
          <header className="bp-header">
            <h1>{postData.title}</h1>
            <div className="bp-info">
              {/* <div className="bp-author">
                            <div className='img' style={{ backgroundImage: `url(${currentArticle.author.profile_picture})` }} ></div>
                            <div>
                                <p className='bp-name'>{currentArticle.author.name}</p>
                                <p className='bp-muted'>{currentArticle.created} • {currentArticle.duration} min read</p>
                            </div>
                        </div> */}
              <div className="bp-tags">
                {postData.tags.map((tag: string) => {
                  return (
                    <div key={tag} className="bp-tag">
                      {tag}
                    </div>
                  )
                })}
              </div>
            </div>
          </header>
          {postData.content.map((block: any, i: number) => {
            if (['h1', 'h2', 'h3'].includes(block.type)) {
              return <bp.BlogHeading block={block} key={i} />
            } else if (block.type == 'p') {
              return <bp.BlogParagraph block={block} key={i} />
            } else if (block.type == 'code') {
              return <bp.BlogCode block={block} key={i} />
            } else if (block.type == 'image') {
              return <bp.BlogImage block={block} key={i} />
            }
          })}
        </article>
      </section>
    </>
  )
}
