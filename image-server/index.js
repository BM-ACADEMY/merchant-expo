const express=require('express');
const app= express();
const dotenv=require('dotenv');
const cors = require("cors");
dotenv.config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');

const PORT=process.env.PORT || 8080;

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
      setHeaders: (res, path) => {
        res.setHeader("Cache-Control", "no-store"); // ⛔ don't cache at all
      },
    })
  );
  
//route paths

const merchantRoutes=require('./routes/merchantRoute');
const userRoute=require('./routes/userRoute');
const serviceProviderRoute=require('./routes/serviceProviderRoute');
const categoryRoute=require('./routes/categoryRoute');
const subCategoryRoute=require('./routes/subCategoryRoute');
const deepSubCategoryRoute=require('./routes/deepSubCategoryRoute');
const productRoute=require('./routes/productRoute');
const complaintRoute=require('./routes/complaintRoute');
const chatMessageRoute=require('./routes/chatMessageRoute');

// Middlewares
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
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//route middlewares
app.use('/api/v1/merchant-images', merchantRoutes);
app.use('/api/v1/user-images', userRoute);
app.use('/api/v1/service-provider-images', serviceProviderRoute);

app.use('/api/v1/category-images', categoryRoute);
app.use('/api/v1/subCategory-images', subCategoryRoute);
app.use('/api/v1/deepSubCategory-images', deepSubCategoryRoute);
app.use('/api/v1/product-images', productRoute);
app.use('/api/v1/complaint-forms', complaintRoute);
app.use('/api/v1/chat-message-images', chatMessageRoute);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));