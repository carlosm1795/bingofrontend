import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../../features/movie/movieSlice";
const Movies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let tempMovies = [
      { id: 1, name: "Los arboles mueren de pie" },
      { id: 2, name: "Juana de arco" },
    ];
    dispatch(setMovies(tempMovies));
  }, []);
  return <div></div>;
};

export default Movies;
