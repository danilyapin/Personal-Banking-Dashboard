import './App.css'
import RegisterPage from "./Pages/PublicPages/RegisterPage.tsx";
import LoginPage from "./Pages/PublicPages/LoginPage.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Footer from "./Components/Footer/Footer.tsx";
import AboutUsPage from "./Pages/PublicPages/AboutUsPage.tsx";
import DashboardPage from "./Pages/PrivatePages/DashboardPage.tsx"
import AccountsPage from "./Pages/PrivatePages/AccountsPage.tsx";
import ProtectedRoute from "./Utils/ProtectedRoute.tsx";
import TransactionPage from "./Pages/PrivatePages/TransactionPage.tsx";

function App() {

  return (
      <div className="app-container">
    <BrowserRouter>
        <NavBar />
        <div className="content">
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />

            <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            }
            />
            <Route
                path="/accounts"
                element={
                    <ProtectedRoute>
                        <AccountsPage />
                    </ProtectedRoute>
            }
            />
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
        </div>
        <Footer />
    </BrowserRouter>
      </div>
  )
}

export default App
