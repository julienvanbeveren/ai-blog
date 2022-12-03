import React, { useState } from 'react'

export default function ParseText({ block }: { block: any }) {
  return (
    <>
      {block.content.map((text: any, i: number) => {
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
        if (text.link != null) {
          return (
            <a key={i} target="_blank" rel="noreferrer" className="bp-a" href={text.link}>
              <span className={classList}>{text.text}</span>
            </a>
          )
        }
        if (text.options.code) {
          return (
            <code key={i} className={classList}>
              {text.text}
            </code>
          )
        }
        return (
          <span key={i} className={classList}>
            {text.text}
          </span>
        )
      })}
    </>
  )
}
