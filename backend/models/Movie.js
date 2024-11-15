import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    image: {
      type: String,
    },
    year: {
      type: String,
      required: true,
    },
    genre: {
      type: ObjectId,
      ref: "Genre",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    cast: {
      type: [String], // Define as an array of strings
    },

    reviews: [reviewsSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema); // Updated to ES module export
