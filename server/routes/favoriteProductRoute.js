const express = require("express");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a product to favorites
router.post("/add-favorite-products", protect, addFavorite);

// Get favorite products of logged-in user
router.get("/fetch-favorite-products-by-user", protect, getFavorites);

// Remove a product from favorites
router.delete("/delete-favorite-products-by-id/:id", protect, removeFavorite);

module.exports = router;
