const mssql = require("../connection.js");

class User {
  async addSignedUpUser(user) {
    const request = new mssql.Request();
    this.prepareRequest(request, user);
    await request.query(`
        insert into NodeUsers
          (UserName,Email,PasswordHash)
        values
          (@UserName,@Email,@Password)
    `);
  }

  prepareRequest(request, user) {
    request.input("UserName", mssql.VarChar, user.username);
    request.input("Email", mssql.VarChar, user.email);
    request.input("Password", mssql.NVarChar, user.password);
  }
}
module.exports = User;
