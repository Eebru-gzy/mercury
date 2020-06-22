const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class authentication {
	/*
	 *handles password encryption
	 * @params {String} bcryptHasher
	 */
	async bcryptHahser(password) {
		const salt = await bcrypt.genSalt(process.env.BCRYPTSALT);
		const bcryptPassword = await bcrypt.hash(password, salt);
		return bcryptPassword;
	}
	/*
	 * handles password compare with hash
	 * @params {String, String} bcryptCompare
	 */
	async bcryptCompare(bcryptHash, userPass) {
		const validPassword = await bcrypt.compare(bcryptHash, userPass);
		if (!validPassword) {
			return res.status(401).json({ message: "Incorrect Password" });
		}
	}
	/*
	 * handles token creation
	 * @params {String} jwtCreate
	 */
	jwtCreate(userPayload) {
		const payload = {
			user: userPayload,
		};
		return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 60 * 60 });
	}
	/*
   * handles token verification
	 * @params {Object, Object} jwtVerify
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