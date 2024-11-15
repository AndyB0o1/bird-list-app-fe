import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Sightings from "./components/Sightings"
import RecentPage from "./pages/RecentPage"
import AboutPage from "./pages/AboutPage"
import AddBirdPage from "./pages/AddBirdPage"
import RegisterPage from "./pages/RegisterPage"
import AddBirdSuccessPage from "./pages/AddBirdSuccessPage"
import AddBirderSuccessPage from "./pages/AddBirderSuccessPage"
import MyListPage from "./pages/MyListPage"

function App() {

  const apiBaseUrl = 'http://localhost:8000/api'

  return (
    <BrowserRouter>
      <div className="w-1/2 mx-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<RecentPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/about" element={<AboutPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/register" element={<RegisterPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/mylist" element={<MyListPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/add" element={<AddBirdPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/bird_added" element={<AddBirdSuccessPage />} />
          <Route path="/user_added" element={<AddBirderSuccessPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
