import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected Successfully ...");
  } catch (error) {
    console.log("Database not connected !!");
  }
};

export default connectDB;
