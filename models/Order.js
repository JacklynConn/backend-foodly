const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
     foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food"},
     quantity: { type: Number, default: 1 },
     price: { type: Number, required: true },
     additives: { type: Array },
     instructions: { type: String, default: "" },

});

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [OrderItemSchema],
    orderTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    orderStatus: { type: String, enum: ["Placed", "Preparing", "Manual", "Delivered", "Cancelled", "Ready", "Out_for_Delivery"] , default: "Pending" },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
    restaurantCoords: [Number], // [longitude, latitude]
    recipientCoords: [Number], // [longitude, latitude]
    driverId: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    feedback: { type: String },
    promocode: { type: String },
    discountAmount: { type: Number},
    notes: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);