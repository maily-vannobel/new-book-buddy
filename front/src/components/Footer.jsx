import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Footer() {
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
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <ul className="nav justify-content-center">
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
                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Inscription
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
