const books = [{
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publication: 1,
    category: ["tech", "programming", "education", "thriller"],
}];


const author = [{
        id: 1,
        name: "Pavan",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book", "123B"],
    }
];


const publication = [{
    id: 1,
    name: "writeX",
    books: ["12345Book"],
}];

module.exports = {
    books,
    author,
    publication
};