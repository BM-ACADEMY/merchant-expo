const express = require("express");
const {
  addFavoriteServiceProvider,
  getFavoriteServiceProviders,
  removeFavoriteServiceProvider,
} = require("../controllers/favoriteServiceProviderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a service provider to favorites
router.post("/", protect, addFavoriteServiceProvider);

// Get favorite service providers of logged-in user
router.get("/", protect, getFavoriteServiceProviders);

// Remove a service provider from favorites
router.delete("/:id", protect, removeFavoriteServiceProvider);

module.exports = router;
