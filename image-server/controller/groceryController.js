const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { createEntityFolder, processFile } = require("../utils/FileUpload");

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { entity_type, shop_name } = req.body;
    if (!entity_type || !shop_name) {
      return res.status(400).json({ message: "Missing entity type or shop name" });
    }

    const sanitizedShopName = shop_name.replace(/\s+/g, "_");
    const uploadPath = createEntityFolder(entity_type, sanitizedShopName);
    let fileDetails = [];

    for (let file of req.files) {
      const originalName = file.originalname.replace(/\s+/g, "_");
      const fileName = `${Date.now()}_${originalName}`;
      const outputPath = path.join(uploadPath, fileName);

      const fileUrl = await processFile(
        file.buffer,
        file.mimetype,
        entity_type,
        sanitizedShopName,
        fileName
      );

      fileDetails.push({ fileUrl });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Files uploaded successfully",
      files: fileDetails,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: true, success: false, message: error.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { entity_type, shop_name, old_filename } = req.body;

    if (!entity_type || !shop_name || !old_filename) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No new file uploaded" });
    }

    const uploadPath = createEntityFolder(entity_type, shop_name);
    const oldFilePath = path.join(uploadPath, old_filename);

    if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const newFilePath = path.join(uploadPath, fileName);

    const fileUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      entity_type,
      shop_name,
      fileName
    );

    res.status(200).json({
      message: "File updated successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("File Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteImage = (req, res) => {
  try {
    const { entity_type, shop_name, filename } = req.body;
    const filePath = path.join(__dirname, "../Uploads", entity_type, shop_name, filename);

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

const getImage = (req, res) => {
  const { entity_type, shop_name, filename } = req.params;
  const filePath = path.join(__dirname, "../Uploads", entity_type, shop_name, filename);

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

const uploadCompanyLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No logo uploaded" });
    }

    const { shop_name } = req.body;
    if (!shop_name) {
      return res.status(400).json({ message: "Shop name is required" });
    }

    const uploadPath = path.join(__dirname, "../Uploads/grocery-seller/logo/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${shop_name}_logo.webp`;
    const sanitizedFileName = fileName.replace(/\s+/g, "_");
    const logoPath = path.join(uploadPath, fileName);

    const logoUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      "grocery-seller",
      "logo",
      sanitizedFileName
    );

    res.status(200).json({
      message: "Shop logo uploaded successfully",
      logoUrl,
    });
  } catch (error) {
    console.error("Logo Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateCompanyLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No new logo uploaded" });
    }

    const { shop_name } = req.body;
    if (!shop_name) {
      return res.status(400).json({ message: "Shop name is required" });
    }

    const uploadPath = path.join(__dirname, "../Uploads/grocery-seller/logo/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${shop_name}_logo.webp`;
    const logoPath = path.join(uploadPath, fileName);

    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);

    const logoUrl = await processFile(
      req.file.buffer,
      req.file.mimetype,
      "grocery-seller",
      "logo",
      fileName
    );

    res.status(200).json({
      message: "Shop logo updated successfully",
      logoUrl,
    });
  } catch (error) {
    console.error("Logo Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCompanyLogo = (req, res) => {
  try {
    const { shop_name } = req.body;
    if (!shop_name) {
      return res.status(400).json({ message: "Shop name is required" });
    }

    const logoPath = path.join(__dirname, "../Uploads/grocery-seller/logo/", shop_name + "_logo.webp");

    if (fs.existsSync(logoPath)) {
      fs.unlinkSync(logoPath);
      return res.status(200).json({ message: "Shop logo deleted successfully" });
    } else {
      return res.status(404).json({ message: "Shop logo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyLogo = (req, res) => {
  const { shop_name } = req.params;
  const logoPath = path.join(__dirname, "../Uploads/grocery-seller/logo/", shop_name + "_logo.webp");

  if (!fs.existsSync(logoPath)) {
    return res.status(404).json({ message: "Shop logo not found" });
  }

  res.sendFile(logoPath);
};

module.exports = {
  uploadImages,
  updateImage,
  deleteImage,
  getImage,
  uploadCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo,
  getCompanyLogo,
};