import React, { useState } from "react";
import "../css/bookForm.css";

function FormBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState(""); // Ajout du champ date
    const [image, setImage] = useState("");
    const [numberPage, setNumberPage] = useState("");
    const [state, setState] = useState("À lire");
    const [category, setCategory] = useState("");
    const token = localStorage.getItem('token'); 

    const isValidImageUrl = (url) => {
        const imageUrlPattern = /\.(jpeg|jpg|gif|png|bmp)$/;
        return imageUrlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.length < 3) {
            alert("Le titre doit comporter au moins 3 caractères.");
            return;
        }

        if (!/^[A-Za-z\s]{3,}$/.test(author)) {
            alert("L'auteur doit comporter au moins 3 caractères.");
            return;
        }

        if (!isValidImageUrl(image)) {
            alert("Veuillez entrer une URL d'image valide.");
            return;
        }

        if (!/^[A-Za-z\s]{3,}$/.test(category)) {
            alert("Le genre doit comporter au moins 3 caractères.");
            return;
        }
                
        const pageAsNumber = Number(numberPage);
        if (isNaN(pageAsNumber) || pageAsNumber <= 0) {
            alert("Veuillez entrer un nombre de pages valide.");
            return;
        }

        const newBook = {
            title,
            author,
            date,
            image,
            numberPage: pageAsNumber, // updated field name
            state, // updated field name
            category, // updated field name
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

        setTitle("");
        setAuthor("");
        setDate("");
        setImage("");
        setNumberPage("");
        setState("À lire");
        setCategory("");
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
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            required 
                        />
                        <label>Titre</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={author} 
                            onChange={e => setAuthor(e.target.value)} 
                            required 
                        />
                        <label>Auteur</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={date} 
                            onChange={e => setDate(e.target.value)} 
                            type="text" 
                            required 
                        />
                        <label>Date</label>
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
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            required 
                        >
                            <option value="À lire">À lire</option>
                            <option value="En cours de lecture">En cours de lecture</option>
                            <option value="Fini">Fini</option>
                        </select>
                        <label>État de lecture</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={numberPage} 
                            onChange={e => setNumberPage(e.target.value)} 
                            type="number" 
                            required 
                        />
                        <label>Nombre de pages</label>
                    </div>
                    <div className="bookForm-input-field">
                        <input 
                            value={category} 
                            onChange={e => setCategory(e.target.value)} 
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
