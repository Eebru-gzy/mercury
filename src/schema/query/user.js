'use strict';

const {
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const UserType = require('../types/user').allUserFields

module.exports = {
    //User queries goes here
    getAllUser: () => {
        return {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(value, args) {
                //User Resolver action goes Here
            }
        }
    }
}