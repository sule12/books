const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.arguments(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/booksDB", { useNewUrlParser: true });

const bookSchema = {
    title: String,
    content: String
}
const Book = mongoose.model("Book", bookSchema);

//////////////////////////////////////Get All Books///////////////////////////////////////////

app.get("/books", function (req, res) {
    Book.find(function (err, getBooks) {
        if (!err) {
            res.send(getBooks);
        } else {
            res.send(err);
        }
    });
});

////////////////////////////////Post a Book//////////////////////////////////////////////////

app.post("/books", function (req, res) {
    const newBook = new Book({
        title: req.body.title,
        content: req.body.content
    });
    newBook.save(function (err) {
        if (!err) {
            res.send("Successfully added a new book");
        } else {
            res.send(err);
        }
    });
});

////////////////////////////Delete all Books////////////////////////////////////////////////

app.delete("/books", function (req, res) {
    Book.deleteMany(function (err) {
        if (!err) {
            res.send("Successfully deleted all books");
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});