import Movie from "../models/Movie.js";
import mongoose from "mongoose";


// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { name, year, genre, details, cast, image } = req.body;
    console.log(image);
    console.log("Uploaded Image Path:", image); // Log the image path for debugging

    // Create a new movie object with all data including the image
    const newMovie = new Movie({
      name,
      year,
      genre,
      details,
      cast,
      image, // Add the image field
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie); // Send the saved movie as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    // Map through the movies to ensure proper image path handling
    const formattedMovies = movies.map((movie) => ({
      ...movie.toObject(),
      Image: movie.image ? `http://localhost:5000${movie.image}` : null, // Add the full URL for the image
    }));

    res.json(formattedMovies); // Return the formatted list of movies
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific movie by ID
const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the ID from the request params
    console.log("Movie ID:", id); // Log the movie ID for debugging
    console.log("Request Body:", req.body); // Log the request body for debugging
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); // Find and update the movie
    console.log("Updated Movie:", updatedMovie); // Log the updated movie for debugging
    // Update the movie and return the new version
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" }); // Handle case if movie not found
    }
    res.json(updatedMovie); // Respond with the updated movie
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Add a review to a movie
const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if the user already reviewed the movie
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Movie already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Push new review and update movie rating and review count
    movie.reviews.push(review);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();
    res.status(201).json({ message: "Review Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route Definition (keep .post() for adding reviews)

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific comment from a movie

// Delete a specific comment from a movie



const deleteComment = async (req, res) => {
  console.log("Request Body:", req.body);
  const { movieId, reviewId } = req.body;
  console.log("Movie ID:", movieId);
  console.log("Review ID:", reviewId);

  // Validate ObjectId formats
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: "Invalid movie ID format" });
  }
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID format" });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove the review and update stats
    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating = movie.reviews.length
      ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length
      : 0;

    await movie.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// Get the 10 most recent movies
const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the top-rated movies
const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a random selection of 10 movies
const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
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
};
