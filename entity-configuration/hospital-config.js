const mssql = require("mssql/msnodesqlv8");
let hospital = [
  {
    name: "id",
    datatype: mssql.Int,
  },
  {
    name: "name",
    datatype: mssql.NVarChar,
  },
];

module.exports = hospital;
