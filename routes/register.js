const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../schema/usermodel");

const register = express.Router();

register.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(201).send({ message: "User Already registered" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (!err) {
          let newUser = new userModel({ name, email, password: hash, address });
          await newUser.save();
          res.send({ message: "User saved successfully" });
        } else {
          res.send({ message: "Something went wrong while storing Password" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { register };
