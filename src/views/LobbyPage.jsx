import { useDispatch, useSelector } from "react-redux"
import { loadCodeblocks } from "../store/actions/codeblock.actions"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Loader } from "../cmps/Loader"

export function LobbyPage() {
  const codeblocks = useSelector(
    (storeState) => storeState.codeblockModule.codeblocks
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCodeblocks())
  }, [])

  if (!codeblocks) return <Loader/>
  return (
    // <section className="lobby-page main-layout">
    <section className="lobby-page">
      <h2 className="title-page">Choose code block</h2>
      <ul className="code-block-list">
        {codeblocks.map((codeblock) => (
          <li key={codeblock._id} className="code-block-preview flex">
            <NavLink className="info" to={`/codeblock/${codeblock._id}`}>
              <h3 className="title">{codeblock.title}</h3>
              <p className="question">{codeblock.question}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
