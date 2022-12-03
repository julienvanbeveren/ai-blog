import React, { useEffect } from 'react'
import hljs from 'highlight.js'
// import CopyIcon from '../../../assets/copy-alt.svg'

export default function BlogCode({ block }: { block: any; key: number }) {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText(block.content.text)
  }

  return (
    <pre className="bp-pre-codeblock">
      <div className="bp-codeblock-language">{block.content.language}</div>
      <img onClick={handleCopy} className="bp-codeblock-copy" alt="" />
      <code data-language={block.content.language} className={`bp-codeblock language-${block.content.language}`}>
        {block.content.text}
      </code>
    </pre>
  )
}
