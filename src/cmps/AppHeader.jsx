import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
        <NavLink to="/">Lobby</NavLink>
        <NavLink to="/codeblock">All Code Blocks</NavLink>
        <NavLink to="/login">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </nav>
    </header>
  )
}
