const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//* where our config file is present
dotenv.config({ path: "./config.env" });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
});

//* first one is the table name to be created
//* second one is the schema for the table
const USER = mongoose.model("USER", userSchema);

//* ab humin jaha jaha chahiyay we will use it for post to write data to database
module.exports = USER;
