const express = require("express");
const {
  getAllSubDealers,
  getSubDealerById,
  createSubDealer,
  updateSubDealer,
  deleteSubDealer,
} = require("../controllers/subdealerController");


const router = express.Router();

router.get("/fetch-all-subdealers",  getAllSubDealers);
router.get("/fetch-subdealers-by-id/:id",getSubDealerById);
router.post("/create-subdealers", createSubDealer);
router.put("/update-subdealers-by-id/:id",  updateSubDealer);
router.delete("/delete-subdealers-by-id/:id",  deleteSubDealer);

module.exports = router;
