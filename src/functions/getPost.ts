import dotenv from 'dotenv'
dotenv.config()
import { Client } from '@notionhq/client'
import { getPostContent } from './getPostContent'

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export async function getPost(pageId: string) {
  const page = await client.pages.retrieve({ page_id: pageId })

  const pageObject = {
    id: page.id,
    // @ts-ignore
    slug: page.properties.Slug.rich_text[0]?.plain_text || '',
    // @ts-ignore
    title: page.properties.Title.title[0]?.plain_text || '',
    // @ts-ignore
    created: page.properties.Created.created_time.substring(0, 10) || '',
    // @ts-ignore
    duration: page.properties.Duration?.number || 0,
    // @ts-ignore
    author: {
      // @ts-ignore
      name: page.properties.Author.people[0]?.name || '',
      // @ts-ignore
      profile_picture: page.properties.Author.people[0]?.avatar_url || '',
    },
    // @ts-ignore
    tags: page.properties.Tags.multi_select.map(tag => {
      return tag?.name || ''
    }),
    // @ts-ignore
    collection: page.properties.Collection.select?.name || '',
    // @ts-ignore
    cover: page.cover?.[page?.cover?.type]?.url || '',
    content: (await getPostContent(page.id)) || [],
  }

  return pageObject
}
