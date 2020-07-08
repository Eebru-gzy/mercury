"use strict";

const Auth = require("../config/auth");
const auth = new Auth();
const UserModel = require("../models/user");
const utils = require("../config/utils");
const constants = require("../config/constants");
const statusHelper = require("../config/status_helper");

class User {
	constructor() {
		this.logger = require("turbo-logger").createStream({});
	}

	/**
	 * Register Customer.
	 * @param {Object} payload
	 */
	async registerUser(payload) {
		const { email, password } = payload;
		const hashedPassword = await auth.bcryptHahser(password);
		payload.password = hashedPassword;

		return new Promise((resolve, reject) => {
			return new UserModel()
				.where({ email: email })
				.fetchAll()
				.then(async (UserResponse) => {
					const parsedObject = await utils.parseJSON(UserResponse);
					if (!utils.emptyArrayChecker(parsedObject)) {
						return reject(
							statusHelper.badRequestResponse(constants.USER_EXISTS_ERROR)
						);
					}
					return await new UserModel()
						.save(payload, { method: "insert" })
						.then((res) => {
							this.logger.log("User saved successfully");
							return resolve(utils.parseJSON(res));
						})
						.catch((error) => {
							this.logger.error("An error occured while saving data : ", error);
							throw error;
						});
				})
				.catch((error) => {
					this.logger.error(error);
					return reject(error);
				});
		});
	}

	/**
	 * Login Customer.
	 * @param {Object} payload
	 */
	async loginUser(payload) {
		const { email, password } = payload;
		return new Promise((resolve, reject) => {
			return new UserModel()
				.where({ email: email })
				.fetchAll()
				.then(async (user) => {
					const parsedUser = await utils.parseJSON(user);
					if (!utils.emptyArrayChecker(parsedUser)) {
						return reject(
							statusHelper.notFoundResponse(constants.USER_NOTFOUND_ERROR)
						);
					}
					const checkPass = await auth.bcryptCompare(
						password,
						parsedUser[0].password
					);
					if (!checkPass) {
						 resolve("Incorrect Username or Password, give it another shot?")
					} else {
            const payload = { email };
            const token = await auth.jwtCreate(payload);
            try {
              resolve(utils.parseJSON(token));
            } catch (error) {
              this.logger.error("An error occured while generating token : ", error);
            }
					}
				});
		});
	}
}

module.exports = User;
