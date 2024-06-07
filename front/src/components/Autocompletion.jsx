import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root");

function Autocompletion({ onSelectBook }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEtat, setNewEtat] = useState("");
    const [lastPageRead, setLastPageRead] = useState(0);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/books");
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const filterSuggestions = query => {
        if (query.trim() === "") {
            setSuggestions([]);
        } else {
            const filteredBooks = books.filter(book =>
                book.titre.toLowerCase().startsWith(query.toLowerCase())
            );
            setSuggestions(filteredBooks);
        }
    };

    const handleBookClick = book => {
        setSelectedBook(book);
        setNewEtat(book.etat);
        setLastPageRead(book.pageCourante);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedBook(null);
    };

    const handleEtatChange = e => {
        setNewEtat(e.target.value);
    };

    const handlePageReadChange = e => {
        setLastPageRead(e.target.value);
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        if (selectedBook) {
            const updatedData = {
                etat: newEtat,
                pageCourante: lastPageRead,
            };
            console.log(
                "Submitting updates for book:",
                selectedBook._id,
                updatedData
            );

            try {
                const response = await fetch(
                    `http://localhost:3000/api/books/${selectedBook._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    }
                );
                if (response.ok) {
                    setBooks(prevBooks =>
                        prevBooks.map(book =>
                            book._id === selectedBook._id
                                ? { ...book, ...updatedData }
                                : book
                        )
                    );
                    setSuggestions(prevSuggestions =>
                        prevSuggestions.map(book =>
                            book._id === selectedBook._id
                                ? { ...book, ...updatedData }
                                : book
                        )
                    );
                    setSelectedBook(prevBook => ({
                        ...prevBook,
                        ...updatedData,
                    }));
                } else {
                    console.error("Failed to update book");
                }
            } catch (error) {
                console.error("Error updating book:", error);
            }
        }
        closeModal();
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                className="form-control me-2"
                placeholder="Rechercher des livres"
                aria-label="Search"
                value={searchQuery}
                onChange={e => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    filterSuggestions(value);
                }}
            />
            {suggestions.length > 0 && searchQuery.trim() !== "" && (
                <ul
                    className="list-group"
                    style={{ position: "absolute", zIndex: 1, width: "100%" }}
                >
                    {suggestions.map(book => (
                        <li
                            key={book._id}
                            className="list-group-item"
                            onClick={() => handleBookClick(book)}
                            style={{ cursor: "pointer" }}
                        >
                            {book.titre}
                        </li>
                    ))}
                </ul>
            )}
            {selectedBook && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Book Details Modal"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>{selectedBook.titre}</h1>
                            <h2>{selectedBook.auteur}</h2>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body m-2">
                            <div>
                                <p>
                                    Pages{" "}
                                    <span className="modalText">
                                        {selectedBook.nombre_de_pages}
                                    </span>
                                    <br />
                                    Genre{" "}
                                    <span className="modalText">
                                        {selectedBook.categorie}
                                    </span>
                                </p>
                            </div>
                            <p className="resume">{selectedBook.resume}</p>
                            <form onSubmit={handleFormSubmit}>
                                <div className="formGroup">
                                    <div>
                                        <label>État</label>
                                        <select
                                            className="form-control"
                                            value={newEtat}
                                            onChange={handleEtatChange}
                                        >
                                            <option value="À lire">
                                                À lire
                                            </option>
                                            <option value="En cours de lecture">
                                                En cours de lecture
                                            </option>
                                            <option value="Fini">Fini</option>
                                        </select>
                                    </div>
                                </div>
                                {newEtat === "En cours de lecture" && (
                                    <div>
                                        <label> Dernière page lue:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={lastPageRead}
                                            onChange={handlePageReadChange}
                                            min="0"
                                            max={selectedBook.nombre_de_pages}
                                        />
                                        <div className="progress mt-2">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${(
                                                        (lastPageRead /
                                                            selectedBook.nombre_de_pages) *
                                                        100
                                                    ).toFixed(2)}%`,
                                                }}
                                                aria-valuenow={lastPageRead}
                                                aria-valuemin="0"
                                                aria-valuemax={
                                                    selectedBook.nombre_de_pages
                                                }
                                            >
                                                {(
                                                    (lastPageRead /
                                                        selectedBook.nombre_de_pages) *
                                                    100
                                                ).toFixed(2)}
                                                %
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-success me-2"
                                    >
                                        Mettre à jour
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Autocompletion;
