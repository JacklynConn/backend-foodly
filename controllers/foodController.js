const { messaging } = require("firebase-admin");
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
            res.status(200).json(food);
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    getRandomFood: async (req, res) => {
        const code = req.params.code;
        try {
            let randomFood = [];
            if (code) {
                randomFood = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            if (randomFood.length === 0) {
                randomFood = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }
            res.status(200).json(randomFood);
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
    }


};
