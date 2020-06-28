'use strict';

let knex = require('./db');
let bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
