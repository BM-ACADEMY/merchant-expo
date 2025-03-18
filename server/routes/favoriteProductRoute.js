const express = require("express");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a product to favorites
router.post("/", protect, addFavorite);

// Get favorite products of logged-in user
router.get("/", protect, getFavorites);

// Remove a product from favorites
router.delete("/:id", protect, removeFavorite);

module.exports = router;
