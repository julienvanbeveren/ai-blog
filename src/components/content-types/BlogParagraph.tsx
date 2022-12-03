import React, { useState } from 'react'
import ParseText from './ParseText'

export default function BlogParagraph({ block }: { block: any; key: number }) {
  return (
    <p className="bp-paragraph bp-regular-text">
      <ParseText block={block} />
      {/* {block.content.map((text: any, i: number) => {
                let classList = ''
                if (text.options.bold) {
                    classList = classList + ' bold'
                }
                if (text.options.italic) {
                    classList = classList + ' italic'
                }
                if (text.options.strikethrough) {
                    classList = classList + ' strikethrough'
                }
                if (text.options.underline) {
                    classList = classList + ' underline'
                }
                if (text.options.code) {
                    classList = classList + ' code'
                }
                return <span key={i} className={classList}>{text.text}</span>
            })} */}
    </p>
  )
}
