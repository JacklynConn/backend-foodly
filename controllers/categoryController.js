const Category = require("../models/Category");

module.exports = {
  createCategory: async (req, res) => {
    const newCategory = new Category(req.body);
    try {
      await newCategory.save();
      res.status(201).json({
        status: true,
        message: "Category created successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  },
};
