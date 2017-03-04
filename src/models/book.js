'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    title: {type: String, required: true},
    genre: {type: String, required: false},
    year: {type: Number, required: false},
    authors: [{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }]
});

module.exports.set('toObject', {virtuals: true});
module.exports.set('toJSON', {virtuals: true});

