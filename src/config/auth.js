'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const logger = require('turbo-logger').createStream({});


class authentication {



	/**
	 * Handles password encryption
	 * @param {String} password 
	 */
	async bcryptHahser(password) {
		try {
			const salt = await bcrypt.genSalt(config.bcrypt_salt_rounds);
			const bcryptPassword = await bcrypt.hash(password, salt);
			return bcryptPassword;
		}
		catch(error) {
			logger.error("could not hash password ",error)
			return error;
		}
	}



	/**
	 * 
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Function} next 
	 */
	async routeValidator(req, res, next) {
		if(req.headers.hasOwnProperty('source') && (req.headers.source != 'login' 
			|| req.headers.source != 'signup')) {
			return next();
		}
		const jwtToken = req.headers.authorization ? req.headers.authorization : null;
		return await this.jwtVerify(jwtToken);
	}


	/**
	 * Handles password compare with hash
	 * @param {String} bcryptHash 
	 * @param {String} userPass 
	 */
	async bcryptCompare(bcryptHash, userPass) {
    try {
		const validPassword = await bcrypt.compare(bcryptHash, userPass);
      return validPassword;
    } catch (error) {
      logger.error("could not hash password ", error);
			return error;
    }
	}
	


	/**
	 * Handles JWT Creation
	 * @param {Object} userPayload 
	 */
	jwtCreate(userPayload) {
		const payload = {
			user: userPayload,
		};
		return jwt.sign(payload, config.auth_key, { expiresIn: 60 * 60 });
	}


	
	/**
	 * Handles Token Verification
	 * @param {Object} req 
	 * @param {Object} res 
	 */
	jwtVerify(req, res) {
		try {
			//the token
			const jwtToken = req.headers.authorization;
			if (!jwtToken) {
				return res.status(403).json({ msg: "Authorization Denied" });
			}
			const payload = jwt.verify(jwtToken, secret);
			req.userPayload = payload.user;
		} catch (err) {
			res.status(401).json({ message: "Token is not valid" });
		}
	}
}

module.exports = authentication;