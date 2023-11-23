import "./assets/scss/global.scss"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { LobbyPage } from "./views/LobbyPage"
import { CodeBlockIndex } from "./cmps/CodeBlockIndex"
import { AppHeader } from "./cmps/AppHeader"
import { CodeBlockPage } from "./views/CodeBlockPage"
import { CodeBlockEdit } from "./views/CodeBlockEdit"
import { LoginSignup } from "./views/LoginSignup"
import { useDispatch } from "react-redux"
import { loadLoggedinUser } from "./store/actions/user.actions"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadLoggedinUser())
    window.addEventListener("resize", appHeight)
    appHeight()
    return () => {}
  }, [])

  function appHeight() {
    // for mobile current height
    const doc = document.documentElement
    doc.style.setProperty("--app-height", `${window.innerHeight}px`)
  }

  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="main-container main-layout">
          {/* <ScrollToTop /> */}

          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/codeblock" element={<CodeBlockIndex />} />
            <Route path="/codeblock/:id" element={<CodeBlockPage />} />
            <Route path="/codeblock/edit/:id?" element={<CodeBlockEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
