const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct,getProductByName } = require("../controllers/productController");
const router = express.Router();


router.post("/create-products", createProduct);
router.get("/fetch-all-products", getProducts);
router.get("/fetch-products-by-id/:id", getProductById);
router.put("/update-products/:id", updateProduct);
router.delete("/delete-products/:id", deleteProduct);

//get the product by name
router.get("/fetch-product-by-name/:product_name", getProductByName);


module.exports = router;


