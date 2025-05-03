const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create-category", categoryController.createCategory);
router.get("/fetch-all-category", categoryController.getCategories);

router.get("/fetch-by-id-category/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("delete-category/:id", categoryController.deleteCategory);

router.get("/fetch-all-category-for-super-sub-category", categoryController.getCategoriesForSuperSubCategory);
router.get("/fetch-by-id-category/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);


module.exports = router;
