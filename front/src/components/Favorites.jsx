import React, { useState, useEffect } from "react";

function Favorites() {
    const [favoritesBooks, setFavoritesBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getFavoritesBooks() {
            try {
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch(
                    "http://localhost:3000/api/books/favorites",
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setFavoritesBooks(data); // MAJ de l'état avec les données recupérées
                } else {
                    console.error("Error:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                setFavoritesBooks([]); // Réinitialise l'état en cas d'erreur
            }
        }

        getFavoritesBooks();
    }, [token]);

    return (
        <div>
            <h1>Mes Favoris</h1>
            {Array.isArray(favoritesBooks) && favoritesBooks.length > 0 ? (
                favoritesBooks.map(book => (
                    <div key={book._id}>
                        <h3>{book.titre}</h3>
                        <p>{book.auteur}</p>
                        {book.image && (
                            <img src={book.image} alt={`${book.titre} cover`} />
                        )}
                    </div>
                ))
            ) : (
                <p>No favorites found</p>
            )}
        </div>
    );
}

export default Favorites;
