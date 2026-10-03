import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //validation - not empty
  //check if user already exists: username, email
  // check for images , check for avatar
  //upload them to cloudinary
  //create user object -  create entry in db
  //remove password and refresh token from response
  //check for user creation
  //return response
  const { username, email, fullname, password } = req.body;

  if ([username, email, fullname, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required", []);
  }
  const existedUser = await User.findOne({
    $or: [{ username: username }, { email: email }]
  });
  if (existedUser) {
    throw new apiError(400, "User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : "";

  if (!avatar) {
    throw new apiError(400, "avatar is required.");
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  });

  const createdUser = await User.findById(user._id).select("-password -refresh_token");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong whilw registering the user.");
  }
  return;
});

export { registerUser };
