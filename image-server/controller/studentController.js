const fs = require("fs");
const path = require("path");
const { createEntityFolder, processFile } = require("../utils/FileUpload");

// ✅ Upload Student ID Card
const uploadStudentIdCard = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No logo uploaded" });
    }

    const { collage_name } = req.body;
    if (!collage_name) {
      return res.status(400).json({ message: "Collage name is required" });
    }

    // ✅ Sanitize collage name (replace spaces with underscores)
    const sanitizedCollageName = collage_name.replace(/\s+/g, "_");

    // ✅ Generate random number and timestamp for unique file naming
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now();
    
    // ✅ Construct the final file name
    const fileName = `${randomNum}_${timestamp}_${sanitizedCollageName}_logo.webp`;

    // ✅ Ensure upload directory exists
    const uploadPath = path.join(__dirname, "../uploads/student/id_card/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // ✅ Process and store the file
    const logoUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      "student",
      "id_card",
      fileName
    );

    res.status(200).json({
      message: "ID card uploaded successfully",
      logoUrl, // ✅ Return public URL
    });
  } catch (error) {
    console.error("Logo Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Student ID Card
const updateStudentIdCard = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No new logo uploaded" });
    }

    const { collage_name } = req.body;
    if (!collage_name) {
      return res.status(400).json({ message: "Collage name is required" });
    }

    // ✅ Sanitize collage name
    const sanitizedCollageName = collage_name.replace(/\s+/g, "_");

    // ✅ Define upload path
    const uploadPath = path.join(__dirname, "../uploads/student/id_card/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // ✅ Find and delete old ID card (wildcard match)
    const files = fs.readdirSync(uploadPath);
    const oldFile = files.find((file) =>
      file.includes(`${sanitizedCollageName}_logo.webp`)
    );
    if (oldFile) {
      fs.unlinkSync(path.join(uploadPath, oldFile));
    }

    // ✅ Generate new file name with random number and timestamp
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now();
    const newFileName = `${randomNum}_${timestamp}_${sanitizedCollageName}_logo.webp`;

    // ✅ Process and store the new logo
    const logoUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      "student",
      "id_card",
      newFileName
    );

    res.status(200).json({
      message: "ID card updated successfully",
      logoUrl, // ✅ Return public URL
    });
  } catch (error) {
    console.error("Logo Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Student ID Card
const deleteStudentIdCard = (req, res) => {
  try {
    const { collage_name } = req.body;
    if (!collage_name) {
<<<<<<< HEAD
      return res.status(400).json({ message: "College name is required" });
=======
      return res.status(400).json({ message: "Collage name is required" });
>>>>>>> 6ebfee91356ac536c0f4855f30ffe835026d71ed
    }

    // ✅ Sanitize collage name
    const sanitizedCollageName = collage_name.replace(/\s+/g, "_");

    // ✅ Define upload path
    const uploadPath = path.join(__dirname, "../uploads/student/id_card/");
    if (!fs.existsSync(uploadPath)) {
      return res.status(404).json({ message: "ID card image not found" });
    }

    // ✅ Find and delete the ID card (wildcard match)
    const files = fs.readdirSync(uploadPath);
    const fileToDelete = files.find((file) =>
      file.includes(`${sanitizedCollageName}_logo.webp`)
    );

    if (fileToDelete) {
      fs.unlinkSync(path.join(uploadPath, fileToDelete));
      return res
        .status(200)
        .json({ message: "ID card image deleted successfully" });
    } else {
      return res.status(404).json({ message: "ID card image not found" });
    }
  } catch (error) {
    console.error("Logo Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Student ID Card
const getStudentIdCard = (req, res) => {
  try {
    const { collage_name } = req.params;
    if (!collage_name) {
      return res.status(400).json({ message: "Collage name is required" });
    }

    // ✅ Sanitize collage name
    const sanitizedCollageName = collage_name.replace(/\s+/g, "_");

    // ✅ Define upload path
    const uploadPath = path.join(__dirname, "../uploads/student/id_card/");
    if (!fs.existsSync(uploadPath)) {
      return res.status(404).json({ message: "ID card image not found" });
    }

    // ✅ Find the ID card (wildcard match)
    const files = fs.readdirSync(uploadPath);
    const foundFile = files.find((file) =>
      file.includes(`${sanitizedCollageName}_logo.webp`)
    );

    if (!foundFile) {
      return res.status(404).json({ message: "ID card image not found" });
    }

    res.sendFile(path.join(uploadPath, foundFile));
  } catch (error) {
    console.error("Get Logo Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadStudentIdCard,
  updateStudentIdCard,
  deleteStudentIdCard,
  getStudentIdCard,
<<<<<<< HEAD
};
=======
};
>>>>>>> 6ebfee91356ac536c0f4855f30ffe835026d71ed
