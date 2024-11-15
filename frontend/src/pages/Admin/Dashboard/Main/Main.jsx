import React from "react";
import SecondaryCard from "./SecondaryCard";
import PrimaryCard from "./PrimaryCard";
import RealTimeCard from "./RealTimeCard";
import VideoCard from "./VideoCard";

import {
  useGetTopRatedMoviesQuery,
  useGetMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: allMovies } = useGetMoviesQuery();
  const { data: topMovies } = useGetTopRatedMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  

  const totalCommentslength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentslength?.reduce((a, b) => a + b, 0);

  return (
    <div>
      <section className="flex justify-around">
        <div className="ml-[14rem] mt-10">
          <div className="-translate-x-4 flex">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more then usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>

        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;