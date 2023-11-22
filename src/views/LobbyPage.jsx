import { useDispatch, useSelector } from "react-redux"
import { loadCodeblocks } from "../store/actions/codeblock.actions"
import { useEffect } from "react"

export function LobbyPage() {
  const codeblocks = useSelector(
    (storeState) => storeState.codeblockModule.codeblocks
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCodeblocks())
  }, [])

  if (!codeblocks) return <div>Loading...</div>
  return (
    <section className="lobby-page main-layout">
      <ul className={`code-block-list`}>
        {codeblocks.map((codeblock) => (
          <li key={codeblock._id} className="lobby-code-block-preview">
            {codeblock.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
