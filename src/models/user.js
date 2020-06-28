'use strict';

const bookshelf = require('../bookshelf');

let User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

})



module.exports = bookshelf.model('User', User);