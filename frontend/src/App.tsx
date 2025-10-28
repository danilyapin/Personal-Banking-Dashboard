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
import TransactionPageOfOneAccount from "./Pages/PrivatePages/TransactionPageOfOneAccount.tsx";
import CategoriesPage from "./Pages/PrivatePages/CategoriesPage.tsx";
import ImpressumPage from "./Pages/PublicPages/ImpressumPage.tsx";
import AuthWatcher from "./Utils/AuthWatcher.tsx";
import GettingStartedPage from "./Pages/PublicPages/GettingStartedPage.tsx";

function App() {

  return (
      <div className="app-container">
    <BrowserRouter>
        <AuthWatcher />
        <NavBar />
        <div className="content">
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
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
                </ProtectedRoute>}
            >
            </Route>
            <Route
                path="/accounts/:accountId/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionPageOfOneAccount />
                    </ProtectedRoute>}
            >
            </Route>
            <Route
                path="/categories"
                element={
                    <ProtectedRoute>
                        <CategoriesPage />
                    </ProtectedRoute>}
            >
            </Route>
        </Routes>
        </div>
        <Footer />
    </BrowserRouter>
      </div>
  )
}

export default App
