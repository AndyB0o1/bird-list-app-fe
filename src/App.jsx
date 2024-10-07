import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Recent from "./components/Recent"
import Sightings from "./components/Sightings"

function App() {
  
  return (
    <div className="w-1/2 mx-auto">
      <Nav />
      <Recent />
      <Sightings />
      <Footer />
    </div>
  )
}

export default App
