const jwt = require("jsonwebtoken");
const secretKey = require("../helper");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) {
    console.log("authenticating.....");
    return res.status(401).send("Access denied.No token found.");
  }
  try {
    const decodedPayload = jwt.verify(token, secretKey);
    req.email = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
