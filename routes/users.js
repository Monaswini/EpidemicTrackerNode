const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../services/user-service");
const user = new User();
//const salt = require("../hash");

router.post("/", async (req, res) => {
  console.log(req.body);
  const u = req.body;
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  u.password = await bcrypt.hash(u.password, salt);
  console.log(u);
  res.send(await user.addSignedUpUser(u));
});

module.exports = router;
