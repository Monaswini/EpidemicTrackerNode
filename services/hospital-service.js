const mssql = require("mssql/msnodesqlv8");
const config = require("../config/config.js");

class Hospital {
  async getHospitals() {
    await mssql.connect(config);
    const result = await mssql.query(`select id, name from hospital`);
    return result.recordset;
  }
}
module.exports = Hospital;
