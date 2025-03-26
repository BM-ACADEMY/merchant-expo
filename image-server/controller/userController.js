const fs = require("fs");
const path = require("path");
const { createEntityFolder, processFile } = require("../utils/FileUpload");

// 📌 Upload multiple files with compression
const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { entity_type, user_id } = req.body;
    if (!entity_type || !user_id) {
      return res
        .status(400)
        .json({ message: "Missing entity type or company name" });
    }

    const uploadPath = createEntityFolder(entity_type, user_id);
    let fileDetails = [];

    for (let file of req.files) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const outputPath = path.join(uploadPath, fileName); // Correct path

      // ✅ Pass correct arguments to processFile()
      const fileUrl = await processFile(
        file.buffer,
        file.mimetype,
        entity_type,
        user_id,
        fileName
      );

      fileDetails.push({ fileUrl }); // ✅ Return URL instead of absolute path
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Files uploaded successfully",
      files: fileDetails,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res
      .status(500)
      .json({ error: true, sucess: false, message: error.message });
  }
};

// ✅ Update a file (replace existing)
const updateImage = async (req, res) => {
  try {
    const { entity_type, user_id, old_filename } = req.body;

    if (!entity_type || !user_id || !old_filename) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No new file uploaded" });
    }

    // ✅ Create entity folder if it doesn't exist
    const uploadPath = createEntityFolder(entity_type, user_id);

    const oldFilePath = path.join(uploadPath, old_filename);

    // ✅ Delete old file if it exists
    if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const newFilePath = path.join(uploadPath, fileName);

    // ✅ Process & store the new file
    const fileUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      entity_type,
      user_id,
      fileName
    );

    res.status(200).json({
      message: "File updated successfully",
      fileUrl, // ✅ Return public URL instead of local path
    });
  } catch (error) {
    console.error("File Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a file
const deleteImage = (req, res) => {
  try {
    const { entity_type, user_id, filename } = req.body;
    const filePath = path.join(
      __dirname,
      "../uploads",
      entity_type,
      user_id,
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: "File deleted successfully" });
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get a file (Convert images to WebP dynamically)
const getImage = (req, res) => {
  const { entity_type, user_id, filename } = req.params;
  const filePath = path.join(
    __dirname,
    "../uploads",
    entity_type,
    user_id,
    filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  const fileExt = path.extname(filename).toLowerCase();
  if ([".jpg", ".png", ".jpeg"].includes(fileExt)) {
    res.setHeader("Content-Type", "image/webp");
    return sharp(filePath).toFormat("webp").pipe(res);
  }

  res.sendFile(filePath);
};


module.exports = { uploadImages, updateImage, deleteImage, getImage };