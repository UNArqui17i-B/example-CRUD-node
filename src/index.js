'use strict';

const express = require('express');
const status = require('http-status');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const HOST_PORT = process.env.HOST_PORT || '3000';

let app = express();

// config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/books`);
const Book = mongoose.model('Book', require('./models/book'), 'books');

// routes
app.use('/books', require('./resources/books')(Book));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = status.NOT_FOUND;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || status.INTERNAL_SERVER_ERROR);
    res.send({'error': err.message});
});

app.listen(HOST_PORT);

