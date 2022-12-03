import dotenv from 'dotenv'
dotenv.config()
import { Client } from '@notionhq/client'
const databaseId = process.env.DATABASE_ID || ''

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export async function getPosts() {
  const database = await client.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Created',
        direction: 'descending',
      },
    ],
  })
  return database.results
}
