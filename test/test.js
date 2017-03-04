'use strict';

const superagent = require('superagent');

const express = require('express');
const status = require('http-status');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

describe('express rest api server', function () {
    let id;

    let app = express();

    // config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    mongoose.connect('mongodb://localhost:27017/books');
    const Book = mongoose.model('Book', require('../src/models/book'), 'books');

    // routes
    app.use('/books', require('../src/resources/books')(Book));

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

    app.listen(3000);

    it('post object', function (done) {
        superagent.post('localhost:3000/books')
            .send({
                id: 1,
                title: 'cien años de soledad',
                authors: [{
                    firstName: 'Gabriel',
                    lastName: 'García'
                }]
            })
            .end(function (err, res) {
                res.status.should.be.equal(201);
                id = res.body.id;
                done();
            });
    });

    it('retrieves an object', function (done) {
        superagent.get('http://localhost:3000/books/' + id)
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });

    it('retrieves a collection', function (done) {
        superagent.get('http://localhost:3000/books')
            .end(function (err, res) {
                res.status.should.be.equal(200);
                res.body.length.should.be.equal(1);
                done();
            });
    });

    it('updates an object', function (done) {
        superagent.put('http://localhost:3000/books/' + id)
            .send({
                id: 1,
                title: 'cien años de soledad',
                authors: [{
                    firstName: 'Gabriel',
                    lastName: 'García Marquez'
                }]
            })
            .end(function (e, res) {
                res.status.should.be.equal(200);
                done();
            });
    });

    it('checks an updated object', function (done) {
        superagent.get('http://localhost:3000/books/' + id)
            .end(function (e, res) {
                res.status.should.be.equal(200);
                res.body.authors[0].lastName.should.be.equal('García Marquez');
                done();
            });
    });

    it('removes an object', function (done) {
        superagent.del('http://localhost:3000/books/' + id)
            .end(function (e, res) {
                res.status.should.be.equal(200);
                done();
            });
    });

    it('empty collection', function (done) {
        superagent.get('http://localhost:3000/books')
            .end(function (err, res) {
                res.status.should.be.equal(200);
                res.body.length.should.be.equal(0);
                done();
            });
    });
});
