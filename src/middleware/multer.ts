import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import os from "os"; // 🟢 

const uploadDir = path.join(os.tmpdir(), "gestao-uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(16).toString("hex");
        const nomeLimpo = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${hash}-${nomeLimpo}`;
        cb(null, filename);
    },
});

export const upload = multer({ storage });