const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/productValidation");

const router = express.Router();

router.post("/create-products", protect, createProduct);
router.get("/fetch-all-products", getProducts);
router.get("/fetch-products-by-id/:id", getProductById);
router.put("/update-products-by-id/:id", protect, updateProduct);
router.delete("/delete-products-by-id/:id", protect, deleteProduct);

module.exports = router;
//New comment inserted

