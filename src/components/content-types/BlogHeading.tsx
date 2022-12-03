export default function BlogHeading({ block }: { block: any }) {
  if (block.type == 'h1') {
    return <h1 className="bp-heading">{block.content}</h1>
  } else if (block.type == 'h2') {
    return <h2 className="bp-heading">{block.content}</h2>
  } else if (block.type == 'h3') {
    return <h3 className="bp-heading">{block.content}</h3>
  }

  return <></>
}
