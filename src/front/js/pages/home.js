import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import MovieCard from "../component/MovieCard.jsx";
import { Search } from "../component/search";
import { Toggle } from "../component/toggle.js"

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 container">
      <Toggle />
      <Search />
      <div className="row ">
        {store.movies.map((movie) => {
          console.log(movie);
          return (
            <MovieCard
              name={movie.original_title}
              imgUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              movieUrl=" "
              className="col mt-3"
            />
          );
        })}
      </div>
    </div>
  );
};
