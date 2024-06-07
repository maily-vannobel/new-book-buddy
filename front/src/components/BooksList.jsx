import React, { useState, useEffect } from "react";
import BookComponent from "./BookComponent";
import FormCategorie from "./FormCategorie";


function BooksList() {
    const categories = {
        Action: "Action",
        Comédie: "Comédie",
        "Dark Romance": "Dark Romance",
        Dystopie: "Dystopie",
        Fantaisie: "Fantaisie",
        Histoire: "Histoire",
        "New Romance": "New Romance",
        Policier: "Policier",
        Psycho: "Psycho",
        "Science Fiction": "Science Fiction",
        Thriller: "Thriller",
        "Young Adult": "Young Adult"
    };  
    const [books, setBooks] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({
        Action: false,
        Comédie: false,
        "Dark Romance": false,
        Dystopie: false,
        Fantaisie: false,
        Histoire: false,
        "New Romance": false,
        Policier: false,
        Psycho: false,
        "Science Fiction": false,
        Thriller: false,
        "Young Adult": false
    });
    
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch("http://localhost:3000/api/books");
                const data = await response.json();
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
            selectedCategoryNames.includes(book.categorie)
        );

        setFilteredBooks(filtered);
    };

    const handleUpdateBook = (id, updatedData) => {
        setBooks((prevBooks) => prevBooks.map((book) =>
            book._id === id ? { ...book, ...updatedData } : book
        ));
        setFilteredBooks((prevFilteredBooks) => prevFilteredBooks.map((book) =>
            book._id === id ? { ...book, ...updatedData } : book
        ));
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
