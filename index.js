require("dotenv").config();
// Framework
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes 
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

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
booky.use("/author", Authors);
booky.use("/publication", Publications);

// Starting with API

// ########################################
//              GET METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


// ########################################
//             POST METHOD
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


// ########################################
//              PUT METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


// ########################################
//              DELETE METHOD                 
// ########################################

//  [[{{{{(((( BOOKS APIs ))))}}}}]]

//  [[{{{{(((( AUTHOR APIs ))))}}}}]]

//  [[{{{{(((( PUBLICATION  APIs ))))}}}}]]


// Listen to Port : 3000

booky.listen(port, () =>
    console.log(`Server is running at port ${port}`)
);