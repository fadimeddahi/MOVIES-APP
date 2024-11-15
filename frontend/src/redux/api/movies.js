import { apiSlice } from "./apiSlice";
import { MOVIES_URL, UPLOAD_URL } from "../constants";

export const moviesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => MOVIES_URL,
    }),
    getMovie: builder.query({
      query: (id) => `${MOVIES_URL}/${id}`,
    }),
    createMovie: builder.mutation({
      query: (movie) => ({
        url: MOVIES_URL,
        method: "POST",
        body: movie,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIES_URL}/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIES_URL}/${id}/review`,
        method: "POST",
        body: { rating, comment }, // Ensure this structure matches the backend expectation
      }),
    }),
    

    
    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIES_URL}/comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),
    
      

    getNewMovies: builder.query({
      query: () => `${MOVIES_URL}/new`,
    }),
    getTopRatedMovies: builder.query({
      query: () => `${MOVIES_URL}/toprated`,
    }),
    getRandomMovies: builder.query({
      query: () => `${MOVIES_URL}/random`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useGetNewMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetRandomMoviesQuery,
  useUploadImageMutation,
} = moviesApi;
