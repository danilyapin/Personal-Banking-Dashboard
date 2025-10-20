import './App.css'
import RegisterPage from "./Pages/RegisterPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import NavBar from "./Components/NavBar.tsx";
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Footer from "./Components/Footer.tsx";

function App() {

  return (
      <div className="app-container">
    <BrowserRouter>
        <NavBar />
        <div className="content">
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
        </div>
        <Footer />
    </BrowserRouter>
      </div>
  )
}

export default App
