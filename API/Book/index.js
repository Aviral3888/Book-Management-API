// Prefix : /book

// Initialize Router 
const Router = require("express").Router();

// Models 
const BookModel = require("../../database/book");

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

// ########################################
//              GET METHOD                 
// ########################################

/*
Route               /
Description         Get all books
Access              PUBLIC  
Parameter           NONE
Methods             GET
*/

Router.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({
        books: getAllBooks
    });
});

/*
Route               /is
Description         Get Specific books
Access              PUBLIC
Parameter           isbn
Methods             GET
*/

Router.get("/is/:isbn", async(req, res) => {

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
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

Router.get("/c/:category", async(req, res) => {

    const getSpecificBooks = await BookModel.find({
        category: req.params.category,
    })

    if (!getSpecificBooks) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({
        books: getSpecificBooks
    });
});

/*
Route               /l
Description         Get list of books based on language
Access              PUBLIC
Parameters          language
Method              GET
*/

Router.get("/l/:language", async(req, res) => {

    const getSpecificBooks = await BookModel.find({
        language: req.params.language
    })

    if (!getSpecificBooks) {
        return res.json({
            error: `No book found for the language of ${req.params.language}`
        })
    }
    return res.json({
        book: getSpecificBooks
    });
});

/*
Route               /a
Description         Get list of books based on author
Access              PUBLIC
Parameters          author
Method              GET
*/

Router.get("/a/:authorId", async(req, res) => {

    const getSpecificBooks = await BookModel.find({
        authors: req.params.authorId,
    })

    if (!getSpecificBooks) {
        return res.json({
            error: `No book found for the author of ${req.params.authorId}`,
        });
    }

    return res.json({
        books: getSpecificBooks
    });
});

// ########################################
//             POST METHOD
// ########################################

/*
Route           /book/add
Description     to add new book
Access          PUBLIC
Parameter       NONE
Method          POST
*/

Router.post("/add", async(req, res) => {

    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);

    return res.json({
        books: addNewBook,
        message: "Book added successfully"
    });

})

// ########################################
//              PUT METHOD                 
// ########################################

/*
Route           /book/update/title/
Description     update book title
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

Router.put("/update/title/:isbn", async(req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        title: req.body.bookTitle,
    }, {
        new: true, // to get updated data
    });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title = req.body.newBookTitle;
    //         return;
    //     }
    // });

    return res.json({
        books: updatedBook
    });
});

/*
Route           /book/update/author/
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

Router.put("/update/author/:isbn", async(req, res) => {

    // update book database

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        $addToSet: {
            authors: req.body.newAuthor,
        },
    }, {
        new: true,
    });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.authors.push(req.body.newAuthor);
    //     }
    // });

    // update author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.body.newAuthor
    }, {
        $addToSet: {
            books: req.params.isbn,
        },
    }, {
        new: true,
    });

    // database.authors.forEach((author) => {
    //     if (author.id === req.body.newAuthor) {
    //         return author.books.push(req.params.isbn)
    //     }
    // });

    return res.json({
        message: "Updated Successfully",
        books: updatedBook,
        authors: updatedAuthor
    });

});

// ########################################
//              DELETE METHOD                 
// ########################################

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Method          DELETE
*/

Router.delete("/delete/:isbn", async(req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn
    });

    // const updatedBookDatabase = database.books.filter(
    //     (book) => book.ISBN !== req.params.isbn
    // );
    // database.books = updatedBookDatabase;

    return res.json({
        books: updatedBookDatabase
    });
});

/*
Route           /book/delete/author
Description     delete an author from a book
Access          PUBLIC
Parameter       isbn, authorId
Method          DELETE
*/

Router.delete("/delete/author/:isbn/:authorId", async(req, res) => {
    // update book database

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        $pull: {
            authors: parseInt(req.params.authorId)
        },
    }, {
        new: true
    });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAuthorList = book.authors.filter(
    //             (author) => author !== parseInt(req.params.authorId))
    //         book.authors = newAuthorList;
    //         return;
    //     };
    // });

    // update author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.params.authorId)
    }, {
        $pull: {
            books: req.params.isbn,
        },
    }, {
        new: true
    });


    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         const newBooksList = author.books.filter(
    //             (book) => book !== req.params.isbn)
    //         author.books = newBooksList;
    //         return;
    //     };
    // });

    return res.json({
        book: updatedBook,
        author: updatedAuthor,
        message: "SUccessfully Deleted"
    });

});

// Export Router 
module.exports = Router;