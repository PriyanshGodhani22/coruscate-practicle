const jwt = require('jsonwebtoken');
const secretKey = "123@456";

module.exports.verifyToken = (req, res, next) => {
    if (req.url.includes("login") || req.method == "GET") {
        return next();
    }
    let token =  req.headers.authorization;
    let payload;
    try {
		payload = jwt.verify(token, secretKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send("not verified")
		}
		
	}
  return next();
};