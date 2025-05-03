const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

const { protect } = require("../middleware/productValidation");

router.post("/create-products", createProduct);
router.get("/fetch-all-products", getProducts);
router.get("/fetch-products-by-id/:id", getProductById);
router.put("/update-products/:id", updateProduct);
router.delete("/delete-products/:id", deleteProduct);

module.exports = router;


