const mssql = require("../connection.js");

class Disease {
  async getDiseases() {
    const result = await mssql.query(
      `select d.id, d.name, diseaseTypeId, dt.name as diseaseType from Disease as d
      inner join DiseaseType as dt
      on diseaseTypeId=dt.id`
    );
    return result.recordset;
  }

  async addDisease(disease) {
    const request = new mssql.Request();

    this.prepareRequest(request, disease);

    await request.query(`
        insert into disease
          (Name,DiseaseTypeId,CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate,IsActive)
        values
          (@Name,@DiseaseTypeId,@CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,@IsActive)
    `);
  }

  prepareRequest(request, disease) {
    request.input("Name", mssql.NVarChar, disease.diseaseName);
    request.input("DiseaseTypeId", mssql.Int, disease.diseaseTypeId);
    request.input("IsActive", mssql.Bit, 1);

    request.input("CreatedBy", mssql.NVarChar, "Admin");
    request.input("CreatedDate", mssql.DateTime2, new Date());
    request.input("LastUpdatedBy", mssql.NVarChar, "Admin");
    request.input("LastUpdatedDate", mssql.DateTime2, new Date());
  }

  async getDiseaseTypes() {
    const result = await mssql.query(`select id, name from DiseaseType`);
    return result.recordset;
  }
}
module.exports = Disease;
