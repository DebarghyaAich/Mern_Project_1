import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAndRefreshToken = async (userId) => {
  try {
    //find by user id
    const user = await User.findById(userId);

    //generate access and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    //return access and refresh token
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw new apiError(500, "Something went wrong while generating access and refresh tokens.");
  }
};

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

  if ([username, email, fullname, password].some((field) => !field || field.trim() === "")) {
    throw new apiError(400, "All fields are required", []);
  }
  const existedUser = await User.findOne({
    $or: [{ username: username }, { email: email }]
  });
  if (existedUser) {
    throw new apiError(400, "User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path || req.file?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : "";

  if (!avatar) {
    throw new apiError(
      400,
      "Avatar file upload failed. Please verify your Cloudinary credentials in .env"
    );
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user.");
  }
  return res.status(201).json(new apiResponse(201, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //username or email check if exists
  //password check
  // generate access and refresh token ( separate method )
  // send cookie

  const { email, password } = req.body;
  if (!email || !password) {
    throw new apiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email: email.toLowerCase() });
  if (!existedUser) {
    throw new apiError(400, "User does not exist");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(400, "Invalid Password");
  }

  // generate access and refresh token
  const { accessToken, refreshToken } = await generateAndRefreshToken(existedUser._id);

  //send cookies
  const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: true
  };

  // send response

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
});

// logout user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    { new: true }
  );
  const cookieOptions = {
    httpOnly: true,
    secure: true
  };
  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

export { loginUser, logoutUser, registerUser };
