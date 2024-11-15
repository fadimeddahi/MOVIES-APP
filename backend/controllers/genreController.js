import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if the genre already exists
    const genreExists = await Genre.findOne({ name });

    if (genreExists) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    // Create the new genre
    const genre = await Genre.create({ name });

    // Respond with the created genre
    res.status(201).json({
      _id: genre._id,
      name: genre.name,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(400).json({ message: "Invalid Genre data" });
  }
});
const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const { id } = req.params;

    const genre = await Genre.findById(id);

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(400).json({ message: "Invalid Genre data" });
  }
});

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removedGenre = await Genre.findByIdAndDelete(id);

    if (!removedGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.json({ message: "Genre removed" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(400).json({ message: "Invalid Genre data" });
  }
} );

const getGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.status(200).json(genres);

  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(400).json({ message: "Invalid Genre data" });
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id); // Fetch the genre by ID
    if (genre) {
      return res.json(genre); // Send the found genre as a response
    } else {
      return res.status(404).json({ message: "Genre not found" }); // Handle case when genre doesn't exist
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(400).json({ message: "Invalid Genre data" }); // Handle any other errors
  }
});




export { createGenre , updateGenre , deleteGenre , getGenres , readGenre };
