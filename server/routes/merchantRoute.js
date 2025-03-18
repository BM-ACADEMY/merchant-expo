const express = require("express");
const Merchant = require("../models/merchantModel"); // Merchant model
const router = express.Router();

// Create Merchant
router.post("/create-merchants", async (req, res) => {
  try {
    const newMerchant = new Merchant(req.body);
    await newMerchant.save();
    res.status(201).json({ message: "Merchant created successfully", merchant: newMerchant });
  } catch (error) {
    res.status(500).json({ error: "Error creating merchant", details: error.message });
  }
});

// Get all Merchants
router.get("/fetch-all-merchants", async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching merchants", details: error.message });
  }
});

// Get a specific Merchant
router.get("/fetch-merchants-by-id/:id", async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: "Merchant not found" });
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ error: "Error fetching merchant", details: error.message });
  }
});

// Update Merchant
router.put("/update-merchants-by-id/:id", async (req, res) => {
  try {
    const updatedMerchant = await Merchant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Merchant updated successfully", merchant: updatedMerchant });
  } catch (error) {
    res.status(500).json({ error: "Error updating merchant", details: error.message });
  }
});

// Delete Merchant
router.delete("/delete-merchants-by-id/:id", async (req, res) => {
  try {
    await Merchant.findByIdAndDelete(req.params.id);
    res.json({ message: "Merchant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting merchant", details: error.message });
  }
});

module.exports = router;
