// Requirements for our project 📌

/*

We are a book management company :: Data it holds is ...

1. BOOKS
Details to be provided :

ISBN as Id for unique
-    ISBN                book title          published date
-   language            no. of pages        author[]
-   category[]


2. AUTHORS
Details to be provided :

-   id      name        books[]


3. PUBLICATIONS
Details to be provided :

-   id      name        books[]


++++----++++----++++----++++----++++----++++----++++----++++----++++

// Now what all APIs are required...

____BOOKs____

// GET

We need an API -
-   to get all books ✅
-   to get specific books ✅
-   to get list of books based on category ✅
-   to get list of books based on languages ✅
-   to get list of books based on authors ✅
--------------------------------------------

// POST
We need an API -
-   Add new book ✅
--------------------------------------------

// PUT
We need an API -
-   Update book title ✅
-   update/add new author ✅
--------------------------------------------

// DELETE
We need an API -
-   delete a book ✅
-   delete an author from a book ✅


++++----++++----++++----++++----++++----++++----++++----++++----++++

____AUTHORs____

// GET

We need an API -
-   to get all authors ✅
-   to get specific authors ✅
-   to get list of authors based on books ✅
--------------------------------------------


// POST
We need an API -
-   Add new author ✅


// PUT
We need an API -
-   Update author name ✅


// DELETE
We need an API -
-   delete an author ✅


++++----++++----++++----++++----++++----++++----++++----++++----++++

____PUBLICATIONs____

// GET

We need an API -
-   to get all publications ✅
-   to get specific publications ✅
-   to get list of publications based on books ✅
--------------------------------------------

// POST
We need an API -
-   Add new publications ✅


// PUT
We need an API -
-   Update publication name ✅
-   Update/add new book to a publication ✅


// DELETE
We need an API -
-   delete the publication ✅
-   delete a book from publication ✅



EXTRA ::
How the server serves the request.


Connecting to External Database MongoDB.
we need something ::

-   That can talk to mongoDB in which mongoDB understands.
-   and talk to user in which we understand ** javascript **

-   This is done by mongoose



*/