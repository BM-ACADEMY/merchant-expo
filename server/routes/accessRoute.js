const express = require("express");
const router = express.Router();
const accessController = require("../controllers/accessController");

router.post("/create-access", accessController.createAccess);
router.get("/fetch-all-access", accessController.getAccessList);
router.get("/fetch-all-access-by-id/:id", accessController.getAccessById);
router.put("/update-access/:id", accessController.updateAccess);
router.delete("/delete-access/:id", accessController.deleteAccess);

module.exports = router;
