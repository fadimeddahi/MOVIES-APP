import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkid.js";
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";

// Main routes for creating, getting, and updating movies
router.route("/").post(authenticate, authorize, createMovie).get(getAllMovies);
router.get("/new", getNewMovies);
router.get("/toprated", getTopMovies);
router.get("/random", getRandomMovies);

// Routes for specific movie operations
router.route("/comment").delete(authenticate, authorize, deleteComment);
router
  .route("/:id")
  .get(checkId, getSpecificMovie) // Get a specific movie
  .put(checkId, authenticate, authorize, updateMovie) // Update a specific movie
  .delete(checkId, authenticate, authorize, deleteMovie); // Delete a specific movie

// Routes for movie reviews (add or delete)
router.route("/:id/review").post(checkId, authenticate, movieReview); // Add a review

// Delete a comment

export default router;
