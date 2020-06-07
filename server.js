'use strict';

const express = require('express');
const http = require('http');
const app = express();
const port = 8001;
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema.js')

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

const server = http.createServer(app);

server.listen(port, () => {
    console.log('server running on port ', port)
})