import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

// Register
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ status: "error", error: "All fields are required" });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ status: "error", error: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashed });

        res.status(201).json({ status: "success", message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: "error", error: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: "error", error: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            .cookie('username', user.username, {
                httpOnly: false,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            })
            .json({ status: "success", message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Logout
export const logout = async (_, res) => {
    try {
        return res
            .cookie('token', '', { maxAge: 0 })
            .json({ message: "Logged Out Successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Logout failed" });
    }
};

// Verify Token
export const verifyToken = async (req, res) => {
    try {
        if (req.id) {
            return res.status(200).json({ success: true, message: "Token verified" });
        }
        return res.status(400).json({ success: false, message: "Token not verified" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Token not verified" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");

        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }

        res.status(200).json({ status: "success", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", error: "Server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }

        const { username, profile_photo, location } = req.body;

        if (username) user.username = username;
        if (profile_photo) user.profile_photo = profile_photo;
        if (location) user.location = location;

        await user.save();

        res.status(200).json({ status: "success", message: "Profile updated", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", error: "Server error" });
    }
};
