import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Recent from "./pages/RecentPage"
import Sightings from "./components/Sightings"
import RecentPage from "./pages/RecentPage"
import AboutPage from "./pages/AboutPage"
import AddBirdPage from "./pages/AddBirdPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  const apiBaseUrl = 'http://localhost:8000/api'

  return (
    <BrowserRouter>
      <div className="w-1/2 mx-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<RecentPage  apiBaseUrl={apiBaseUrl} />} />
          <Route path="/about" element={<AboutPage  apiBaseUrl={apiBaseUrl} />} />
          <Route path="/register" element={<RegisterPage  apiBaseUrl={apiBaseUrl} />} />
          <Route path="/add" element={<AddBirdPage  apiBaseUrl={apiBaseUrl} />} />
        </Routes>
        <Sightings apiBaseUrl={apiBaseUrl} />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
