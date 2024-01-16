const express = require("express");
const {PORT, mongoDBURL} = require("./config");
const mongoose = require("mongoose");
const cors = require('cors');

const {router} = require('./routes/booksRoute');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(mongoDBURL)
    .then(() => "MongoDB connected");

app.use('/books', router);

app.listen(3000, () => {
    console.log(`Server started at ${PORT}`);
});