import express from "express";
import {
  createUser,
  loginUser,
  logCurrentUserout,
  getUsers,
  getProfile,
  updateUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registration route
router
  .route("/register")
  .post(createUser);

  //get all users 

router.route("/").get(getUsers);
 

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logCurrentUserout);

// Protected routes
 // Fetch users
router.route("/profile")
  .get(authenticate, getProfile) // Get user profile
  .put(authenticate, updateUser); // Update user profile

export default router;
