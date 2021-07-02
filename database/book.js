const e = require("express");
const mongoose = require("mongoose");

// Creating a book schema :
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    author: [Number],
    language: String,
    pubDate: String,
    numPage: Number,
    category: [String],
    publication: Number
})

// Creating a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;