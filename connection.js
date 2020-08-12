const mssql = require("mssql/msnodesqlv8");
const config = require("./config/config.js");
mssql.connect(config);
module.exports = mssql;

// async getConnection() {
//   await mssql.connect(config);
// }
