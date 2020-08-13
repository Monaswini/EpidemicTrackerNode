const mssql = require("../connection.js");

class Disease {
  async getDiseases() {
    const result = await mssql.query(
      `select id, name, diseaseTypeId from disease`
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
    request.input("Name", mssql.NVarChar, disease.name);
    request.input("DiseaseTypeId", mssql.Int, disease.diseaseTypeId);
    request.input("IsActive", mssql.Bit, 1);

    request.input("CreatedBy", mssql.NVarChar, "Admin");
    request.input("CreatedDate", mssql.DateTime2, new Date());
    request.input("LastUpdatedBy", mssql.NVarChar, "Admin");
    request.input("LastUpdatedDate", mssql.DateTime2, new Date());
  }
}

module.exports = Disease;
