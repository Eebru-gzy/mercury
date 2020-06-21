'use strict';

const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 8090;
const expressGraphQL = require('express-graphql')
const schema = require('./src/schema/schema')
const logger = require('turbo-logger').createStream({})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

//Return a success response for all calls not routed through graphql
function successResponse() {
    return {
        status: 200,
        message: 'Mercury up and running'
    }
}

app.get('*', (req, res) => {
    return res.send(successResponse());
})
app.post('*', (req, res) => {
    return res.send(successResponse())
})

const server = http.createServer(app);

server.listen(port, () => {
    logger.log('server running on port ', port)
})