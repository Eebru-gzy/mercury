// const options = {
// 	client: "mysql",
// 	connection: {
// 		host: "127.0.0.1",
// 		user: "user12",
// 		password: "s$cret",
// 		database: "mydb",
// 	},
// };
// let knex = require("knex")({
// 	client: "mysqlx",
// 	connection: config.mysql.connection,
// 	ssl: true,
// 	migrations: {
// 		tableName: "migrations",
// 	},
// 	pool: config.mysql.pool,
// });

let config = require("./src/config/config");




let knex = require("knex")({
	client: "mysql",
	version: "5.7",
	connection: {
		host: "127.0.0.1",
		user: "test",
		password: "test",
		database: "mercury",
	},
});

knex.schema
	.createTable("cars", (table) => {
		table.increments("id");
		table.string("name");
		table.integer("price");
	})
	.then(() => console.log("table created"))
	.catch((err) => {
		console.log(err);
		throw err;
	})
	.finally(() => {
		knex.destroy();
	});
