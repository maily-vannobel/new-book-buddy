import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logobook from "../assets/logobook.png";
import Autocompletion from "./Autocompletion";
import Footer from "./Footer";

function Nav() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, [navigate]);

    const fetchUser = async token => {
        try {
            const response = await fetch("http://localhost:3000/api/userInfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error("Failed to fetch user data");
                localStorage.removeItem("token"); // Optionally remove the token if fetching user fails
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/"); // Optionally redirect the user after logout
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light`}>
                <Link className="navbar-brand" to="/">
                    <img
                        src={logobook}
                        alt="Book Buddy Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Book Buddy
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/collections">
                                Collections
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profil">
                                        Bonjour {user.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link"
                                        onClick={handleLogout}
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Connexion
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Inscription
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Autocompletion />
            </nav>
            <Footer user={user} handleLogout={handleLogout} />
        </>
    );
}

export default Nav;
