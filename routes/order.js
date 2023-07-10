const express = require("express");
const { OrderModel } = require("../schema/ordermodel");
const order = express.Router();

// Place an order
order.post("/orders", async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress, status } =
      req.body;

    // Create a new instance of the OrderModel
    const order = new OrderModel({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

order.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the request parameters

    const order = await OrderModel.findById(id)
      .populate("user")
      .populate("restaurant");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the status of a specific order
order.put("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the order ID from the request parameters
      const { status } = req.body; // Get the updated status from the request body
  
      // Find the order by ID
      const order = await OrderModel.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      res.status(204).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = { order };
