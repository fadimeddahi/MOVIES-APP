import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieQuery, useUpdateMovieMutation, useUploadImageMutation } from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    details: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [image, setImage] = useState(null);
  const { data: initialMovieData, error: fetchMovieError } = useGetMovieQuery(id);

  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploading, error: uploadImageError }] = useUploadImageMutation();

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateMovie = async () => {
    if (!movieData.name || !movieData.year || !movieData.details || !movieData.cast.length) {
      toast.error("Please fill in all required fields");
      return;
    }

    let uploadedImagePath = movieData.image;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const uploadImageResponse = await uploadImage(formData).unwrap();
        uploadedImagePath = uploadImageResponse?.image;
      } catch (error) {
        console.error("Failed to upload image:", uploadImageError);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      const updatedMovie = { ...movieData, image: uploadedImagePath };
      await updateMovie({ id, updatedMovie });
      toast.success("Movie updated successfully");
      navigate("/admin/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error("Failed to update movie");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>

        <div className="mb-4">
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Details:</label>
          <textarea
            name="details"
            value={movieData.details}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="border px-2 py-1 w-full"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            style={image ? { border: "none" } : { border: "1px solid #888", padding: "8px" }}
          >
            {!image && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !image ? "none" : "block" }}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleUpdateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isUpdating || isUploading}
        >
          {isUpdating || isUploading ? "Updating..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
