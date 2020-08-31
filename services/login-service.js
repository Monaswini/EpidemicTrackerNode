const mssql = require("../connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../helper");

class Login {
  async verifyUser(user) {
    const request = new mssql.Request();

    const result = await request.query(
      `select passwordHash from NodeUsers where Email='${user.email}'`
    );
    let match;
    if (result.recordset[0]) {
      const actualPassword = result.recordset[0].passwordHash;
      match = await bcrypt.compare(user.password, actualPassword);
    } else return null;
    if (match) {
      const token = jwt.sign({ email: user.email }, secretKey);
      return { token };
    } else return null;
  }
}
module.exports = Login;
