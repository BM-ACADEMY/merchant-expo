const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const connectDB = require("./config/database"); // Import DB connection
const userRoutes = require("./routes/userRoute"); // User routes
const merchantRoutes = require("./routes/merchantRoute"); // Merchant routes

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/merchants", merchantRoutes); // Merchant CRUD routes

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
