export default function BlogImage({ block }: { block: any }) {
  return <img src={block.content} alt="" className="bp-image" />
}
