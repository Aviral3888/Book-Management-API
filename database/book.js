const mongoose = require("mongoose");

// Creating a book schema :
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 12,
    }, // required
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30,
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
})

// Creating a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;