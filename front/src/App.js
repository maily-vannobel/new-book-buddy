import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Accueil from "./pages/Accueil";
import Collections from "./pages/Collections";
import Profil from "./pages/Profil";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SettingsAccountModal from "./components/modal/SettingsAccountModal";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/header-footer.css";

function App() {
    return (
        <Router>
            <Nav />
            <main>
                <Routes>
                    <Route exact path="/" element={<Accueil />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />

                        <Route path="/updatePassword"
                            element={<SettingsAccountModal />}
                        />

                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;

