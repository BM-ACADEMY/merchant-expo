const express = require("express");
const {
  addFavoriteCompany,
  getFavoriteCompanies,
  removeFavoriteCompany,
} = require("../controllers/favoriteCompanyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a company to favorites
router.post("/", protect, addFavoriteCompany);

// Get favorite companies of logged-in user
router.get("/", protect, getFavoriteCompanies);

// Remove a company from favorites
router.delete("/:id", protect, removeFavoriteCompany);

module.exports = router;
