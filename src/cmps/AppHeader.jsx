import { NavLink, useNavigate } from "react-router-dom"

export function AppHeader() {
  const navigate = useNavigate()

  function onLogoClicked() {
    navigate("/")
  }

  return (
    <header className="app-header">
      <h1 onClick={onLogoClicked} className="logo">
        CodeBlock
      </h1>

      <nav className={`nav-container`}>
        <NavLink to="/">
          Lobby
        </NavLink>
        <NavLink to="/codeblock">
          All Code Blocks
        </NavLink>
      </nav>
    </header>
  )
}
