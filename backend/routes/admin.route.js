import express from "express";
import {
  getAllUsers,
  banUser,
  unbanUser,
} from "../controllers/admin.controller.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/admin.controller.js";
import {
  getAllListings,
  approveListing,
  rejectListing,
  removeListing,
} from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthentication.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Users
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.patch("/users/:id/ban", isAuthenticated, isAdmin, banUser);
router.patch("/users/:id/unban", isAuthenticated, isAdmin, unbanUser);

// Orders
router.get("/orders", isAuthenticated, isAdmin, getAllOrders);
router.patch("/orders/:id", isAuthenticated, isAdmin, updateOrderStatus);

// Listings
router.get("/listings", isAuthenticated, isAdmin, getAllListings);
router.patch("/listings/:id/approve", isAuthenticated, isAdmin, approveListing);
router.patch("/listings/:id/reject", isAuthenticated, isAdmin, rejectListing);
router.patch("/listings/:id/remove", isAuthenticated, isAdmin, removeListing);

export default router;
