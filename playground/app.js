const express = require("express");
require("dotenv").config();
var cors = require("cors");
const port = 3000;
const morgan = require("morgan");
const sequelize = require("./config/database");
const Notification = require("./config/firebase");
const app = express();
app.use(cors());
require("./cron");
const API = require("./middleware/apikey");
// var bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: "200mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "200mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb" }));
app.use(express.static("public"));
app.use(morgan("combined"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});
app.use("/uploads", express.static("uploads"));
require("./router.js")(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tankhwa Patra." });
});
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
