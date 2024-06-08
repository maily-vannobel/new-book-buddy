const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: String,
    image: String,
    state: { type: String, required: true },
    numberPage: { type: Number, required: true },
    currentPage: { type: Number, default: 0 },
    resume: String,
    category: String,
    favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Book", bookSchema, "book");
