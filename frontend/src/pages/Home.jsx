import React from "react";
import Headers from "./Movies/Headers";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div>
      <Headers />

      <section className="mt-[10rem]">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;
