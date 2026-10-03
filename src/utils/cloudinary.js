import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || process.env.API_KEY)?.trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET)?.trim()
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    //file has been uploaded successfully
    console.log(`File is uploaded successfully on cloudinary: ${response.url}`);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    console.error("File upload failed:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload failed
    }
    return null;
  }
};

export { uploadOnCloudinary as uploadOnClodinary, uploadOnCloudinary };
