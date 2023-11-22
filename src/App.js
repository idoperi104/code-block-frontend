import "./assets/scss/global.scss"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { LobbyPage } from "./views/LobbyPage"
import { CodeBlockIndex } from "./cmps/CodeBlockIndex"
import { AppHeader } from "./cmps/AppHeader"
import { CodeBlockPage } from "./views/CodeBlockPage"

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="main-container">
          {/* <ScrollToTop /> */}

          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route path="/codeblock" element={<CodeBlockIndex />} />
            <Route path="/codeblock/:id" element={<CodeBlockPage />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
