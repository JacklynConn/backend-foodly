const Food = require("../models/Food");

module.exports = {
  addFood: async (req, res) => {
    try {
      const {
        title,
        time,
        foodTags,
        category,
        code,
        restaurant,
        description,
        price,
        additives,
        imageUrl,
      } = req.body;

      if (
        !title ||
        !time ||
        !foodTags ||
        !category ||
        !foodType ||
        !code ||
        !restaurant ||
        !description ||
        !price ||
        !imageUrl
      ) {
        return res.status(400).json({
          status: false,
          message: "You have a missing field",
        });
      }

      const newFood = new Food(req.body);
      await newFood.save();
      res.status(201).json({
        status: true,
        message: "Food has been added successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  },

  getFoodById: async (req, res) => {
    const id = req.params.id;
    try {
      const food = await Food.findById(id);
    //   if (!food) {
    //     return res.status(404).json({
    //       status: false,
    //       message: "Food not found",
    //     });
    //   }
      res.status(200).json(food);
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  },

  
};
