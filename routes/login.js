const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../schema/usermodel");

const login = express.Router();

login.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      let comparepassword = existingUser.password;
      console.log(comparepassword);
      bcrypt.compare(password, comparepassword, function (err, result) {
        if (result) {
          const token = jwt.sign({ id: existingUser._id }, "masai");
          res.status(201).send({ message: "User successfully Login", token });
        } else {
          res.send({ message: "Plese Check Your Credentials" });
        }
      });
    } else {
      res.send({ message: "Please Register Yourself Before Login" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

login.patch("/user/:id/reset", async (req, res) => {
  const { current_password, new_password } = req.body;
  const id = req.params.id;
  let data = await userModel.findById(id);
  if (data) {
    let comparepassword = data.password;
    bcrypt.compare(
      current_password,
      comparepassword,
      async function (err, result) {
        if (result) {
          bcrypt.hash(new_password, 5, async function (err, hash) {
            if (!err) {
              let update = await userModel.findByIdAndUpdate(id, {
                password: hash,
              });
              res.status(204).send({ message: "Password Updated Sucessfully" });
            } else {
              res.send({
                message: "Please Check your Current Password",
              });
            }
          });
        } else {
          res.send({ message: "Plese Check Your Credentials" });
        }
      }
    );
  }
});

module.exports = { login };
