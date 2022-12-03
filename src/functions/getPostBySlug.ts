import dotenv from 'dotenv'
dotenv.config()
import { Client } from '@notionhq/client'
import { getPost } from './getPost'
const databaseId = process.env.DATABASE_ID || ''

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export async function getPostBySlug(slug: string) {
  const database = await client.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  })
  const postId = database.results?.[0]?.id
  const postData = await getPost(postId)
  return postData
}
