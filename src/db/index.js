import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(
      `\n DB Connection Host: ${connectionInstance.connection.host}\n DB Connection Port: ${connectionInstance.connection.port}\n`
    );
  } catch (error) {
    console.error("MONGODB connection error: ", error);
    throw error;
  }
};

export default connectDB;
