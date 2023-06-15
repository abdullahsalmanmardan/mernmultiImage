const jwt = require("jsonwebtoken");
const user = require("../model/userSchema");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const authenticate = async (req, res, next) => {
  try {
    //* get the token from the cookie.
    try {
      const token = req.cookies.jwttoken;
    } catch (e) {
      console.log("token not found");
    }
    // * TOKEN JO HUMIN MILA HA WO HUM VERIFY KAR RHY HA SECRET KEY KE SATH
    const verifyToken = jwt.verify(token, process.env.SECRECTKEY);
    //TODO IS verifytoken ma humin id mil jay gi
    //console.log("the verify token value is ", token, verifyToken);
    const rootuser = await user.findOne({
      //* checking id form token matches with the id in the database.
      _id: verifyToken._id,
    });

    if (!rootuser) {
      res.status(400).json({ message: "no token found " });
    }
    //todo ye humin frontend pe easily mil jay ga is liyay ye hum use kar rahy ha
    req.token = token;
    req.rootuser = rootuser;
    req.userId = rootuser._id;
    next();
  } catch (err) {
    res.status(400).json({ message: "no token found " });
  }
};

module.exports = authenticate;
