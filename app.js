const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userModel = require("./Models/user");
const booksDetail = require("./Models/books");
const JWTService = require('../CommonLib/JWTtoken');
const encryptDecrypt = require("./encryption-decryption");
const commentDetail = require("./Models/comments");
const bodyParser = require("body-parser");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

dotenv.config();
app.use(bodyParser.json([]));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Swiggy-Clone Backend Server! endpoint : /api/ :D");
});

app.post(
  "/user",
  [
    check("firstname").isLength({ min: 3, max: 30 }),
    check("lastname").isLength({ min: 3, max: 30 }),
    check("age").isInt({ min: 0, max: 150 }),
    check("email").isEmail(),
    check("profileimage").isURL(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      // console.log("17",req.body);
      let userDetail = req.body;
      let response = await userModel.insertMany([userDetail]);
      // console.log("19",response);
      res.json(response);
    } catch (error) {
      // console.log("22");
      res.json(response);
    }
  }
);

app.post(
  "/books",
  [
    check("likes").isNumeric(),
    check("coverimage").isLength({ max: 1 }),
    check("content").isString(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      // console.log("17",req.body);
      let bookDetail = req.body;
      let response = await booksDetail.insertMany([bookDetail]);
      // console.log("19",response);
      res.json(response);
    } catch (error) {
      // console.log("22");
      res.json(response);
    }
  }
);

app.post("/books", [check("body").isString()], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    // console.log("17",req.body);
    let comment = req.body;
    let response = await commentDetail.insertMany([comment]);
    // console.log("19",response);
    res.json(response);
  } catch (error) {
    // console.log("22");
    res.json(response);
  }
});

app.post("/loginIn", async (req, res, next)=>{
  //check email and password
  const userDetail = await userModel.findOne({ email: req.body.email });
  console.log(userDetail, req.body.password);
  const isValidPassword = encryptDecrypt.decryptPassword(
    req.body.password,
    userDetail.password
  );

  if (isValidPassword) {
    let userData = {
      email: req.body.email,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      roleName: "ADMIN",
    };

    let JWTtoken = JWTService.generateToken(userData);
    res.json({
      status: "success",
      token: JWTtoken,
    });
  } else {
    res.json({ message: "password is not valid" });
  }
});

// app.get("/user", async (req, res) => {
//   try {
//     let response = await userModel.find({});
//     // console.log(response);
//     res.json(response);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = app;
