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
const studentRoute=require('./routes/studentRoute');
const merchantRoute=require('./routes/merchantRoute');
const subdealerRoute=require('./routes/subdealerRoutes');
const roleRoute=require('./routes/roleRoute');

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Basic test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Add the user-related routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/service-providers", serviceProviderRoute);
app.use("/api/v1/images", imageRoute);
app.use("/api/v1/grocery-sellers",grocerySeller);
app.use("/api/v1/students",studentRoute);
app.use("/api/v1/merchants",merchantRoute);
app.use("/api/v1/sub-dealer",subdealerRoute);
app.use("/api/v1/role",roleRoute);

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



app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.PRODUCTION_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
  const allowedOrigins = [process.env.FRONTEND_URL, process.env.PRODUCTION_URL];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});