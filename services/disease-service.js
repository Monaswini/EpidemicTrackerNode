const mssql = require("mssql/msnodesqlv8");
const config = require("../config/config.js");

class Disease {
  async getDiseases() {
    await mssql.connect(config);
    const result = await mssql.query(`select id, name from disease`);
    return result.recordset;
  }
}
module.exports = Disease;
