const express = require("express");
const router = express.Router();
const grocerySellerController = require("../controllers/grocerySellerController");

router.get("/fetch-all-grocery-seller", grocerySellerController.getAllGrocerySellers);
router.get("/fetch-by-id-grocery-seller/:id", grocerySellerController.getGrocerySellerById);
router.post("/create-grocery-seller", grocerySellerController.createGrocerySeller);
router.put("/update-grocery-seller/:id", grocerySellerController.updateGrocerySeller);
router.delete("/delete-grocery-seller/:id", grocerySellerController.deleteGrocerySeller);

module.exports = router;
