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

// Microservices Routes 
const Books = require("./API/Book");

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

// Initializing Microservices
booky.use("/book", Books);


// Starting with API

// ########################################
//              GET METHOD                 
// ########################################

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

    const getSpecificAuthor = await AuthorModel.find({
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


//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


/*
Route           /author/update/name
Description     update author name
Access          PUBLIC
Parameter       authorId
Method          PUT
*/

booky.put("/author/update/name/:authorId", async(req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.authorId,
    }, {
        name: req.body.authorName,
    }, {
        new: true,
    });

    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         author.name = req.body.newAuthorName;
    //         return;
    //     }
    // })

    return res.json({
        authors: updatedAuthor
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

booky.put("/publication/update/name/:publicationId", async(req, res) => {

    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.params.publicationId,
    }, {
        name: req.body.publicationName,
    }, {
        new: true,
    });

    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.publicationId)) {
    //         publication.name = req.body.newPublicationName;
    //         return;
    //     }
    // })

    return res.json({
        publications: updatedPublication
    });

});


/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          PUBLIC
Parameter       isbn, pubId
Method          PUT
*/

booky.put("/publication/update/book/:isbn/:pubId", async(req, res) => {

    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.params.pubId,
    }, {
        books: req.params.isbn,
    }, {
        new: true,
    });

    // database.publications.forEach((publication) => {
    //     if (publication.id === req.body.pubId) {
    //         return publication.books.push(req.params.isbn);
    //     }
    // });

    // update books database

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        publication: req.params.pubId,
    }, {
        new: true,
    });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = req.body.pubId;
    //         return;
    //     }
    // });

    return res.json({
        message: "Successfully Updated publications",
        books: updatedBook,
        publications: updatedPublication
    });

});


// ########################################
//              DELETE METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]


//  [[{{{{(((( AUTHOR APIs ))))}}}}]]


/*
Route           /author/delete
Description     delete the author 
Access          PUBLIC
Parameter       authorId
Method          DELETE
*/

booky.delete("/author/delete/:authorId", async(req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: req.params.authorId,
    });

    // const updatedAuthorDatabase = database.authors.filter(
    //     (author) => author.id !== parseInt(req.params.authorId)
    // );
    // database.authors = updatedAuthorDatabase;

    return res.json({
        authors: updatedAuthorDatabase
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

booky.delete("/publication/delete/:pubId", async(req, res) => {

    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
        id: req.params.pubId,
    });

    // const updatedPublicationDatabase = database.publications.filter(
    //     (publication) => publication.id !== parseInt(req.params.pubId)
    // );
    // database.publications = updatedPublicationDatabase;

    return res.json({
        publications: updatedPublicationDatabase
    });
});


/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       pubId, isbn
Method          DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubId", async(req, res) => {

    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.params.pubId,
    }, {
        $pull: {
            books: req.params.isbn,
        },
    }, {
        new: true,
    });

    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.pubId)) {
    //         const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
    //         publication.books = newBooksList;
    //         return;
    //     }
    // });

    // update books database
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        publication: 0,
    }, {
        new: true,
    });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = 0;
    //         return;
    //     }
    // });

    return res.json({
        message: "Status: 200, Task Successfully Completed",
        publications: updatedPublication,
        books: updatedBook
    })
})


// Listen to Port : 3000

booky.listen(port, () =>
    console.log(`Server is running at port ${port}`)
);