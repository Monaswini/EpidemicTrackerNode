const express = require("express");
const router = express.Router();
const Disease = require("../services/disease-service");
const disease = new Disease();

router.get("/", async (req, res) => {
  res.send(await disease.getDiseases());
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const d = req.body;
  res.send(await disease.addDisease(d));
});

router.get("/types", async (req, res) => {
  res.send(await disease.getDiseaseTypes());
});

module.exports = router;
