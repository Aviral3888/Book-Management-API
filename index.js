require("dotenv").config();
// Framework
const express = require("express");
const mongoose = require("mongoose");

// Database : imported file
const database = require("./database/database");

// Models 
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initializing express
const booky = express();
const port = 3000;

// configuration
booky.use(express.json());

// Establish Database Connection

mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection Established!!!!! ✔✔"));


// Starting with API


// ########################################
//              GET METHOD                 
// ########################################


//  [[{{{{(((( BOOKS APIs ))))}}}}]]

/*
Route               /
Description         Get all books
Access              PUBLIC  
Parameter           NONE
Methods             GET
*/

booky.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({
        books: getAllBooks
    });
})

// booky.get("/", (req,  res) => {
//     return res.json({
//         books: database.books
//     });
// })

/*
Route               /is
Description         Get Specific books
Access              PUBLIC
Parameter           isbn
Methods             GET
*/

booky.get("/is/:isbn", async(req, res) => {

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

// booky.get("/is/:isbn", (req, res) => {
//     const getSpecificBook = database.books.filter(
//         (book) => book.ISBN === req.params.isbn
//     );
//     if (getSpecificBook.length === 0) {
//         return res.json({
//             error: `No book found for the ISBN of ${req.params.isbn}`,
//         });
//     }
//     return res.json({
//         book: getSpecificBook
//     });
// });

/*
Route               /c
Description         Get specific books based on categories
Access              PUBLIC
Parameter           category
Methods             GET
*/

booky.get("/c/:category", async(req, res) => {

    const getSpecificBooks = await BookModel.findOne({
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
})

// booky.get("/c/:category", (req, res) => {
//     const getSpecificBook = database.books.filter(
//         (book) => book.category.includes(req.params.category)
//     );
//     if (getSpecificBook.length === 0) {
//         return res.json({
//             error: `No book found for the category of ${req.params.category}`,
//         });
//     }
//     return res.json({
//         book: getSpecificBook
//     });
// })

/*
Route               /l
Description         Get list of books based on language
Access              PUBLIC
Parameters          language
Method              GET
*/

booky.get("/l/:language", async(req, res) => {

    const getSpecificBooks = await BookModel.findOne({
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
})

// booky.get("/l/:language", (req, res) => {
//     const getSpecificBook = database.books.filter(
//         (book) => book.language === req.params.language
//     );

//     if (getSpecificBook.length === 0) {
//         return res.json({
//             error: `No book found for the language of ${req.params.language}`
//         })
//     }
//     return res.json({
//         book: getSpecificBook
//     });
// })

/*
Route               /a
Description         Get list of books based on author
Access              PUBLIC
Parameters          author
Method              GET
*/

booky.get("/a/:authorId", async(req, res) => {

    const getSpecificBooks = await BookModel.findOne({
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
})

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


/*
Route               /author
Description         To get list of all authors
Access              PUBLIC
Parameters          NULL
Method              GET
*/

booky.get("/author", async(req, res) => {

    const getAllAuthors = await AuthorModel.find();
    return res.json({
        authors: getAllAuthors
    });
})


/*
Route               /author
Description         To get specific author based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

booky.get("/author/:id", async(req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({
        id: req.params.id
    })

    if (!getSpecificAuthor) {
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
Description         To get specific author based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

booky.get("/author/book/:isbn", async(req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({
        books: req.params.isbn
    });

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found for the id of ${req.params.isbn}`
        });
    }
    return res.json({
        author: getSpecificAuthor
    });
})


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route               /publications
Description         To get list of all publications
Access              PUBLIC
Parameters          NULL
Method              GET
*/

booky.get("/publications", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({
        publications: getAllPublications
    });
})


/*
Route               /publications
Description         To get specific publications based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

booky.get("/publications/:id", async(req, res) => {

    const getSpecificPublication = await PublicationModel.findOne({
        id: req.params.id
    });

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id of ${req.params.id}`
        });
    }
    return res.json({
        publication: getSpecificPublication
    });
})

/*
Route               /publications/book
Description         To get specific publications based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

booky.get("/publications/book/:isbn", async(req, res) => {

    const getSpecificPublication = await PublicationModel.findOne({
        books: req.params.isbn
    });

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id of ${req.params.isbn}`
        });
    }
    return res.json({
        publication: getSpecificPublication
    });
})



// ########################################
//             POST METHOD
// ########################################


//  [[{{{{(((( BOOKS APIs ))))}}}}]]

/*
Route           /book/add
Description     to add new book
Access          PUBLIC
Parameter       NONE
Method          POST
*/


booky.post("/book/add", async(req, res) => {

    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);

    return res.json({
        books: addNewBook,
        message: "Book added successfully"
    });

})

// booky.post("/book/add", (req, res) => {
//     // console.log(req.body);
//     const { newBook } = req.body;
//     database.books.push(newBook);

//     return res.json({
//         message: "Books added successfully",
//         books: database.books
//     });

// })

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/author/add", async(req, res) => {

    const { newAuthor } = req.body;

    const addNewAuthor = AuthorModel.create(newAuthor);

    return res.json({
        authors: addNewAuthor,
        message: "Author added successfully"
    });

})

// booky.post("/author/add", (req, res) => {

//     const { newAuthor } = req.body;
//     database.authors.push(newAuthor);

//     return res.json({
//         authors: database.authors
//     });

// })


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/publication/add", async(req, res) => {

    const { newPublication } = req.body;

    const addNewPublication = PublicationModel.create(newPublication);

    return res.json({
        publications: addNewPublication,
        message: "Publication added successfully"
    });

})


// booky.post("/publication/add", (req, res) => {

//     const { newPublication } = req.body;
//     database.publications.push(newPublication);

//     return res.json({
//         publications: database.publications
//     });

// })


// ########################################
//              PUT METHOD                 
// ########################################


//  [[{{{{(((( BOOKS APIs ))))}}}}]]

/*
Route           /book/update/title/
Description     update book title
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/book/update/title/:isbn", (req, res) => {

    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({
        books: database.books
    });

})


/*
Route           /book/update/author/
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/book/update/author/:isbn/:authorId", (req, res) => {

    // update book database

    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.authors.push(parseInt(req.params.authorId));
        }
    });

    // update author database

    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            return author.books.push(req.params.isbn)
        }
    });

    return res.json({
        message: "Updated Successfully",
        books: database.books,
        authors: database.authors
    });

});


//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


/*
Route           /author/update/name
Description     update author name
Access          PUBLIC
Parameter       authorId
Method          PUT
*/

booky.put("/author/update/name/:authorId", (req, res) => {

    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            author.name = req.body.newAuthorName;
            return;
        }
    })

    return res.json({
        authors: database.authors
    });

});


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]

/*
Route           /publication/update/name
Description     Update publication name
Access          PUBLIC
Parameter       publicationId
Method          PUT
*/

booky.put("/publication/update/name/:publicationId", (req, res) => {

    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.publicationId)) {
            publication.name = req.body.newPublicationName;
            return;
        }
    })

    return res.json({
        publications: database.publications
    });

});


/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/publication/update/book/:isbn", (req, res) => {

    // update publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update books database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        message: "Successfully Updated publications",
        books: database.books,
        publications: database.publications
    });

});


// ########################################
//              DELETE METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Method          DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;

    return res.json({
        books: database.books
    });
});


/*
Route           /book/delete/author
Description     delete an author from a book
Access          PUBLIC
Parameter       isbn, authorId
Method          DELETE
*/


booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {

    // update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorId))
            book.authors = newAuthorList;
            return;
        };
    });

    // update author database
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn)
            author.books = newBooksList;
            return;
        };
    });

    return res.json({
        book: database.books,
        author: database.authors,
        message: "SUccessfully Deleted"
    });

});


//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


/*
Route           /author/delete
Description     delete the author 
Access          PUBLIC
Parameter       authorId
Method          DELETE
*/

booky.delete("/author/delete/:authorId", (req, res) => {

    const updatedAuthorDatabase = database.authors.filter(
        (author) => author.id !== parseInt(req.params.authorId)
    );

    database.authors = updatedAuthorDatabase;

    return res.json({
        authors: database.authors
    });
});


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route           /publication/delete
Description     delete the publication
Access          PUBLIC
Parameter       pubId
Method          DELETE
*/

booky.delete("/publication/delete/:pubId", (req, res) => {

    const updatedPublicationDatabase = database.publications.filter(
        (publication) => publication.id !== parseInt(req.params.pubId)
    );

    database.publications = updatedPublicationDatabase;

    return res.json({
        publications: database.publications
    });
});


/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       pubId, isbn
Method          DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {

    // update publication database
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = newBooksList;
            return;
        }
    });

    // update books database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = 0;
            return;
        }
    });


    return res.json({
        message: "Status: 200, Task Successfully Completed",
        publications: database.publications,
        books: database.books
    })
})

// Listen to Port : 3000

booky.listen(port, () =>
    console.log(`Server is running at port ${port}`)
);