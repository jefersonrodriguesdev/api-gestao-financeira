import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(16).toString("hex");
        const filename = `${hash}-${file.originalname}`;
        cb(null, filename);
    },
});

export const upload = multer({ storage });