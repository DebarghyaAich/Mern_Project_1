import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      trim: true,
      lowercase: true,
      index: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"],
      trim: true,
      lowercase: true
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
      index: true
    },
    avatar: {
      type: String, // cloudinary url
      required: [true, "Avatar is required"]
    },
    coverImage: {
      type: String // cloudinary url
    },
    password: {
      type: String,
      required: [true, "Password is required"] //custom message if password is not provided
    },
    refreshToken: {
      type: String
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
