import React, { useState } from "react";
import { login } from "../services/usersFetch";
import { useNavigate } from "react-router-dom";
import "../css/loginRegister.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login(username, password);
            if (response.ok) {
                const data = response.data;
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(
                    `Erreur lors de la connexion: ${response.data.message}`
                );
            }
        } catch (error) {
            setError(`Erreur lors de la connexion: ${error.message}`);
            console.error("Erreur lors de la connexion:", error);
        }
    };

    return (
        <>
            <div className="bookForm-center-div">
                <div className="bookForm-wrapper">
                    <form onSubmit={handleLogin} className="bookForm-form">
                        <h2 className="bookForm-h2">Connexion</h2>
                        {error && <p className="bookForm-error">{error}</p>}
                        <div className="bookForm-input-field">
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <label>Nom d'utilisateur</label>
                        </div>
                        <div className="bookForm-input-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label>Mot de passe</label>
                        </div>
                        <div className="bookForm-show-password">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label>Afficher le mot de passe</label>
                        </div>
                        <button type="submit" className="bookForm-button">Se connecter</button>
                        <div className="bookForm-login">
                            <p>
                                Vous n'avez pas de compte?<br></br>
                                <a href="http://localhost:3001/register">
                                    Créer un compte !
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
