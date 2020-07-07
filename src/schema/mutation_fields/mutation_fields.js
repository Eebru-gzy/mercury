'use strict';

const Mutation = require('../mutations/user')

module.exports = {
    user_registration: Mutation.registerUser(),
    user_login: Mutation.loginUser()
}