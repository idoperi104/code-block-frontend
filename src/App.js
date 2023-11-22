import "./assets/scss/global.scss"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { LobbyPage } from "./views/LobbyPage";


function App() {
  return (
    <Router>
      <section className="main-app">
        {/* <AppHeader /> */}

        <main className="main-container">
          {/* <ScrollToTop /> */}
          
          <Routes>
            <Route path="/" element={<LobbyPage />} />

          </Routes>
        </main>

      </section>
    </Router>
  );
}

export default App;
