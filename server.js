'use strict';

const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 8090;
const expressGraphQL = require('express-graphql')
const schema = require('./src/schema/schema')
const logger = require('turbo-logger').createStream({});
const Auth = require('./src/config/auth');
const bodyParser = require('body-parser');
const auth = new Auth();

app.use('/graphql', bodyParser.json(), expressGraphQL({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
    })
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