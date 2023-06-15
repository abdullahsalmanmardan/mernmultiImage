const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const path = "/F:/mernaddImageserver/public/Images/";
// todo by this we will get our pic in the brower
// * kis folder ma ha us ka link de dena ha hum ne
app.use("/public", express.static("public"));
require("./db/conn");
const user = require("./model/userSchema");
//* where our config file is present
dotenv.config({ path: "./config.env" });

//* ----------------- these all are middlewares
//*is se app json ko samjh jay ga
app.use(express.json());
//* to configure our routes
app.use(require("./routes/auth"));

app.listen(8080, () => {
  console.log("server listing to port 8080");
});
