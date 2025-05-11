import { Button } from '@/components/ui/button'
import Navbar from './components/navbar/Navbar'
import LandingPage from './components/pages/LandingPage'

function App() {

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <LandingPage />
    </div>
  )
}

export default App
