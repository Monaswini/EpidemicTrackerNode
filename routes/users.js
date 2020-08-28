const express = require("express");
const router = express.Router();
const User = require("../services/user-service");
const user = new User();

router.post("/", async (req, res) => {
  console.log(req.body);
  const u = req.body;
  res.send(await user.addUser(u));
});

module.exports = router;
