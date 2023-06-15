const express = require("express");
const multer = require("multer");
const router = express.Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser());
require("../db/conn");

const user = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("welcome to home page router");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/public/Images`);
  },

  filename: function (req, file, cb) {
    console.log("hello world");
    // file ka name hum is tarha store karin gay

    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.get("/register", (req, res) => {
  res.send("welcome to register page router");
});

router.post("/register", upload.array("image", 12), async (req, res) => {
  try {
    // is se humin image ka new name mil jay ga jo hum ne store karna ha
    const files = req.files; //req.file.filename[0];
    // if (req.files.file) {
    //   req.files.forEach(function (files) {
    //     console.log("the value is :", files.filename);
    //   });
    //   console.log("helo");
    // }
    const image = [];
    for (let i = 0; i < files.length; i++) {
      image[i] = files[i].filename;
    }

    console.log("the value is :", image);
    const { name, email, phone, password } = req.body;

    const user1 = new user({ name, email, phone, password, image });

    const data = await user1.save();
    if (data) {
      return res.status(200).json({ message: "Data saved succesfuuly" });
    }
  } catch (err) {
    console.log("the error is :", err);
  }
  //   console.log(req.body);
  //   res.json({ message: req.body });
});

//todo this is for the single image to be uploaded
// router.post("/register", upload.single("image"), async (req, res) => {
//   try {
//     // is se humin image ka new name mil jay ga jo hum ne store karna ha
//     const image = req.file.filename[0];
//     console.log("the value is :", image);
//     const { name, email, phone, password } = req.body;

//     const user1 = new user({ name, email, phone, password, image });

//     const data = await user1.save();
//     if (data) {
//       return res.status(200).json({ message: "Data saved succesfuuly" });
//     }
//   } catch (err) {
//     console.log("the error is :", err);
//   }
//   //   console.log(req.body);
//   //   res.json({ message: req.body });
// });

module.exports = router;
