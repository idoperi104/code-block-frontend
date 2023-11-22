import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadCodeblocks,
  removeCodeblock,
} from "../store/actions/codeblock.actions"
import { CodeBlockList } from "./CodeBlockList"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

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
    // <section className="code-block-index main-layout">
    <section className="code-block-index">
      <Link to="/codeblock/edit" className="link-add">
        <button className="btn-add">
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Add a new code block</span>
        </button>
      </Link>
      <CodeBlockList
        codeblocks={codeblocks}
        onRemoveCodeblock={onRemoveCodeblock}
      />
    </section>
  )
}
