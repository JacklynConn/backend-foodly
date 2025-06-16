const { get } = require("mongoose");
const Cart = require("../models/cart");

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity, additives } = req.body;

        let count;

        try {
            const existingProduct = await Cart.findOne({ userId: userId, productId: productId });
            count = await Cart.countDocuments({ userId: userId, productId: productId });

            if (existingProduct) {
                // If the product already exists in the cart, update it
                existingProduct.totalPrice += totalPrice * quantity; // Increment total price
                existingProduct.quantity += quantity; // Increment quantity

                await existingProduct.save();
                return res.status(200).json({ status: true, count: count });
            } else {
                // If the product does not exist in the cart, create a new entry
                const newCartItem = new Cart({
                    userId: userId,
                    productId: productId,
                    totalPrice: totalPrice * quantity, // Set total price
                    quantity: quantity, // Set quantity
                    additives: additives || [] // Set additives, default to empty array if not provided
                });

                await newCartItem.save();
                count = await Cart.countDocuments({ userId: userId, productId: productId });
                res.status(201).json({ status: true, count: count });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    removeCartItem: async (req, res) => {
        const cartItemId = req.params.id;
        const userId = req.user.id;

        try{
            await Cart.findByIdAndDelete({_id: cartItemId});
            const count = await Cart.countDocuments({ userId: userId });

            res.status(200).json({ status: true, count: count });
        }catch(error){
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getCartItems: async (req, res) => {
        const userId = req.user.id;

        try {
            const cartItems = await Cart.find({ userId: userId }).populate({
                path: "productId",
                select: "imageUrl title restaurant rating ratingCount",
                populate: {
                    path: "restaurant",
                    select: "time coords"
                }
            });
            
            res.status(200).json({cartItems: cartItems });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getCartCount: async (req, res) => {
        const userId = req.user.id;

        try {
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json({ status: true, count: count });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    
}; 