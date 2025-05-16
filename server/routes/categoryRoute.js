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

// get top categories
router.get("/fetch-top-categories", categoryController.getTopTrendingCategories);
router.get("/fetch-top-sub-categories", categoryController.getTopTrendingSubCategories);
router.get("/fetch-top-products", categoryController.getTopTrendingProducts);
router.get("/fetch-categories-by-name/:category_name", categoryController.getCategoriesByName);
router.get("/fetch-sub-categories-by-name/:sub_category_name", categoryController.getSubCategoriesByName);

module.exports = router;
