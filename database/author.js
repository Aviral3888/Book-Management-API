const mongoose = require("mongoose");

// Creating an author schema 
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

// Creating the Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;