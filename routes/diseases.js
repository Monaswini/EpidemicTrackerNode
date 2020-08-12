const express = require("express");
const router = express.Router();
const Disease = require("../services/disease-service");
const disease = new Disease();

router.get("/", async (req, res) => {
  res.send(await disease.getDiseases());
});

module.exports = router;
