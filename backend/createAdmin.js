import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@rewear.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@rewear.com");
      console.log("Password: admin123");
      console.log("Role: admin");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@rewear.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
      points_balance: 1000
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@rewear.com");
    console.log("Password: admin123");
    console.log("Role: admin");
    console.log("You can now login to access the admin dashboard.");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin(); 