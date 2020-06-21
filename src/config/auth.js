const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


/*
*handles password encryption and authentication
* @params {String} bcryptHasher
* @params {String} jwtCreate
*/


class authentication {
  async bcryptHahser(password) {
		const salt = await bcrypt.genSalt(process.env.BCRYPTSALT);
    const bcryptPassword = await bcrypt.hash(password, salt);
    return bcryptPassword;
  }
  
  async bcryptCompare(bcryptHash, userPass) {
    const validPassword = await bcrypt.compare(bcryptHash, userPass);

    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }
  };

  jwtCreate(userPayload) {
    const payload = {
      user: userPayload,
    };
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 60 * 60 });
  }

  jwtVerify(req, res) {
    try {
			//the token
      const jwtToken = req.headers.authorization;

      //or this. I dont know  the difference yet.
      // const jwtToken = req.header('bearer');
      
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