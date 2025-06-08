const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/otp_generate');

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
            // Send OTP to user's email (this part is not implemented here, but you can use a service like Nodemailer)

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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            const decryptedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET).toString(CryptoJs.enc.Utf8);
            if (decryptedPassword !== password) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid password"
                });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).json({
                status: true,
                message: "Login successful",
                token: token,
                userType: user.userType,
                profile: user.profile
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },
}