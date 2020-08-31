const mssql = require("../connection.js");

class Hospital {
  async getHospitals() {
    const result = await mssql.query(`select id, name from hospital`);
    return result.recordset;
  }

  async addHospital(hospital) {
    const request = new mssql.Request();

    this.prepareRequest(request, hospital);
    await request.query(`
        insert into Hospital
          (Name,Area,Street,City,State,PinCode,Phone,CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate,IsActive)
        values
          (@Name,@Area,@Street,@City,@State,@PinCode,@Phone,
            @CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,@IsActive)
    `);
  }

  prepareRequest(request, hospital) {
    request.input("Name", mssql.NVarChar, hospital.hospitalName);
    request.input("Area", mssql.NVarChar, hospital.area);
    request.input("Street", mssql.NVarChar, hospital.street);
    request.input("City", mssql.NVarChar, hospital.city);
    request.input("State", mssql.NVarChar, hospital.state);
    request.input("PinCode", mssql.Int, hospital.pinCode);
    request.input("Phone", mssql.NVarChar, hospital.phone);
    request.input("IsActive", mssql.Bit, 1);

    request.input("CreatedBy", mssql.NVarChar, "Admin");
    request.input("CreatedDate", mssql.DateTime2, new Date());
    request.input("LastUpdatedBy", mssql.NVarChar, "Admin");
    request.input("LastUpdatedDate", mssql.DateTime2, new Date());
  }
}

module.exports = Hospital;
