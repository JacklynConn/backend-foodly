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

    verifyAccount: async (req, res) => {
        const userOtp = req.params.otp;

        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }

            if (userOtp === user.otp) {
                user.isVerified = true;
                user.otp = null; // Clear OTP after verification
                await user.save();

                const { password, __v, otp, createdAt, ...others } = user._doc;
                return res.status(200).json({ ...others });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Otp verification failed",
                });
            }

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },

    verifyPhone: async (req, res) => {
        const phone = req.params.phone;
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }

            user.phoneVerification = true;
            user.phone = phone; // Update phone number
            await user.save();

            const { password, __v, otp, createdAt, ...others } = user._doc;
            return res.status(200).json({ ...others });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    }
}