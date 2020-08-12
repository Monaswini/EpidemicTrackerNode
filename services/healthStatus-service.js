const mssql = require("mssql/msnodesqlv8");
const config = require("../config/config.js");

class HealthStatus {
  async getHealthStatuses() {
    await mssql.connect(config);
    const result = await mssql.query(
      `select id, status from PatientCurrentStatus`
    );
    return result.recordset;
  }
}
module.exports = HealthStatus;
