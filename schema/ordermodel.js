const mongoose = require("mongoose");
const {ObjectId} = require("mongoose");
const {userModel} = require("./usermodel");
const {RestaurantModel} = require("./resturentmodel");

const orderschema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "userModel" },
    restaurant: { type: ObjectId, ref: "RestaurantModel" },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: Number,
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    status: String, // e.g, "placed", "preparing", "on the way", "delivered"
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", orderschema);

module.exports = {
  OrderModel,
};
