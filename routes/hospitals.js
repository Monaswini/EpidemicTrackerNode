const express = require("express");
const router = express.Router();
const Hospital = require("../services/hospital-service");
const hospital = new Hospital();

router.get("/", async (req, res) => {
  res.send(await hospital.getHospitals());
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const h = req.body;
  res.send(await hospital.addHospital(h));
});

module.exports = router;
