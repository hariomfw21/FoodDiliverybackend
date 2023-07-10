const express = require("express");
const { RestaurantModel } = require("../schema/resturentmodel");

const restaurant = express.Router();

// creating a new restaurant

restaurant.post("/restaurant", async (req, res) => {
  try {
    const { name, address, menu } = req.body;

    const restaurant = new RestaurantModel({
      name,
      address,
      menu,
    });

    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

restaurant.get("/restaurants", async (req, res) => {
  try {
    let data = await RestaurantModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
});

// specific restaurant
restaurant.get("/restaurants/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await RestaurantModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
});

// Get the menu of a specific restaurant
restaurant.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const menu = restaurant.menu;

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add new item to specific restaurant
restaurant.post("/restaurants/:id/menu", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const menuItem = {
      name,
      description,
      price,
      image,
    };

    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    restaurant.menu.push(menuItem);
    await restaurant.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

restaurant.delete(
  "/restaurants/:restaurantId/menu/:menuItemId",
  async (req, res) => {
    const { restaurantId, menuItemId } = req.params;
    try {
      const restaurant = await RestaurantModel.findById(restaurantId);

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menuItemIndex = restaurant.menu.findIndex(
        (item) => item._id.toString() === menuItemId
      );

      if (menuItemIndex === -1) {
        return res.status(404).json({ error: "Menu item not found" });
      }

      restaurant.menu.splice(menuItemIndex, 1);

      await restaurant.save();

      res.status(202).send({message: "Menu has been deleted successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = { restaurant };
