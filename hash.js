const bcrypt = require("bcrypt");
const salt = bcrypt.genSalt(10);
module.exports = salt;
