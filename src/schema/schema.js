'use strict';

const mutationFields = require('./mutation_fields/mutation_fields')
const queryFields =  require('./query_fields/query_fields')
const { GraphQLObjectType, GraphQLSchema, } = require('graphql')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queryFields
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutationFields
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})