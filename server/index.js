// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// require("dotenv").config(); 
// const connectDB=require('./config/connectDB');

// {/* Routes config here*/}
// const userRoutes = require("./routes/userRoute");
// const serviceProviderRoute=require("./routes/serviceProviderRoute");
// const imageRoute=require('./routes/ImageRoute');
// const grocerySeller=require('./routes/grocerySellerRoute');
// const merchantRoute=require('./routes/merchantRoute');
// const subdealerRoute=require('./routes/subdealerRoutes');
// const roleRoute=require('./routes/roleRoute');
// const addressRoute=require('./routes/addressRoute');
// const categoryRoute=require('./routes/categoryRoute');
// const subCategoryRoute=require('./routes/subCategoryRoute');
// const superSubCategoryRoute=require('./routes/superSubCategoryRoute'); 
// const deepSubCategoryRoute=require('./routes/deepSubCategoryRoute');
// const productRoute=require('./routes/productRoute');
// const SubscriptionPlanRoute=require('./routes/subscriptionPlanRotue');
// const SubscriptionPlanElementRoute=require('./routes/subscriptionPlanElementRoute');
// const SubscriptionPlanElementMappingRoute=require('./routes/subscriptionPlanElementMappingRoute');
// const PostByRequirement=require('./routes/postByRequirementRoute');
// const ComplaintFormRoute=require('./routes/complaintFormRoute');
// const FaqTopicRoute=require('./routes/faqTopicRoute');
// const FaqQuestionRoute=require('./routes/faqQuestionRoute');
// const TestimonialRoute=require('./routes/testimonialRoute');
// const PointsRoute=require('./routes/pointsRoute');
// const CoupanRoute=require('./routes/couponRoute'); 
// const PermissionRoute=require('./routes/permissionRoute'); 
// const PermissionRequestRoute=require('./routes/permissionRequestedRoute'); 




// const app = express();

// // Middlewares
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(morgan("dev")); // Log requests
// app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// // Basic test route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Add the user-related routes
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/service-providers", serviceProviderRoute);
// app.use("/api/v1/images", imageRoute);
// app.use("/api/v1/grocery-sellers",grocerySeller);
// app.use("/api/v1/merchants",merchantRoute);
// app.use("/api/v1/sub-dealer",subdealerRoute);
// app.use("/api/v1/role",roleRoute);
// app.use("/api/v1/address",addressRoute);
// app.use("/api/v1/categories",categoryRoute);
// app.use("/api/v1/sub-categories",subCategoryRoute);
// app.use("/api/v1/super-sub-categories",superSubCategoryRoute);
// app.use("/api/v1/deep-sub-categories",deepSubCategoryRoute);
// app.use("/api/v1/products",productRoute);
// app.use("/api/v1/subscription-plans",SubscriptionPlanRoute);
// app.use("/api/v1/subscription-plans-elements",SubscriptionPlanElementRoute);
// app.use("/api/v1/subscription-plans-elements-mapping",SubscriptionPlanElementMappingRoute);
// app.use("/api/v1/post-by-requirement",PostByRequirement);
// app.use("/api/v1/complaint-form",ComplaintFormRoute);
// app.use("/api/v1/faq-topics",FaqTopicRoute);
// app.use("/api/v1/faq-questions",FaqQuestionRoute);
// app.use("/api/v1/testimonials",TestimonialRoute);
// app.use("/api/v1/testimonials",TestimonialRoute);
// app.use("/api/v1/treanding-points",PointsRoute);
// app.use("/api/v1/coupons",CoupanRoute);
// app.use("/api/v1/permissions",PermissionRoute);
// app.use("/api/v1/permission-requests",PermissionRequestRoute);



// // Test endpoint for quick testing
// app.post("/test", (req, res) => {
//   console.log("Received data:", req.body);
//   res.json({ message: "Data received successfully", data: req.body });
// });

// // Server listening
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => {
//       console.log("✅ Server is running on port", PORT)
//   })
// }).catch(err => {
//   console.error("❌ Database connection failed", err)
// })





// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const connectDB = require('./config/connectDB');
// const http = require('http');
// const socketIo = require('socket.io');

// // Routes
// const userRoutes = require("./routes/userRoute");
// const serviceProviderRoute = require("./routes/serviceProviderRoute");
// const imageRoute = require('./routes/ImageRoute');
// const grocerySeller = require('./routes/grocerySellerRoute');
// const merchantRoute = require('./routes/merchantRoute');
// const subdealerRoute = require('./routes/subdealerRoutes');
// const roleRoute = require('./routes/roleRoute');
// const addressRoute = require('./routes/addressRoute');
// const categoryRoute = require('./routes/categoryRoute');
// const subCategoryRoute = require('./routes/subCategoryRoute');
// const superSubCategoryRoute = require('./routes/superSubCategoryRoute');
// const deepSubCategoryRoute = require('./routes/deepSubCategoryRoute');
// const productRoute = require('./routes/productRoute');
// const SubscriptionPlanRoute = require('./routes/subscriptionPlanRotue');
// const SubscriptionPlanElementRoute = require('./routes/subscriptionPlanElementRoute');
// const SubscriptionPlanElementMappingRoute = require('./routes/subscriptionPlanElementMappingRoute');
// const PostByRequirement = require('./routes/postByRequirementRoute');
// const ComplaintFormRoute = require('./routes/complaintFormRoute');
// const FaqTopicRoute = require('./routes/faqTopicRoute');
// const FaqQuestionRoute = require('./routes/faqQuestionRoute');
// const TestimonialRoute = require('./routes/testimonialRoute');
// const PointsRoute = require('./routes/pointsRoute');
// const CoupanRoute = require('./routes/couponRoute');
// const PermissionRoute = require('./routes/permissionRoute');
// const PermissionRequestRoute = require('./routes/permissionRequestedRoute');
// const PermissionRequestReadMappingRoute = require('./routes/permissionRequestReadMappingRoute');
// const MessageRoute=require('./routes/messageRoute');
// const socketInit = require("./socket/index");
// const app = express();

// // Create HTTP server to integrate with Socket.io
// const server = http.createServer(app);
// const io = socketInit(server);
// const io = socketIo(server, {
//   cors: {
//     origin: '*', // Allow frontend
//   },
// });

// app.set('io', io);
// // Middlewares
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(morgan("dev")); // Log requests
// app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// // Basic test route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Add the user-related routes
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/service-providers", serviceProviderRoute);
// app.use("/api/v1/images", imageRoute);
// app.use("/api/v1/grocery-sellers", grocerySeller);
// app.use("/api/v1/merchants", merchantRoute);
// app.use("/api/v1/sub-dealer", subdealerRoute);
// app.use("/api/v1/role", roleRoute);
// app.use("/api/v1/address", addressRoute);
// app.use("/api/v1/categories", categoryRoute);
// app.use("/api/v1/sub-categories", subCategoryRoute);
// app.use("/api/v1/super-sub-categories", superSubCategoryRoute);
// app.use("/api/v1/deep-sub-categories", deepSubCategoryRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/subscription-plans", SubscriptionPlanRoute);
// app.use("/api/v1/subscription-plans-elements", SubscriptionPlanElementRoute);
// app.use("/api/v1/subscription-plans-elements-mapping", SubscriptionPlanElementMappingRoute);
// app.use("/api/v1/post-by-requirement", PostByRequirement);
// app.use("/api/v1/complaint-form", ComplaintFormRoute);
// app.use("/api/v1/faq-topics", FaqTopicRoute);
// app.use("/api/v1/faq-questions", FaqQuestionRoute);
// app.use("/api/v1/testimonials", TestimonialRoute);
// app.use("/api/v1/testimonials", TestimonialRoute);
// app.use("/api/v1/treanding-points", PointsRoute);
// app.use("/api/v1/coupons", CoupanRoute);
// app.use("/api/v1/permissions", PermissionRoute);
// app.use("/api/v1/permission-requests", PermissionRequestRoute);
// app.use("/api/v1/permission-request-read-mapping", PermissionRequestReadMappingRoute);
// app.use("/api/v1/chat", MessageRoute);


// // Test endpoint for quick testing
// app.post("/test", (req, res) => {
//   console.log("Received data:", req.body);
//   res.json({ message: "Data received successfully", data: req.body });
// });

// // Socket.io connection handler
// io.on('connection', (socket) => {
//   console.log("New client connected");

//   // Emit notifications to the client
//   socket.emit('welcome', { message: 'Welcome to the notification service!' });

//   // You can listen to custom events from the client
//   socket.on('disconnect', () => {
//     console.log("Client disconnected");
//   });
// });

// // Server listening
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log("✅ Server is running on port", PORT);
//   });
// }).catch(err => {
//   console.error("❌ Database connection failed", err);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require('./config/connectDB');
const http = require('http');
const socketIo = require('socket.io');

// Routes
const userRoutes = require("./routes/userRoute");
const serviceProviderRoute = require("./routes/serviceProviderRoute");
const imageRoute = require('./routes/ImageRoute');
const grocerySeller = require('./routes/grocerySellerRoute');
const merchantRoute = require('./routes/merchantRoute');
const subdealerRoute = require('./routes/subdealerRoutes');
const roleRoute = require('./routes/roleRoute');
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const superSubCategoryRoute = require('./routes/superSubCategoryRoute');
const deepSubCategoryRoute = require('./routes/deepSubCategoryRoute');
const productRoute = require('./routes/productRoute');
const SubscriptionPlanRoute = require('./routes/subscriptionPlanRotue');
const SubscriptionPlanElementRoute = require('./routes/subscriptionPlanElementRoute');
const SubscriptionPlanElementMappingRoute = require('./routes/subscriptionPlanElementMappingRoute');
const PostByRequirement = require('./routes/postByRequirementRoute');
const ComplaintFormRoute = require('./routes/complaintFormRoute');
const FaqTopicRoute = require('./routes/faqTopicRoute');
const FaqQuestionRoute = require('./routes/faqQuestionRoute');
const TestimonialRoute = require('./routes/testimonialRoute');
const PointsRoute = require('./routes/pointsRoute');
const CoupanRoute = require('./routes/couponRoute');
const PermissionRoute = require('./routes/permissionRoute');
const PermissionRequestRoute = require('./routes/permissionRequestedRoute');
const PermissionRequestReadMappingRoute = require('./routes/permissionRequestReadMappingRoute');
const MessageRoute = require('./routes/messageRoute');

const app = express();

// Create HTTP server to integrate with Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow frontend
  },
});

app.set('io', io); // Make io available globally to the app

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
app.use("/api/v1/grocery-sellers", grocerySeller);
app.use("/api/v1/merchants", merchantRoute);
app.use("/api/v1/sub-dealer", subdealerRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/sub-categories", subCategoryRoute);
app.use("/api/v1/super-sub-categories", superSubCategoryRoute);
app.use("/api/v1/deep-sub-categories", deepSubCategoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/subscription-plans", SubscriptionPlanRoute);
app.use("/api/v1/subscription-plans-elements", SubscriptionPlanElementRoute);
app.use("/api/v1/subscription-plans-elements-mapping", SubscriptionPlanElementMappingRoute);
app.use("/api/v1/post-by-requirement", PostByRequirement);
app.use("/api/v1/complaint-form", ComplaintFormRoute);
app.use("/api/v1/faq-topics", FaqTopicRoute);
app.use("/api/v1/faq-questions", FaqQuestionRoute);
app.use("/api/v1/testimonials", TestimonialRoute);
app.use("/api/v1/treanding-points", PointsRoute);
app.use("/api/v1/coupons", CoupanRoute);
app.use("/api/v1/permissions", PermissionRoute);
app.use("/api/v1/permission-requests", PermissionRequestRoute);
app.use("/api/v1/permission-request-read-mapping", PermissionRequestReadMappingRoute);
app.use("/api/v1/chat", MessageRoute);

// Test endpoint for quick testing
app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received successfully", data: req.body });
});

// Socket.io connection handler
const onlineUsers = new Map();
const activeChats = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle user joining their personal room
  socket.on("join", (userId) => {
    socket.join(userId);
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined their room`);
  });

  // Handle user joining a chat room
  socket.on("joinChatRoom", ({ userId, selectedUserId }) => {
    activeChats.set(userId, selectedUserId);
    console.log(`User ${userId} started chatting with ${selectedUserId}`);
  });

  // Disconnect cleanup
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    activeChats.delete(socket.userId); // Or manage via a map if needed
    console.log("User disconnected");
  });
});


app.set('onlineUsers', onlineUsers); 
// Server listening
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("✅ Server is running on port", PORT);
  });
}).catch(err => {
  console.error("❌ Database connection failed", err);
});

