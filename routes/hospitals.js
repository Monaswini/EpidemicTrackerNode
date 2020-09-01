const express = require("express");
const router = express.Router();
const Hospital = require("../services/hospital-service");
const hospital = new Hospital();
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send(await hospital.getHospitals());
});

router.post("/", auth, async (req, res) => {
  const h = req.body;
  res.send(await hospital.addHospital(h));
});

module.exports = router;
