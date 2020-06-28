'use strict';

const {
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const UserType = require('../types/user').User
const logger = require('turbo-logger').createStream({});
const UserService = require('../../services/user');

module.exports = {
    registerUser: () => {
        return {
            type: UserType,
            args: {
                password: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(value, args) {
                const data = {
                    email: args.email,
                    password: args.password
                }
                try {
                    const user = await new UserService().registerUser(data);
                    return user;
                }
                catch(err) {
                    logger.error("An error occured while creating user : ", err)
                    throw new Error(JSON.stringify(err));
                }
            }
        }
    }
}