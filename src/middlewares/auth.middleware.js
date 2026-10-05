import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  //get accesstoken from cookie or Authorization (header)
  const accessToken =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();

  if (!accessToken) {
    throw new apiError(401, "Unauthorized request");
  }

  // verify the token
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new apiError(401, "Invalid Access Token");
  }
  req.user = user;
  next();
});
