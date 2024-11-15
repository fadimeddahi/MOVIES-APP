import React, { useState } from "react";
import {
  useCreateGenreMutation,
  useFetchGenresQuery,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
} from "../../redux/api/genre";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      await createGenre({ name }).unwrap();
      toast.success("Genre created successfully");
      setName("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Name is required");
      return;
    }

    try {
      await updateGenre({ id: selectedGenre._id, name: updatingName }).unwrap();
      toast.success("Genre updated successfully");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update genre");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      await deleteGenre(selectedGenre._id).unwrap();
      toast.success("Genre deleted successfully");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete genre");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
