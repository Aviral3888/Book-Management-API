const express = require("express");

// Database : imported file
const database = require("./database");

// Initalization
const booky = express();
const port = 3000;

// configuration
booky.use(express.json());



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


//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


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
Description         To get specific author based on id
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
Description         To get specific author based on books
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


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route               /publications
Description         To get list of all publications
Access              PUBLIC
Parameters          NULL
Method              GET
*/

booky.get("/publications", (req, res) => {
    return res.json({
        publications: database.publication
    });
})


/*
Route               /publications
Description         To get specific publications based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

booky.get("/publications/:id", (req, res) => {
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
Route               /publications/book
Description         To get specific publications based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

booky.get("/publications/book/:isbn", (req, res) => {
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


booky.post("/book/add", (req, res) => {
    // console.log(req.body);
    const { newBook } = req.body;
    database.books.push(newBook);

    return res.json({
        books: database.books
    });

})

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/author/add", (req, res) => {

    const { newAuthor } = req.body;
    database.author.push(newAuthor);

    return res.json({
        authors: database.author
    });

})


//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/publication/add", (req, res) => {

    const { newPublication } = req.body;
    database.publication.push(newPublication);

    return res.json({
        publications: database.publication
    });

})


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
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    // update author database

    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            return author.books.push(req.params.isbn)
        }
    });

    return res.json({
        books: database.books,
        authors: database.author
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

    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            author.name = req.body.newAuthorName;
            return;
        }
    })

    return res.json({
        authors: database.author
    });

});



//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


/*
Route           /publication/update/name
Description     Update publication name
Access          PUBLIC
Parameter       
Method          PUT
*/

booky.put("/publication/update/name/:publicationId", (req, res) => {

    database.publication.forEach((publication) => {
        if (publication.id === parseInt(req.params.publicationId)) {
            publication.name = req.body.newPublicationName;
            return;
        }
    })

    return res.json({
        publications: database.publication
    });

});




// ########################################
//              DELETE METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]




booky.listen(port, () =>
    console.log(`Server is running at port ${port}`)
);