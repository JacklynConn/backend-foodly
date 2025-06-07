const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    ratingType: {type: String, required: true, enum: ["Restaurant", "Driver", "Food"]},
    product: {type: String, required: true}, // This can be a restaurant ID, driver ID, or food ID
    rating: {type: Number, required: true, min: 1, max: 5},
});

module.exports = mongoose.model("Rating", RatingSchema);