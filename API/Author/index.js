// Prefix : /author

// Initialize Router 
const Router = require("express").Router();

// Models 
const AuthorModel = require("../../database/author");

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

// ########################################
//              GET METHOD                 
// ########################################

/*
Route               /author
Description         To get list of all authors
Access              PUBLIC
Parameters          NULL
Method              GET
*/

Router.get("/", async(req, res) => {

    const getAllAuthors = await AuthorModel.find();
    return res.json({
        authors: getAllAuthors
    });
});

//--------------------------------------------------------

/*
Route               /author
Description         To get specific author based on id
Access              PUBLIC
Parameters          id
Method              GET 
*/

Router.get("/:id", async(req, res) => {
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
});

//--------------------------------------------------------

/*
Route               /author/book
Description         To get specific author based on books
Access              PUBLIC
Parameters          books
Method              GET 
*/

Router.get("/book/:isbn", async(req, res) => {

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
});


// ########################################
//             POST METHOD
// ########################################

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Method          POST
*/

Router.post("/add", async(req, res) => {

    const { newAuthor } = req.body;

    const addNewAuthor = AuthorModel.create(newAuthor);

    return res.json({
        authors: addNewAuthor,
        message: "Author added successfully"
    });

});


// ########################################
//              PUT METHOD                 
// ########################################

/*
Route           /author/update/name
Description     update author name
Access          PUBLIC
Parameter       authorId
Method          PUT
*/

Router.put("/update/name/:authorId", async(req, res) => {

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


// ########################################
//              DELETE METHOD                 
// ########################################

/*
Route           /author/delete
Description     delete the author 
Access          PUBLIC
Parameter       authorId
Method          DELETE
*/

Router.delete("/delete/:authorId", async(req, res) => {

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


// Export Router 
module.exports = Router;