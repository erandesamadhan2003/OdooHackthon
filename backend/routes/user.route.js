import express from "express";
import { login, logout, register, verifyToken } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/verify').get(isAuthenticated, verifyToken);

export default router;