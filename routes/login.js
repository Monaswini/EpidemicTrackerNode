const express = require("express");
const router = express.Router();
const Login = require("../services/login-service");
const login = new Login();

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  res.send(await login.verifyUser(user));
});

module.exports = router;
