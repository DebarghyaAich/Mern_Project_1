import crypto from "crypto";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp/uploads");
  },
  filename: function (req, file, cb) {
    const randomName = crypto.randomBytes(32).toString("hex");
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `${randomName}${extension}`);
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 //5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  }
});
