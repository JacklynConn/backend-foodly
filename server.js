const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category");
const restaurant = require("./routes/restaurant");

dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Foodly Backend is connected to MongoDB!"))
  .catch((err) => {err});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", categoryRoutes);
app.use("/api/restaurant", restaurant);


app.listen(process.env.PORT || 6013, () =>
  console.log(`Foodly Backend is running on port ${process.env.PORT || 6013}!`)
);

// 175.100.53.171