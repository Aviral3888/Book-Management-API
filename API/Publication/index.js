// Prefix : /publication

// Initialize Router 
const Router = require("express").Router();

// Models 
const PublicationModel = require("../../database/publication");

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]

// ########################################
//              GET METHOD                 
// ########################################

/*
Route               /publications
Description         To get list of all publications
Access              PUBLIC
Parameters          NULL
Method              GET
*/

Router.get("/", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({
        publications: getAllPublications
    });
});

//--------------------------------------------------------

/*
Route               /publications
Description         To get specific publications based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

Router.get("/:id", async(req, res) => {

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
});

//--------------------------------------------------------

/*
Route               /publications/book
Description         To get specific publications based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

Router.get("/book/:isbn", async(req, res) => {

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
});


// ########################################
//             POST METHOD
// ########################################

/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Method          POST
*/

Router.post("/add", async(req, res) => {

    const { newPublication } = req.body;

    const addNewPublication = PublicationModel.create(newPublication);

    return res.json({
        publications: addNewPublication,
        message: "Publication added successfully"
    });

})


// ########################################
//              PUT METHOD                 
// ########################################

/*
Route           /publication/update/name
Description     Update publication name
Access          PUBLIC
Parameter       publicationId
Method          PUT
*/

Router.put("/update/name/:publicationId", async(req, res) => {

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

//--------------------------------------------------------

/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          PUBLIC
Parameter       isbn, pubId
Method          PUT
*/

Router.put("/update/book/:isbn/:pubId", async(req, res) => {

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

/*
Route           /publication/delete
Description     delete the publication
Access          PUBLIC
Parameter       pubId
Method          DELETE
*/

Router.delete("/delete/:pubId", async(req, res) => {

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

//--------------------------------------------------------

/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       pubId, isbn
Method          DELETE
*/

Router.delete("/delete/book/:isbn/:pubId", async(req, res) => {

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
    });
});


// Export Router 
module.exports = Router;