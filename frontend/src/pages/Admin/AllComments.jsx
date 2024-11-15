import {
  useDeleteCommentMutation,
  useGetMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movie, refetch } = useGetMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    console.log("Movie ID:", movieId);
    console.log("Review ID:", reviewId);
    try {
      const deletecomm= await deleteComment({ movieId, reviewId });
      console.log("Deleted Comment:", deletecomm);

      refetch();
      toast.success("Comment Deleted");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };
  return (
    <div>
      {movie?.map((m) => {
        return (
          <section
            key={m._id}
            className="flex flex-col justify-center items-center"
          >
            {m?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
              >
                <div className="flex justify-between">
                  <strong className="text-[#B0B0B0]">{review.name}</strong>
                </div>

                <p className="my-4">{review.comment}</p>

                <button
                  className="text-red-500"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
};
export default AllComments;
