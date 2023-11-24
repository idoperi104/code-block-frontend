import { useDispatch, useSelector } from "react-redux"
import { loadCodeblocks } from "../store/actions/codeblock.actions"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Loader } from "../cmps/Loader"
import heroImg from "../assets/imgs/hero.jpeg"


export function LobbyPage() {
  const codeblocks = useSelector(
    (storeState) => storeState.codeblockModule.codeblocks
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCodeblocks())
  }, [])

  function getStyle() {
    return {
      backgroundImage: `url(${heroImg})`,
    }
  }

  if (!codeblocks) return <Loader/>
  return (
    <section className="lobby-page full main-layout">
      <div className="hero-container full" style={getStyle()}>
        <div className="cover"></div>
        <div className="content">
          <h3 className="sub-title">welcome to</h3>
          <h2 className="title">CODE BLOCK</h2>
        </div>
      </div>

      <h2 className="title-page">Choose Code Block:</h2>
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
