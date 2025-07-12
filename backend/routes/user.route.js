import express from "express";
import { login, logout, register, verifyToken } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { updateUserProfile, uploadProfilePicture } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.get('/profile',isAuthenticated,getUserProfile);
router.put('/profile',isAuthenticated,updateUserProfile);
router.post('/profile/upload-picture', isAuthenticated, upload.single('profile_picture'), uploadProfilePicture);

router.route('/verify').get(isAuthenticated, verifyToken);

export default router;