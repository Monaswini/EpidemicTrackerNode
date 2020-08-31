const express = require("express");
const patients = require("./routes/patients");
const hospitals = require("./routes/hospitals");
const diseases = require("./routes/diseases");
const healthStatus = require("./routes/healthStatus");
const signup = require("./routes/users");
const login = require("./routes/login");

const cors = require("cors");
const { json } = require("express");
const app = express();

app.use(cors());
app.use(json());
app.use("/api/patients", patients);
app.use("/api/hospitals", hospitals);
app.use("/api/diseases", diseases);
app.use("/api/healthStatuses", healthStatus);
app.use("/api/signup", signup);
app.use("/api/login", login);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}`));
