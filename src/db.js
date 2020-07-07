'use strict';

let config = require('./config/config');

let knex = require("knex")({
	client: "mysql",
	version: "5.7",
	connection: config.mysql.connection,
	ssl: true,
	migrations: {
		tableName: "migrations",
	},
	pool: config.mysql.pool,
});

module.exports = knex;
