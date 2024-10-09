import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Recent from "./pages/RecentPage"
import Sightings from "./components/Sightings"
import RecentPage from "./pages/RecentPage"
import AboutPage from "./pages/AboutPage"
import AddBirdPage from "./pages/AddBirdPage"

function App() {

  return (
    <BrowserRouter>
      <div className="w-1/2 mx-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<RecentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add" element={<AddBirdPage />} />
        </Routes>
        <Sightings />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
