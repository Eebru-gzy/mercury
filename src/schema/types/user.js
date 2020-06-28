
'use strict';

const BookshelfType = require('graphql-bookshelf');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql')

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        email: {type: GraphQLString},
        phone_number: {type: GraphQLString},
        created_at: {type: GraphQLString},
        update_at: {type: GraphQLString}
    })
})

const allUserFields = new GraphQLObjectType({
    name: 'AllUser',
    fields: () => ({
        id: {type: GraphQLString},
        email: {type: GraphQLString},
        firest_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
    })
})

module.exports = {
    User,
    allUserFields
}