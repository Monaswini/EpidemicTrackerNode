const mssql = require("../connection.js");

class Patient {
  async getPatients() {
    //await mssql.connect(config);

    const result = await mssql.query(
      `select p.id, 
      RTRIM(LTRIM(
        CONCAT(
            COALESCE(FirstName + ' ', '')
            , COALESCE(LastName + ' ', '')))) AS name,
      age, sex, d.name as disease, dt.name as diseaseType, pcs.status, t.joiningDate, t.relievingDate, h.name as hospital
      from patient as p 
      inner join PatientTreatmentDetail as t 
      on p.ID=t.PatientId 
      inner join Disease as d 
      on t.DiseaseId=d.ID
      inner join DiseaseType as dt
      on d.DiseaseTypeId=dt.ID
      inner join PatientCurrentStatus as pcs
      on t.PatientCurrentStatusId=pcs.ID
      inner join Hospital as h
      on t.HospitalId=h.Id
      where p.IsActive=1
      `
    );
    return result.recordset;
  }

  async getPatient(id) {
    const request = new mssql.Request();
    request.input("PatientId", mssql.Int, id);

    var result = await request.query(`select p.id, firstName, lastName,
      age, sex, aadhaarNumber, p.phone, email, d.name as disease, dt.name as diseaseType, pcs.status, t.joiningDate, t.relievingDate, t.prescription, h.name as hospital
      from patient as p
      inner join PatientTreatmentDetail as t
      on p.ID=t.PatientId
      inner join Disease as d
      on t.DiseaseId=d.ID
      inner join DiseaseType as dt
      on d.DiseaseTypeId=dt.ID
      inner join PatientCurrentStatus as pcs
      on t.PatientCurrentStatusId=pcs.ID
      inner join Hospital as h
      on t.HospitalId=h.Id where p.ID=@PatientId`);

    return result.recordset;
  }

  async deletePatient(id) {
    const request = new mssql.Request();
    request.input("PatientId", mssql.Int, id);

    await request.query(`update patient set IsActive=0 where ID=@PatientId`);
  }

  async addPatient(p) {
    const request = new mssql.Request();

    request.input("FirstName", mssql.NVarChar, p.firstName);
    request.input("LastName", mssql.NVarChar, p.lastName);
    request.input("Age", mssql.SmallInt, p.age);
    request.input("Sex", mssql.NVarChar, p.sex);
    request.input("Phone", mssql.NVarChar, p.phone);
    request.input("AadhaarNumber", mssql.BigInt, p.aadhaarNumber);
    request.input("Email", mssql.NVarChar, p.email);
    request.input("IsActive", mssql.Bit, 1);

    request.input("cBuildingNo", mssql.NVarChar, p.addresses[0].buildingNo);
    request.input("cArea", mssql.NVarChar, p.addresses[0].area);
    request.input("cStreet", mssql.NVarChar, p.addresses[0].street);
    request.input("cCity", mssql.NVarChar, p.addresses[0].city);
    request.input("cState", mssql.NVarChar, p.addresses[0].state);
    request.input("cPinCode", mssql.Int, p.addresses[0].pinCode);
    request.input("cAddressType", mssql.Int, p.addresses[0].addressType);

    request.input("pBuildingNo", mssql.NVarChar, p.addresses[1].buildingNo);
    request.input("pArea", mssql.NVarChar, p.addresses[1].area);
    request.input("pStreet", mssql.NVarChar, p.addresses[1].street);
    request.input("pCity", mssql.NVarChar, p.addresses[1].city);
    request.input("pState", mssql.NVarChar, p.addresses[1].state);
    request.input("pPinCode", mssql.Int, p.addresses[1].pinCode);
    request.input("pAddressType", mssql.Int, p.addresses[1].addressType);

    request.input(
      "OccupationType",
      mssql.NVarChar,
      p.occupation.occupationType
    );
    request.input("CompanyName", mssql.NVarChar, p.occupation.companyName);
    request.input("wPhone", mssql.NVarChar, p.occupation.phone);
    request.input("wBuildingNo", mssql.NVarChar, p.occupation.buildingNo);
    request.input("wArea", mssql.NVarChar, p.occupation.area);
    request.input("wStreet", mssql.NVarChar, p.occupation.street);
    request.input("wCity", mssql.NVarChar, p.occupation.city);
    request.input("wState", mssql.NVarChar, p.occupation.state);
    request.input("wPinCode", mssql.Int, p.occupation.pinCode);

    request.input("DiseaseId", mssql.Int, p.treatmentDetailDto.disease);
    request.input("HospitalId", mssql.Int, p.treatmentDetailDto.hospital);
    request.input(
      "Prescription",
      mssql.NVarChar,
      p.treatmentDetailDto.prescription
    );
    request.input(
      "PatientCurrentStatusId",
      mssql.Int,
      p.treatmentDetailDto.patientCurrentStatus
    );
    request.input(
      "JoiningDate",
      mssql.DateTime2,
      p.treatmentDetailDto.joiningDate
    );
    request.input(
      "RelievingDate",
      mssql.DateTime2,
      p.treatmentDetailDto.relievingDate >= p.treatmentDetailDto.joiningDate
        ? p.treatmentDetailDto.relievingDate
        : null
    );
    request.input("CreatedBy", mssql.NVarChar, "Admin");
    request.input("CreatedDate", mssql.DateTime2, new Date());
    request.input("LastUpdatedBy", mssql.NVarChar, "Admin");
    request.input("LastUpdatedDate", mssql.DateTime2, new Date());

    var result = await request.query(`
        insert into patient
          (FirstName,LastName,Age,Sex,Phone,CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate,AadhaarNumber,Email,IsActive)
        values
          (@FirstName,@LastName,@Age,@Sex,@Phone,@CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,
            @AadhaarNumber,@Email,@IsActive); SELECT SCOPE_IDENTITY() AS id;
      `);

    //const result = await request.query(`SELECT SCOPE_IDENTITY() as id`);
    const patientId = result.recordset[0].id;
    console.log(patientId);
    request.input("PatientId", mssql.Int, patientId);

    await request.query(`
        insert into Address
          (BuildingNo,Area,Street,City,State,PinCode,AddressType,CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate,PatientID)
      values
          (@cBuildingNo,@cArea,@cStreet,@cCity,@cState,@cPinCode,@cAddressType,
            @CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,@PatientId),

          (@pBuildingNo,@pArea,@pStreet,@pCity,@pState,@pPinCode,@pAddressType,
            @CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,@PatientId)
      `);

    await request.query(`
        insert into PatientOccupation
          (PatientId,OccupationType,CompanyName,BuildingNo,Area,Street,
          City,State,PinCode,WorkPhone,CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate)
        values
            (@PatientId,@OccupationType,@CompanyName,@wBuildingNo,@wArea,@wStreet,@wCity,@wState,@wPinCode,@wPhone,
              @CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate)
          `);

    await request.query(`
        insert into PatientTreatmentDetail
          (PatientId,DiseaseId,HospitalId,Prescription,PatientCurrentStatusId,RelievingDate,
          CreatedBy,CreatedDate,LastUpdatedBy,LastUpdatedDate,JoiningDate)
        values
        (@PatientId,@DiseaseId,@HospitalId,@Prescription,@PatientCurrentStatusId,@RelievingDate,
          @CreatedBy,@CreatedDate,@LastUpdatedBy,@LastUpdatedDate,@JoiningDate)
      `);
  }

  async editPatient(p) {
    console.log("edit api");
    //await mssql.connect(config);
    const request = new mssql.Request();

    request.input("DiseaseId", mssql.Int, p.disease);
    request.input("HospitalId", mssql.Int, p.hospital);
    request.input("Prescription", mssql.NVarChar, p.prescription);
    request.input("PatientCurrentStatusId", mssql.Int, p.patientCurrentStatus);
    request.input("JoiningDate", mssql.DateTime2, p.joiningDate);
    request.input(
      "RelievingDate",
      mssql.DateTime2,
      p.relievingDate >= p.joiningDate ? p.relievingDate : null
    );
    request.input("CreatedBy", mssql.NVarChar, "Admin");
    request.input(
      "CreatedDate",
      mssql.DateTime2,
      new Date().toLocaleDateString()
    );
    request.input("LastUpdatedBy", mssql.NVarChar, "Admin");
    request.input(
      "LastUpdatedDate",
      mssql.DateTime2,
      new Date().toLocaleDateString()
    );
    request.input("Id", mssql.Int, p.id);

    await request.query(`
      update PatientTreatmentDetail set
        DiseaseId=@DiseaseId,HospitalId=@HospitalId,Prescription=@Prescription,PatientCurrentStatusId=@PatientCurrentStatusId,
        RelievingDate=@RelievingDate,CreatedBy=@CreatedBy,CreatedDate=@CreatedDate,
        LastUpdatedBy=@LastUpdatedBy,LastUpdatedDate=@LastUpdatedDate,JoiningDate=@JoiningDate
      where patientId=@Id
    `);
  }
}

module.exports = Patient;
