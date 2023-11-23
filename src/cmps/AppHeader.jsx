import {
  faChalkboardUser,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

export function AppHeader() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

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
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        {loggedinUser?.isAdmin && (
          <NavLink to="/codeblock">
            <FontAwesomeIcon icon={faChalkboardUser} />
          </NavLink>
        )}
        <NavLink to="/login">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </nav>
    </header>
  )
}
