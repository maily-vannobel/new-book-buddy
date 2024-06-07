import React, { useState } from "react";
import "../css/bookForm.css";

function FormBook() {
    const [titre, setTitre] = useState("");
    const [auteur, setAuteur] = useState("");
    const [image, setImage] = useState("");
    const [page, setPage] = useState("");
    const [selectedEtat, setSelectedEtat] = useState("lire");
    const [genre, setGenre] = useState("");
    const token = localStorage.getItem('token'); 

    const isValidImageUrl = (url) => {
        const imageUrlPattern = /\.(jpeg|jpg|gif|png|bmp)$/;
        return imageUrlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (titre.length < 3) {
            alert("Le titre doit comporter au moins 3 caractères.");
            return;
        }

        if (!/^[A-Za-z\s]{3,}$/.test(auteur)) {
            alert("L'auteur doit comporter au moins 3 caractères.");
            return;
        }

        if (!isValidImageUrl(image)) {
            alert("Veuillez entrer une URL d'image valide.");
            return;
        }

        if (!/^[A-Za-z\s]{3,}$/.test(genre)) {
            alert("Le genre doit comporter au moins 3 caractères.");
            return;
        }
                
        const pageAsNumber = Number(page);
        if (isNaN(pageAsNumber) || pageAsNumber <= 0) {
            alert("Veuillez entrer un nombre de pages valide.");
            return;
        }

        const newBook = {
            titre,
            auteur,
            image,
            page: pageAsNumber,
            etat: selectedEtat,
            genre,
        };
        console.log("Données envoyées:", newBook);

        try {
            const response = await fetch('http://localhost:3000/api/books/addBook', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBook)
            });
        
            if (response.ok) {
                const addedBook = await response.json();
                console.log("Livre ajouté avec succès:", addedBook);
                alert("Livre ajouté avec succès !");
            } else {
                console.error("Échec de l'ajout du livre");
                alert("Échec de l'ajout du livre");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre:", error);
            alert("Erreur lors de l'ajout du livre");
        }

        setTitre("");
        setAuteur("");
        setImage("");
        setPage("");
        setSelectedEtat("lire");
        setGenre("");
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setImage(url);
    };

    return(
        <div className="bookForm-center-div">
            <div className="bookForm-wrapper">
                <form onSubmit={handleSubmit} className="bookForm-form">
                    <h2 className="bookForm-h2">Ajouter un livre</h2>
                    <div className="bookForm-input-field">
                        <input 
                            value={titre} 
                            onChange={e => setTitre(e.target.value)} 
                            required 
                        />
                        <label>Titre</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={auteur} 
                            onChange={e => setAuteur(e.target.value)} 
                            required 
                        />
                        <label>Auteur</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={image} 
                            onChange={handleImageChange} 
                            type="text" 
                            required 
                        />
                        <label>Image (URL)</label>
                    </div>
                    <div className="bookForm-input-field">
                        <select 
                            value={selectedEtat} 
                            onChange={(e) => setSelectedEtat(e.target.value)} 
                            required 
                        >
                            <option value="lire">À lire</option>
                            <option value="en_cours">En cours de lecture</option>
                            <option value="fini">Fini</option>
                        </select>
                        <label>État de lecture</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={page} 
                            onChange={e => setPage(e.target.value)} 
                            type="number" 
                            required 
                        />
                        <label>Nombre de pages</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={genre} 
                            onChange={e => setGenre(e.target.value)} 
                            required 
                        />
                        <label>Genre</label>
                    </div>
                    <button type="submit" className="bookForm-button">Ajouter le livre</button>
                </form>
            </div>
        </div>
    );
}

export default FormBook;
