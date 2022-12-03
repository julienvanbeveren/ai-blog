import Link from 'next/link'
import React from 'react'
import Jate from 'jates'
import { motion } from 'framer-motion'

export default function BlogCard({ data }: any) {
  console.log(data)
  return (
    <Link href={`/${data.properties.Slug.rich_text[0]?.plain_text}`}>
      <div className="blog-card">
        <img src={data.cover?.[data.cover?.type]?.url} alt="" />
        <div className="content">
          <h3>{data.properties.Title.title?.[0].plain_text}</h3>
          <p>{new Jate(data.last_edited_time).format('dd/MM/yy')}</p>
        </div>
      </div>
    </Link>
  )
}
