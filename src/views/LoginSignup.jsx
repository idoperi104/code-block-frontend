import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUsers, login, logout, signup } from "../store/actions/user.actions"
import { useForm } from "../customHooks/useForm"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"

export function LoginSignup() {
  const [isDisplayLogin, setIsDisplayLogin] = useState(true)

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginCred, handleChangeLogin, setLoginCred] = useForm(
    userService.getEmptyLoginCred()
  )
  const [signupCred, handleChangeSignup, setSignupCred] = useForm(
    userService.getEmptySignupCred()
  )

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  useEffect(() => {
    setLoginCred({ ...userService.getEmptyLoginCred() })
    setSignupCred({ ...userService.getEmptySignupCred() })
  }, [loggedinUser])

  async function onLogin(ev) {
    ev.preventDefault()
    if (!loginCred.username || !loginCred.password) return
    try {
      dispatch(login({ ...loginCred }))
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  async function onSignUp(ev) {
    ev.preventDefault()
    if (!signupCred.username || !signupCred.password || !signupCred.fullname)
      return
    try {
      dispatch(signup({ ...signupCred }))
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  async function onLogout() {
    try {
      dispatch(logout())
    } catch (err) {
      console.error(err)
    }
  }

  function toogleIsDisplayLogin() {
    setIsDisplayLogin((prevIsDisplayLogin) => !prevIsDisplayLogin)
  }

  function onDemoLogin() {
    dispatch(login({ username: "ido", password: "ido" }))
    navigate("/codeblock")
  }

  return loggedinUser ? (
    <section className="login-signup">
      <h2 className="title">Hello {loggedinUser.fullname}</h2>
      <button className="btn-demo" onClick={onLogout}>
        Logout
      </button>
    </section>
  ) : (
    <section className="login-signup">
      {isDisplayLogin ? (
        <form onSubmit={onLogin} className="basic-form">
          <h3 className="title">Login</h3>
          <label htmlFor="username">Username:</label>
          <input
            value={loginCred.username}
            onChange={handleChangeLogin}
            type="text"
            name="username"
            id="usernameLogin"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={loginCred.password}
            onChange={handleChangeLogin}
            type="password"
            name="password"
            id="passwordLogin"
          />
          <button className="btn-submit">Login</button>
        </form>
      ) : (
        <form onSubmit={onSignUp} className="basic-form">
          <h3 className="title">Signup</h3>
          <label htmlFor="fullname">Full name:</label>
          <input
            value={signupCred.fullname}
            onChange={handleChangeSignup}
            type="text"
            name="fullname"
            id="fullnameSignup"
          />
          <label htmlFor="username">Username:</label>
          <input
            value={signupCred.username}
            onChange={handleChangeSignup}
            type="text"
            name="username"
            id="usernameSignup"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={signupCred.password}
            onChange={handleChangeSignup}
            type="password"
            name="password"
            id="passwordSignup"
          />
          <button className="btn-submit">Signup</button>
        </form>
      )}

      <div>
        <button className="btn-demo" onClick={onDemoLogin}>
          Demo teacher login
        </button>

        <button className="btn-full" onClick={toogleIsDisplayLogin}>
          {isDisplayLogin ? "New user? Signup" : "existing user? Login"}
        </button>
      </div>
    </section>
  )
}
