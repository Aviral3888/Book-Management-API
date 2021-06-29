let books = [{
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publication: 1,
    category: ["tech", "programming", "education", "thriller"],
}, {
    ISBN: "123NewBook",
    title: "Full Stack Web Development",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [2],
    publication: 1,
    category: ["tech", "programming", "thriller"],
}];


let author = [{
        id: 1,
        name: "Pavan",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book", "123NewBook"],
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