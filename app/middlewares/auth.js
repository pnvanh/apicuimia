const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(" ");
    if (prefix === "Account") {
      return jsonwebtoken.verify(token, process.env.SECURITY_KEY_TOKEN, (err, decoded) => {
        if (err) {
          res.status(403).send({
            success: false,
            message: "Failed to authenticate token."
          });
        }
        req.decoded = decoded;
        return next();
      });
    }
  }

  return res.status(403).send({
    success: false,
    message: "No token provided"
  });
};