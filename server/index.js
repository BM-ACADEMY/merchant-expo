const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
<<<<<<< HEAD
require("dotenv").config(); 
const connectDB=require('./config/connectDB');

{/* Routes config here*/}
const userRoutes = require("./routes/userRoute");
const serviceProviderRoute=require("./routes/serviceProviderRoute");
const imageRoute=require('./routes/ImageRoute');
const grocerySeller=require('./routes/grocerySellerRoute');

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
=======
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
>>>>>>> 54b2c71f5a19947a94763d80e77bff0a8485f1f3

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/merchants", merchantRoutes); // Merchant CRUD routes

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

<<<<<<< HEAD
// Add the user-related routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/service-provider", serviceProviderRoute);
app.use("/api/v1/upload", imageRoute);
app.use("/api/v1/grocery-seller",grocerySeller);



// Test endpoint for quick testing
app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received successfully", data: req.body });
=======
// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
>>>>>>> 54b2c71f5a19947a94763d80e77bff0a8485f1f3
});

// Server listening
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("✅ Server is running on port", PORT)
  })
}).catch(err => {
  console.error("❌ Database connection failed", err)
})