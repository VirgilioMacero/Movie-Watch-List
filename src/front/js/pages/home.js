import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/search";
import { Toggle } from "../component/toggle.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 container">
      <Toggle />
      <Search />
      <div className="row ">
        {store.films.map((film) => {
          if (film.backdrop_path != null) {
            return (
              <FilmCard
                key={film.id}
                name={film.original_title}
                imgUrl={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                filmUrl={`/single/${film.id}`}
                className="col mt-3"
              />
            );
          }
        })}
      </div>
    </div>
  );
};
