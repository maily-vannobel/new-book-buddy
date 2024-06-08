import React, { useState, useEffect } from "react";
import BookComponent from "./BookComponent";
import FormCategorie from "./FormCategorie";

function BooksList() {
    const categories = {
        Action: "Action",
        Comédie: "Comédie",
        Dystopie: "Dystopie",
        Fantaisie: "Fantaisie",
        Histoire: "Histoire",
        Policier: "Policier",
        Psycho: "Psycho",
        "Science Fiction": "Science Fiction",
        Thriller: "Thriller",
        Romance: "Romance",
        Drame: "Drame",
        Aventure: "Aventure",
        Biographie: "Biographie",
        Philosophie: "Philosophie",
        Mystère: "Mystère",
        Essais: "Essais"
    };

    const [books, setBooks] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({
        Action: false,
        Comédie: false,
        Dystopie: false,
        Fantaisie: false,
        Histoire: false,
        Policier: false,
        Psycho: false,
        "Science Fiction": false,
        Thriller: false,
        Romance: false,
        Drame: false,
        Aventure: false,
        Biographie: false,
        Philosophie: false,
        Mystère: false,
        Essais: false
    });

    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch("http://localhost:3000/api/books");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Books data:", data);
                setBooks(data);
                setFilteredBooks(data);
            } catch (error) {
                console.error("Error fetching books", error);
                setBooks([]);
                setFilteredBooks([]);
            }
        }

        getBooks();
    }, []);

    const handleCheckboxChange = (name, checked) => {
        setSelectedCategories((prevState) => {
            const updatedCategories = { ...prevState, [name]: checked };
            console.log("Updated categories:", updatedCategories);
            filterBooksByCategories(updatedCategories);
            return updatedCategories;
        });
    };

    const filterBooksByCategories = (updatedCategories) => {
        const selectedCategoryNames = Object.keys(updatedCategories).filter(
            (name) => updatedCategories[name]
        );

        if (selectedCategoryNames.length === 0) {
            setFilteredBooks(books);
            return;
        }

        const filtered = books.filter((book) =>
            selectedCategoryNames.includes(book.category)
        );

        setFilteredBooks(filtered);
    };

    const handleUpdateBook = (id, updatedData) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book._id === id ? { ...book, ...updatedData } : book
            )
        );
        setFilteredBooks((prevFilteredBooks) =>
            prevFilteredBooks.map((book) =>
                book._id === id ? { ...book, ...updatedData } : book
            )
        );
    };

    return (
        <div className="container">
            <div className="row">
                <FormCategorie
                    categories={categories}
                    selectedCategories={selectedCategories}
                    handleCheckboxChange={handleCheckboxChange}
                />
                {filteredBooks.map((book) => (
                    <div key={book._id} className="col-md-4 mb-4">
                        <BookComponent 
                            book={book} 
                            onUpdateBook={handleUpdateBook} 
                            onFavoriteToggle={() => {}} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BooksList;
