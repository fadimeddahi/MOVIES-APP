import express from "express";
const router = express.Router();
import { createGenre, updateGenre, deleteGenre, getGenres, readGenre } from "../controllers/genreController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

// Route for creating a new genre
router.route("/")
  .post(authenticate, authorize, createGenre)
  .get(authenticate, authorize, getGenres); // Fetch all genres

// Routes for updating, reading, and deleting a genre by ID
router.route("/:id")
  .put(authenticate, authorize, updateGenre)
  .get(readGenre) // No authentication required if public
  .delete(authenticate, authorize, deleteGenre);

export default router;
