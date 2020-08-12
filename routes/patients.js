const express = require("express");
const router = express.Router();
const Patient = require("../services/patient-service");
const patient = new Patient();

router.get("/", async (req, res) => {
  res.send(await patient.getPatients());
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  res.send(await patient.getPatient(id));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  res.send(await patient.deletePatient(id));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const p = req.body;
  res.send(await patient.addPatient(p));
});

router.put("/", async (req, res) => {
  console.log(req.body);
  const p = req.body;
  res.send(await patient.editPatient(p));
});

module.exports = router;
