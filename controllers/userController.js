const User = require("../models/User");

module.exports = {
    getUser: async (req, res) => {

        try {
            const user = await User.findById(req.params.id);

            const { password, __v, createdAt, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
}