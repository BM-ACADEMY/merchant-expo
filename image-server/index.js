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

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//route middlewares
app.use('/api/v1/merchant-images', merchantRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));