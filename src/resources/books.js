'use strict';

const express = require('express');
const status = require('http-status');

module.exports = function (Book) {
    const router = express.Router();

    // list of all books
    router.get('/', function (req, res) {
        Book.find().exec(function (err, data) {
            /* istanbul ignore next */
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(status.OK).send(data);
            }
        });
    });

    // search for id
    router.get('/:id', function (req, res) {
        Book.findOne({id: req.params.id}, function (err, data) {
            /* istanbul ignore next */
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(status.OK).send(data);
            }
        });
    });

    // create a book
    router.post('/', function (req, res) {
        let book = new Book(req.body);
        book.save(function (err, data) {
            /* istanbul ignore next */
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(status.CREATED).send(data);
            }
        });
    });

    // update a book
    router.put('/:id', function (req, res) {
        Book.update({id: req.params.id}, req.body, function (err, data) {
            /* istanbul ignore next */
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(status.OK).send(data);
            }
        });
    });

    // delete a book
    router.delete('/:id', function (req, res) {
        Book.find({id: req.params.id}).remove().exec(function (err, data) {
            /* istanbul ignore next */
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(status.OK).send(data);
            }
        });
    });

    return router;
};
