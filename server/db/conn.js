const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// * abdullah is username
//* lev is password
//* mernloginsingup is the database name
const Db = process.env.DATABASE;

mongoose
  .connect(Db)
  .then(() => {
    console.log("connnection is succesfull");
  })
  .catch(() => {
    console.log("error in connection");
  });
