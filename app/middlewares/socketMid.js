const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  
  //console.log(socket)
  const { token } = socket;
 
  const jwtToken = token;
  if (!jwtToken) {
    return next(new Error("Failed to authenticate socket"));
  }

  return jwt.verify(jwtToken, process.env.SECURITY_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return next(new Error("Failed to authenticate socket"));
    }

    socket.decoded = decoded;
    return next();
  });
};