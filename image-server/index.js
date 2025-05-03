const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
const imageRoutes = require('./routes/studentRoute'); // Add image routes
// const uploadRoutes = require("./routes/upload");

const PORT = process.env.PORT || 8080;


// Route paths
const merchantRoutes = require('./routes/merchantRoute');
const userRoute = require('./routes/userRoute');
const serviceProviderRoute = require('./routes/serviceProviderRoute');
const grocerySellerRoutes = require('./routes/groceryRoutes'); // New route for Grocery Seller


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//route paths

// const merchantRoutes=require('./routes/merchantRoute');
// // const userRoute=require('./routes/userRoute');
// const serviceProviderRoute=require('./routes/serviceProviderRoute');
const studentRoute=require('./routes/studentRoute');


// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.PRODUCTION_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route middlewares
// app.use("/api/v1/upload", uploadRoutes);
app.use('/api/v1/merchant-images', merchantRoutes);
app.use('/api/v1/user-images', userRoute);
app.use('/api/v1/service-provider-images', serviceProviderRoute);

app.use('/api/v1/grocery-seller-images', grocerySellerRoutes);

// Default route

app.use('/api/v1/student-images', studentRoute);
app.use('/api/v1', imageRoutes);


app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));