import React, { useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/bookComponent.module.css";

Modal.setAppElement("#root");

function BookComponent({ book, onFavoriteToggle, onUpdateBook }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEtat, setNewEtat] = useState(book?.etat || "");
    const [lastPageRead, setLastPageRead] = useState(book?.pageCourante || 0);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = e => {
        e.stopPropagation();
        setModalIsOpen(false);
    };

    const handleEtatChange = e => {
        setNewEtat(e.target.value);
    };

    const handlePageReadChange = e => {
        setLastPageRead(e.target.value);
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        if (book) {
            console.log("Submitting updates for book:", book._id, {
                etat: newEtat,
                pageCourante: lastPageRead,
            });
            onUpdateBook(book._id, {
                etat: newEtat,
                pageCourante: lastPageRead,
            });
        }
        closeModal(e);
    };

    if (!book) {
        return null;
    }
    const progressPercentage = (book.pageCourante / book.nombre_de_pages) * 100;

    return (
        <div className="bc-book-component card mb-3">
            <div className="card-body d-flex flex-column">
                <div className="bc-cardHeader" onClick={openModal}>
                    <h2 className="bc-book-title">{book.titre}</h2>
                    <h3 className="bc-book-author">{book.auteur}</h3>
                </div>

                <div className="bc-book-state-container">
                    <p className="bc-book-state card-text">État: {book.etat}</p>
                    {book.etat === "En cours de lecture" && (
                        <div className="bc-progress-container">
                            <div
                                className="progress"
                                style={{ height: "10px" }}
                            >
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${Math.min(
                                            progressPercentage,
                                            100
                                        )}%`,
                                    }}
                                    aria-valuenow={lastPageRead}
                                    aria-valuemin="0"
                                    aria-valuemax={book.nombre_de_pages}
                                >
                                    {`${progressPercentage.toFixed(2)}%`}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {book.image && (
                    <img
                        className="bc-book-image card-img-top"
                        src={book.image}
                        alt={`${book.titre} cover`}
                        onClick={openModal}
                    />
                )}
                    <div className="d-flex justify-content-between mt-2">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-heart"></i>
                                </button>
                                <button className="btn btn-outline-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                        </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Book Details Modal"
            >
                <div className="bc-modal-content">
                    <div className="bc-modal-header">
                        <h2 className="bc-modal-title">{book.titre}</h2>
                        <h2>{book.auteur}</h2>
                    </div>
                    <div className="bc-modal-body m-2">
                        <div className="bc-modal-details">
                            <p>
                                Pages{" "}
                                <span className="bc-modal-text">
                                    {book.nombre_de_pages}
                                </span>
                                <br />
                                Genre{" "}
                                <span className="bc-modal-text">
                                    {book.categorie}
                                </span>
                            </p>
                        </div>
                        <p className="bc-resume">{book.resume}</p>

                        <form onSubmit={handleFormSubmit}>
                            <div className="bc-form-group">
                                <div>
                                    <label>État</label>
                                    <select
                                        className="form-control"
                                        value={newEtat}
                                        onChange={handleEtatChange}
                                    >
                                        <option value="À lire">À lire</option>
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
                                        max={book.nombre_de_pages}
                                    />
                                    <div className="progress mt-2">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${(
                                                    (lastPageRead /
                                                        book.nombre_de_pages) *
                                                    100
                                                ).toFixed(2)}%`,
                                            }}
                                            aria-valuenow={lastPageRead}
                                            aria-valuemin="0"
                                            aria-valuemax={book.nombre_de_pages}
                                        >
                                            {(
                                                (lastPageRead /
                                                    book.nombre_de_pages) *
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
        </div>
    );
}

export default BookComponent;
