import React from "react";
import { selectMovies } from "../../features/movie/movieSlice";
import { useSelector } from "react-redux";

const MoviesConsumer = () => {
  const movies = useSelector(selectMovies);
  console.log("This is movies", movies);

  return (
    <div>
      {movies && movies.map((movie) => <p key={movie.id}>{movie.name}</p>)}
    </div>
  );
};

export default MoviesConsumer;
