import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (genre) => ({
        url: GENRE_URL,
        method: "POST",
        body: genre,
        // No need to set headers manually; baseQuery handles it
      }),
    }),

    updateGenre: builder.mutation({
      query: (genre) => ({
        url: `${GENRE_URL}/${genre.id}`,
        method: "PUT",
        body: genre,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    readGenre: builder.query({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "GET",
      }),
    }),

    FetchGenres: builder.query({
      query: () => ({
        url: `${GENRE_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useReadGenreQuery,
} = genreApi;
