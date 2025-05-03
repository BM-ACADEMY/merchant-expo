const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantController");

router.post("/create-merchant", merchantController.createMerchant);
router.get("/fetch-all-merchants", merchantController.getAllMerchants);
router.get("/fetch-merchant-by-id/:id", merchantController.getMerchantById);
router.put("/update-merchant/:id", merchantController.updateMerchant);
router.delete("/delete-merchant/:id", merchantController.deleteMerchant);

module.exports = router;
