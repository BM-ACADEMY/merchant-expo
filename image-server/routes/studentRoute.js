const express = require("express");
const router = express.Router();
const { upload } = require("../utils/FileUpload");
const {
  uploadStudentIdCard,
  updateStudentIdCard,
  deleteStudentIdCard,
  getStudentIdCard,
} = require("../controller/studentController");

// 📌 Upload Student ID Card
router.post("/id-card/upload", upload.single("id_card_image"), uploadStudentIdCard);

// 📌 Update Student ID Card (Pass college name in URL)
router.put("/id-card/update/:college_name", upload.single("id_card_image"), updateStudentIdCard);

// 📌 Delete Student ID Card (Pass college name in URL)
router.delete("/id-card/delete/:college_name", deleteStudentIdCard);

// 📌 Get Student ID Card (Pass college name in URL)
router.get("/id-card/get/:college_name", getStudentIdCard);

module.exports = router;
