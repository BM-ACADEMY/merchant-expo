const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
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

// Basic test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Add the user-related routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/service-provider", serviceProviderRoute);
app.use("/api/v1/upload", imageRoute);
app.use("/api/v1/grocery-seller",grocerySeller);



// Test endpoint for quick testing
app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received successfully", data: req.body });
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