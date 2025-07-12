import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://erandesamadhan2003:Samadhan@cluster0.evww6jb.mongodb.net/`); // This should not be undefined
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
