import { memo } from "react"
import { CodeBlockPreview } from "./CodeBlockPreview"

function _CodeBlockList({ codeblocks, onRemoveCodeblock }) {
  return (
    <ul className={`code-block-list`}>
      {codeblocks.map((codeblock) => (
        <CodeBlockPreview key={codeblock._id} codeblock={codeblock} onRemoveCodeblock={onRemoveCodeblock} />
      ))}
    </ul>
  )
}

export const CodeBlockList = memo(_CodeBlockList)
