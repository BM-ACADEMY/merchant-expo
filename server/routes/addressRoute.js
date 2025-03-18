const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/create-address", addressController.createAddress);
router.get("/fetch-all-address", addressController.getAddresses);
router.get("/fetch-address-by-id/:id", addressController.getAddressById);
router.put("/update-address/:id", addressController.updateAddress);
router.delete("/delete-address/:id", addressController.deleteAddress);

module.exports = router;
