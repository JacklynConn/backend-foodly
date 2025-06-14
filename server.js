const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category");
const restaurantRoutes = require("./routes/restaurant");
const foodRoutes = require("./routes/food");  
const ratingRoute = require("./routes/rating"); 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");                                                                                                                                                         ("./routes/rating");
// const sendEmail = require("./utils/smtp_function");
// const generateOTP = require("./utils/otp_generate");


dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Foodly Backend is connected to MongoDB!"))
  .catch((err) => { err });

// const otp = generateOTP();
// console.log(`Generated OTP: ${otp}`);
// sendEmail('makmach1122@gmail.com', otp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/rating", ratingRoute);

app.listen(process.env.PORT || 6013, () =>
  console.log(`port: http://localhost:${process.env.PORT || 6013}`)
);

// 175.100.53.171