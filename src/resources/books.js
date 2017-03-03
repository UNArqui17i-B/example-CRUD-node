'use strict';

const express = require('express');
const status = require('http-status');

module.exports = function () {
    const router = express.Router();

    // list of all books
    router.get('/', function (req, res) {
        res.status(status.OK).send({
            working: true
        });
    });

    return router;
};