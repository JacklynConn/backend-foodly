const Food = require("../models/Food");

module.exports = {
    addFood: async (req, res) => {
        try {
            const {
                title,
                time,
                foodTags,
                foodType,
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
            res.status(200).json(food);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    // get all foods by code
    getAllFoodsByCode: async (req, res) => {
        const code = req.params.code;
        try {
            const foods = await Food.find({ code: code });
            res.status(200).json(foods);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    // get random food for recommendation
    getRandomFood: async (req, res) => {
        try {
            let randomFoodList = [];
            // check if code is provided in the params
            if (req.params.code) {
                randomFoodList = await Food.aggregate([
                    { $match: { code: req.params.code, } },
                    { $sample: { size: 3 } },
                    { $project: { __v: 0 } },
                ]);
            }

            // if no code provided in params or no food match the provided code
            if (!randomFoodList.length) {
                randomFoodList = await Food.aggregate([
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }

            // respond with the results
            if (randomFoodList.length) {
                res.status(200).json(randomFoodList);
            } else {
                res.status(404).json({
                    status: false,
                    message: "No food found",
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    // Restaurant menu
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json(foods);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    getFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $project: { __v: 0 } },
            ]);

            if (foods.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(foods);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    searchFoods: async (req, res) => {
        const search = req.params.search;

        try {
            const results = await Food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFoodsByCategoryCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            let foods;

            foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $sample: { size: 10 } },
            ]);

            if (!foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 10 } },
                ]);
            } else if (!foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 10 } },
                ]);
            }
            res.status(200).json(foods);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
};
