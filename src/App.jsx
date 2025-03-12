import { HashRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import AddBirdPage from "./pages/AddBirdPage"
import RegisterPage from "./pages/RegisterPage"
import AddBirdSuccessPage from "./pages/AddBirdSuccessPage"
import MyListPage from "./pages/MyListPage"
import EditBirdSuccessPage from "./pages/EditBirdSuccessPage"
import EditBirdPage from "./pages/EditBirdPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

function App() {

  const apiBaseUrl = 'https://mybirdlist-be.2024-andyb.dev.io-academy.uk/api'

  return (
    <HashRouter>
      <div className="md:w-3/5 xl:w-[50%] mx-8 md:mx-auto">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/register" element={<RegisterPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/mylist" element={<MyListPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/add" element={<AddBirdPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/birds/:id" element={<EditBirdPage apiBaseUrl={apiBaseUrl} />} />
          <Route path="/bird_added" element={<AddBirdSuccessPage />} />
          <Route path="/bird_edited" element={<EditBirdSuccessPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
