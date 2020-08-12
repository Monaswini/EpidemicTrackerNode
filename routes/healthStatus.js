const express = require("express");
const router = express.Router();
const HealthStatus = require("../services/healthStatus-service");
const healthStatus = new HealthStatus();

router.get("/", async (req, res) => {
  res.send(await healthStatus.getHealthStatuses());
});

module.exports = router;
