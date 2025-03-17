 const mongoose =require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;