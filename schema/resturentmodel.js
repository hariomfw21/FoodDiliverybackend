const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MenuItemSchema = Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const RestaurantSchema = Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  menu: [MenuItemSchema],
},{
    versionKey: false,
});

const RestaurantModel = model("Restaurant", RestaurantSchema);

module.exports = {
  RestaurantModel,
};
