const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'I am a secret'

class authentication {

  
  bcryptHasher(password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashed) => {
        if (err) {
          throw err;
        }
        return hashed
      })
    })
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
    return jwt.sign(payload, secret, { expiresIn: 60 * 60 });
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