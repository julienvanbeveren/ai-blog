import dotenv from 'dotenv'
dotenv.config()
import { Client } from '@notionhq/client'

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

const authorizedTypes = ['heading_1', 'heading_2', 'heading_3', 'paragraph', 'code', 'quote', 'image']

export async function getPostContent(pageId: string) {
  const pageContent = await client.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  })

  let pageData: any[] = []

  pageContent.results.forEach(section => {
    // @ts-ignore
    if (!authorizedTypes.includes(section.type)) {
      return
    }
    // @ts-ignore
    switch (section.type) {
      case 'heading_1':
        pageData = handleHeading(section, 'heading_1', pageData)
        break
      case 'heading_2':
        pageData = handleHeading(section, 'heading_2', pageData)
        break
      case 'heading_3':
        pageData = handleHeading(section, 'heading_3', pageData)
        break
      case 'paragraph':
        pageData = handleParagraph(section, pageData)
        break
      case 'code':
        pageData = handleCode(section, pageData)
        break
      case 'quote':
        pageData = handleQuote(section, pageData)
        break
      case 'image':
        pageData = handleImage(section, pageData)
    }
  })
  return pageData
}

function handleHeading(object: any, type: string, pageData: any) {
  const headingObject = {
    type: type == 'heading_1' ? 'h1' : type == 'heading_2' ? 'h2' : 'h3',
    content: object[type].rich_text[0].plain_text,
  }
  pageData.push(headingObject)
  return pageData
}

function handleParagraph(object: any, pageData: any) {
  let paragraphContent = []
  object.paragraph.rich_text.forEach((textObject: any) => {
    let tempTextObject = {
      text: textObject.plain_text,
      options: textObject.annotations,
    }
    paragraphContent.push(tempTextObject)
  })

  const paragraphObject = {
    type: 'p',
    content: handleRichText(object.paragraph.rich_text),
  }
  pageData.push(paragraphObject)
  return pageData
}

function handleCode(object: any, pageData: any) {
  const codeObject = {
    type: 'code',
    content: {
      language: object.code.language,
      text: object.code.rich_text[0].plain_text,
    },
  }
  pageData.push(codeObject)
  return pageData
}

function handleQuote(object: any, pageData: any) {
  const quoteObject = {
    type: 'quote',
    content: handleRichText(object.quote.rich_text),
  }

  pageData.push(quoteObject)

  return pageData
}

function handleRichText(richText: any[]) {
  let richTextArray: any[] = []
  richText.forEach(textObject => {
    let tempTextObject = {
      text: textObject.plain_text,
      link: textObject.href,
      options: textObject.annotations,
    }
    richTextArray.push(tempTextObject)
  })
  return richTextArray
}

function handleImage(object: any, pageData: any) {
  const imageObject = {
    type: 'image',
    content: object.image.file.url,
  }

  pageData.push(imageObject)
  return pageData
}
