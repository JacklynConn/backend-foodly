const Rating = require('../models/Rating');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

module.exports = {
    addRating: async (req, res) => {
        const newRating = new Rating({
            userId: req.body.userId,
            ratingType: req.body.ratingType,
            product: req.body.product,
            rating: req.body.rating
        });

        try {
            await newRating.save();
            if (req.body.ratingType === 'Restaurant') {
                const restaurant = await Restaurant.aggregate([
                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: 'product', averageRating: { $avg: "$rating" } } }
                ]);

                if (restaurant.length > 0) {
                    const averageRating = restaurant[0].averageRating;
                    await Restaurant.findByIdAndUpdate(req.body.product, { rating: averageRating });
                }
            } else if (req.body.ratingType === 'Food') {
                const food = await Food.aggregate([
                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: 'product', averageRating: { $avg: "$rating" } } }
                ]);

                if (food.length > 0) {
                    const averageRating = food[0].averageRating;
                    await Food.findByIdAndUpdate(req.body.product, { rating: averageRating });
                }
            }

            res.status(200).json({
                status: true,
                message: "Rating added successfully"
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },

    
}
