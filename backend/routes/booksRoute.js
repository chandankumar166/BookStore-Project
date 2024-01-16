const express = require('express');
const {Book} = require("../models/bookModel");

const router = express.Router();

// Creating a book
router.post('/', async (req, res) => {
    try {
        if (!(req.body.title && req.body.author && req.body.publishYear)) {
            res.status(400).send({message: "Missing input fileds"});
            return;
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        res.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Read all Books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({count: books.length, data: books});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Read a book by giving id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({message: 'Book not found'});
            return;
        }
        res.status(200).json(book);
    }
    catch (error) {
        console.log(error);
        res.status(404).send({message: "Book not Found"});
    }
});

// Updating the book using id
router.put('/:id', async (req, res) => {
    try {
        if (!(req.body.title && req.body.author && req.body.publishYear)) {
            res.status(400).send({message: "Missing input fileds"});
            return;
        }
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({message: "Book not found"});
            return;
        }
        await Book.findByIdAndUpdate(id, req.body);
        res.status(200).json({message: "Data got updated"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }

});

// Delete a book using it's id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send({message: 'Book not found'});
            return;
        }
        res.status(200).send({message: 'Book deleted successfully'});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.messge});
    }
});

module.exports = {router};