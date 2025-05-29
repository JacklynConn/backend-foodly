const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Foodly Backend is connected to MongoDB!"))
  .catch((err) => {err});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || 6013, () =>
  console.log(`Foodly Backend is running on port ${process.env.PORT || 6013}!`)
);
