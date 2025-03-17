const express = require("express");
const {
  getAllSubDealers,
  getSubDealerById,
  createSubDealer,
  updateSubDealer,
  deleteSubDealer,
} = require("../controllers/subdealerController");
const { authenticate } = require("../middleware/subdealerValidation");

const router = express.Router();

router.get("/", authenticate, getAllSubDealers);
router.get("/:id", authenticate, getSubDealerById);
router.post("/", authenticate, createSubDealer);
router.put("/:id", authenticate, updateSubDealer);
router.delete("/:id", authenticate, deleteSubDealer);

module.exports = router;
