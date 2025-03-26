const express=require('express');
const app= express();
const dotenv=require('dotenv');
const cors = require("cors");
dotenv.config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');

const PORT=process.env.PORT || 8080;
//route paths
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const merchantRoutes=require('./routes/merchantRoute');
const userRoute=require('./routes/userRoute');

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



app.get('/', (req, res) => {
    res.send('Hello from the server!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));