const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    image: String,
    etat: { type: String, required: true },
    nombre_de_pages: { type: Number, required: true },
    pageCourante: { type: Number, default: 0 },
    resume: String,
    categorie: String,
    favori: { type: Boolean, default: false },
});

module.exports = mongoose.model("Book", bookSchema, "book");
