import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadCodeblocks,
  removeCodeblock,
} from "../store/actions/codeblock.actions"
import { CodeBlockList } from "./CodeBlockList"

export function CodeBlockIndex() {
  const codeblocks = useSelector(
    (storeState) => storeState.codeblockModule.codeblocks
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCodeblocks())
  }, [])

  const onRemoveCodeblock = useCallback(async (codeblockId) => {
    dispatch(removeCodeblock(codeblockId))
  }, [])

  if (!codeblocks) return <div>Loading...</div>
  return (
    <section className="code-block-index">
      <CodeBlockList codeblocks={codeblocks} onRemoveCodeblock={onRemoveCodeblock} />
    </section>
  )
}
