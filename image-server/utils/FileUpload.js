require("dotenv").config(); // Load .env variables
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

// ✅ Load SERVER_URL from .env (Default to localhost)
const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";
console.log(`Server URL: ${SERVER_URL}`);

// ✅ Ensure dynamic folder creation
const createEntityFolder = (entity_type, company_name) => {
    const uploadDir = path.join(__dirname, "../uploads", entity_type, company_name);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    return uploadDir;
};

// ✅ Allowed file types
const allowedMimeTypes = {
    image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    video: ["video/mp4", "video/avi", "video/mov", "video/mkv"],
    audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/aac"]
};

// ✅ Multer storage configuration (Using Memory Storage for processing)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allTypes = [...allowedMimeTypes.image, ...allowedMimeTypes.video, ...allowedMimeTypes.audio];
    if (allTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images, videos, and audio files are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 200 * 1024 * 1024 } // Max 200MB
});

// ✅ Compress and Save Image
const compressImage = async (buffer, outputPath) => {
    try {
        const image = sharp(buffer);
        const metadata = await image.metadata();

        if (metadata.width > 2000) {
            await image.resize({ width: 2000 });
        }

        await image
            .toFormat("webp", { quality: 90 })
            .toFile(outputPath.replace(/\.\w+$/, ".webp"));
    } catch (error) {
        throw new Error("Image compression failed: " + error.message);
    }
};

// ✅ Compress and Save Video
const compressVideo = async (buffer, outputPath) => {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(__dirname, "../uploads/temp_" + Date.now() + ".mp4");
        fs.writeFileSync(tempFilePath, buffer);

        ffmpeg(tempFilePath)
            .videoCodec("libx265")
            .outputOptions([
                "-preset slow",
                "-crf 22",
                "-b:v 1M",
                "-vf scale=1280:-1"
            ])
            .on("end", () => {
                fs.unlinkSync(tempFilePath);
                resolve();
            })
            .on("error", (err) => reject(new Error("Video compression failed: " + err.message)))
            .save(outputPath.replace(/\.\w+$/, ".mp4"));
    });
};

// ✅ Compress and Save Audio
const compressAudio = async (buffer, outputPath) => {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(__dirname, "../uploads/temp_" + Date.now() + ".mp3");
        fs.writeFileSync(tempFilePath, buffer);

        ffmpeg(tempFilePath)
            .audioCodec("aac")
            .audioBitrate("192k")
            .on("end", () => {
                fs.unlinkSync(tempFilePath);
                resolve();
            })
            .on("error", (err) => reject(new Error("Audio compression failed: " + err.message)))
            .save(outputPath.replace(/\.\w+$/, ".mp3"));
    });
};

// ✅ Process File and Return Public URL
const processFile = async (buffer, mimetype, entityType, companyName, fileName) => {
    const uploadPath = createEntityFolder(entityType, companyName);
    const filePath = path.join(uploadPath, fileName);

    if (allowedMimeTypes.image.includes(mimetype)) {
        await compressImage(buffer, filePath);
    } else if (allowedMimeTypes.video.includes(mimetype)) {
        await compressVideo(buffer, filePath);
    } else if (allowedMimeTypes.audio.includes(mimetype)) {
        await compressAudio(buffer, filePath);
    } else {
        throw new Error("Unsupported file type");
    }

    // ✅ Return the public file URL (Relative Path for Server)
    const publicUrl = `${SERVER_URL}/uploads/${entityType}/${companyName}/${fileName.replace(/\.\w+$/, ".webp")}`;
    return publicUrl;
};

module.exports = { upload, createEntityFolder, processFile };
