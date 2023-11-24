import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadCodeblocks,
  removeCodeblock,
} from "../store/actions/codeblock.actions"
import { CodeBlockList } from "./CodeBlockList"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Loader } from "./Loader"

export function CodeBlockIndex() {
  const codeblocks = useSelector(
    (storeState) => storeState.codeblockModule.codeblocks
  )

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadCodeblocks())
  }, [])

  const onRemoveCodeblock = useCallback(async (codeblockId) => {
    dispatch(removeCodeblock(codeblockId))
  }, [])

  if (!codeblocks) return <Loader/>
  if (!loggedinUser?.isAdmin) return <Loader/>
  return (
    <section className="code-block-index">
      <h2 className="title">Teachers Room</h2>
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
