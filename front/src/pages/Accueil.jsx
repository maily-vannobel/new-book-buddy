import React from "react";
import FormBook from "../components/FormBook";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/accueil.css";

function Accueil() {
    return (
        <div className="accueil-container">
            <h1>Accueil</h1>
            <h2>Bienvenue sur notre application de gestion de bibliothèque !</h2>
            <h3>Ajouter un livre à la base de données :</h3>
            <FormBook />
            <div className="app-info">
                <ul>
                    <li>
                        <i className="bi bi-book" style={{ fontSize: '2rem', color: '#333' }}></i>
                        <p>Gérez facilement votre collection de livres.</p>
                    </li>
                    <li>
                        <i className="bi bi-graph-up" style={{ fontSize: '2rem', color: '#333' }}></i>
                        <p>Suivez vos progrès de lecture.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Accueil;
