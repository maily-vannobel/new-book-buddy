import React, { useState } from "react";
import { updatePassword } from "../services/usersFetch";
import { useNavigate } from "react-router-dom";

function SettingsAccount() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUpdatePassword = async e => {
        e.preventDefault();

        try {
            await updatePassword(oldPassword, newPassword);
            navigate("/profile");
        } catch (err) {
            setError("Erreur lors de la mise à jour du mot de passe.");
        }
    };

    return (
        <div className="center-div">
            <div className="wrapper">
                <form onSubmit={handleUpdatePassword}>
                    <h2>Modifier le mot de passe</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="input-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />{" "}
                        <label>Ancien mot de passe</label>
                    </div>
                    <div className="input-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <label>Nouveau mot de passe</label>
                    </div>
                    <div className="showPassword">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label>Afficher le mot de passe</label>
                    </div>
                    <button type="submit">Modifier le mot de passe</button>
                </form>
            </div>
        </div>
    );
}

export default SettingsAccount;
