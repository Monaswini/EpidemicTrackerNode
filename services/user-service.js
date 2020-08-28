const mssql = require("../connection.js");

class User {
  async addUser(user) {
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
    request.input("UserName", mssql.VarChar, user.Name);
  }
}
module.exports = User;
