const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
    additives: { type: Array, required: false, default: [] },
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", CartSchema);