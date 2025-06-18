const Order = require("../models/Order");
const { getUser } = require("./userController");


module.exports = {
    placeOrder: async (req, res) => {
        const newOrder = new Order({
            ...req.body,
            userId: req.user.id,
        });

        try {
            await newOrder.save();

            const orderId = newOrder._id;
            res.status(201).json({ status: true, orderId: orderId, message: "Order placed successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getUserOrders: async (req, res) => {
        const userId = req.user.id;
        const { paymentStatus, orderStatus } = req.query;

        let query = { userId};

        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        if (orderStatus) {
            query.orderStatus = orderStatus;
        }

        try {
          
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};