const express = require("express");

// Database : imported file
const database = require("./database");

// Initalization
const booky = express();
const port = 3000;

// Starting with API

// ########################################
//             Books API
// ########################################

/*
Route               /
Description         Get all books
Access              PUBLIC  
Parameter           NONE
Methods             GET
*/

booky.get("/", (req, res) => {
    return res.json({
        books: database.books
    });
})

/*
Route               /is
Description         Get Specific books
Access              PUBLIC
Parameter           isbn
Methods             GET
*/

booky.get("/is/:isbn", (req, res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({
        book: getSpecificBook
    });
});

/*
Route               /c
Description         Get specific books based on categories
Access              PUBLIC
Parameter           category
Methods             GET
*/

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({
        book: getSpecificBook
    });
})

/*
Route               /l
Description         Get list of books based on language
Access              PUBLIC
Parameters          language
Method              GET
*/

booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the language of ${req.params.language}`
        })
    }
    return res.json({
        book: getSpecificBook
    });
})


// ########################################
//             Authors API
// ########################################

/*
Route               /author
Description         To get list of all authors
Access              PUBLIC
Parameters          NULL
Method              GET
*/

booky.get("/author", (req, res) => {
    return res.json({
        authors: database.author
    });
})


/*
Route               /author
Description         To get specific books based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the id of ${req.params.id}`
        });
    }
    return res.json({
        author: getSpecificAuthor
    });
})


/*
Route               /author/book
Description         To get specific books based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the id of ${req.params.isbn}`
        });
    }
    return res.json({
        author: getSpecificAuthor
    });
})



// ########################################
//             Publications API
// ########################################




/*
Route               /publication
Description         To get list of all publications
Access              PUBLIC
Parameters          NULL
Method              GET
*/

booky.get("/publication", (req, res) => {
    return res.json({
        publication: database.publication
    });
})


/*
Route               /publication
Description         To get specific publications based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

booky.get("/publication/:id", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.id === parseInt(req.params.id)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({
            error: `No publication found for the id of ${req.params.id}`
        });
    }
    return res.json({
        publication: getSpecificPublication
    });
})

/*
Route               /author/publication
Description         To get specific publications based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({
            error: `No publication found for the id of ${req.params.isbn}`
        });
    }
    return res.json({
        publication: getSpecificPublication
    });
})



















booky.listen(port, () =>
    console.log(`Server is running at port ${port}`)
);