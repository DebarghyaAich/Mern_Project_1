import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// middleware to hash the incoming password before saving the user data
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      email: this.email,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  jwt.sign(
    {
      _id: this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
