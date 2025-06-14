const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/otp_generate');
const sendMail = require('../utils/smtp_function');

module.exports = {
    createUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }

        const minPasswordLength = 8;

        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({
                status: false,
                message: `Password must be at least ${minPasswordLength} characters long`
            });
        }

        try {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists"
                });
            }

            // Generate OTP
            const otp = generateOTP();

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                userType: req.body.userType || "Client",
                password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
                otp: otp,
            });

            // Save User
            await newUser.save();

            // SEND OTP TO EMAIL
            sendMail(newUser.email, otp);

            return res.status(201).json({
                status: true,
                message: "User created successfully",
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },

    loginUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                status: false,
                message: "Email is not valid"
            });
        }

        const minPasswordLength = 8;

        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({
                status: false,
                message: `Password must be at least ${minPasswordLength} characters long`
            });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
            const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

            if (originalPassword !== req.body.password) {
                return res.status(400).json({
                    status: false,
                    message: "Wrong password"
                });
            }

            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: "21d" });

            const { password, otp, updatedAt, createdAt, __v, ...others } = user._doc;

            res.status(200).json({ ...others, userToken });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        }
    }
}