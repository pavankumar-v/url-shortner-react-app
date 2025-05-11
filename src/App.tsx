import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './components/pages/LandingPage'
import Top100Page from './components/pages/Top100Page'

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/top100" element={<Top100Page />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
