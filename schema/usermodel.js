const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const userschema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userschema);

module.exports = {
  userModel,
};
