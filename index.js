let express = require("express");
let patients = require("./routes/patients");
let hospitals = require("./routes/hospitals");
let diseases = require("./routes/diseases");
let healthStatus = require("./routes/healthStatus");

let cors = require("cors");
const { json } = require("express");
let app = express();

// const corsOpts = {
//   origin: "const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//   ],

//   allowedHeaders: [
//     'Content-Type',
//   ],
// };

// app.use(cors(corsOpts));",

//   methods: ["GET", "POST"],

//   allowedHeaders: ["Content-Type"],
// };

//app.use(cors(corsOpts));
app.use(cors());
app.use(json());
app.use("/api/patients", patients);
app.use("/api/hospitals", hospitals);
app.use("/api/diseases", diseases);
app.use("/api/healthStatuses", healthStatus);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}`));
