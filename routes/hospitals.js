const express = require("express");
const router = express.Router();
const Hospital = require("../services/hospital-service");
const hospital = new Hospital();

router.get("/", async (req, res) => {
  res.send(await hospital.getHospitals());
});

module.exports = router;
