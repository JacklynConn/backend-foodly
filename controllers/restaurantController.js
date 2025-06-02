const Restaurant = require("../models/Restaurant");

module.exports = {
  addRestaurant: async (req, res) => {
    const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;

    if (
      !title ||
      !time ||
      !imageUrl ||
      !owner ||
      !code ||
      !logoUrl ||
      !coords ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.address ||
      !coords.title
    ) {
      return res.status(400).json({
        status: false,
        message: "You have a missing field",
      });
    }

    try {
      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res.status(201).json({
        status: true,
        message: "Restaurant created successfully",
      });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err.message,
        });
    }
  },

  getRestaurantById: async (req, res) => {
    const id = req.params.id;
    try {
      const restaurant = await Restaurant.findById(id);
      res.status(200).json(restaurant);
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  },

  getAllNearbyRestaurants: async (req, res) => {
  },

  getRandomRestaurants: async (req, res) => {
    
  },
};
