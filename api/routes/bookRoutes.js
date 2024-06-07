const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../authMiddleware/usersAuthMiddleware");

const router = express.Router();

router.get("/books", bookController.getAllBooks); //GET pour récupérer tous les livres
router.get("/books/:id", bookController.getBookByID); //GET pour récupérer un livre par ID
router.get("/books/filter/:filter/:value", bookController.getBookByFilter); //GET pour recup livre par filtre
router.post("/addBooks", bookController.addBook); //POST pour ajouter un nouveau livre
router.put("/book/:id", bookController.updateBookState); //PUT pour modifier l'état du livre
router.put("/book/status/:id", bookController.updateReadingPage); //PUT pour modifier la page en cours de lecture
router.post("/book/:id", bookController.addBookToFavorites); //POST:ajouter un livre aux favoris
router.get("/booksU", bookController.getBooks); // Route GET pour récupérer tous les livres
router.get("/books/favorites",
    authMiddleware,
    bookController.getBooksFavorites
); // Route pour recup les livres favoris
router.put("/books/:id", bookController.putBooksUpdate); // Route pour mettre à jour un livre
router.put("/books/status/:id", bookController.putBooksUpdatePage); // Route pour MAJ de la page en cours de lecture
router.post("/books/addBook", bookController.postBooksAdd); //Route pour ajouter un livre dans la collection
router.post(
    "/books/addfavorites",
    authMiddleware,
    bookController.postBookAddFavorites
); // Route pour ajouter le livre en favori
router.delete("/books/delete/:id", authMiddleware, bookController.deleteBooks); // Route pour supprimer le livre de la liste des favoris :
router.get("/booksByCategory", bookController.getBooksByCategory);
module.exports = router;
