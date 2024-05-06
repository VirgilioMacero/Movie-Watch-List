import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/search";
import { Toggle } from "../component/toggle.js";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  useEffect(() => {
    if (store.isSeriesActive) {
      actions.getSeriesByName("A").then(() => {
        setIsLoading(false);
      });
    } else {
      actions.getMoviesByName("A").then(() => {
        setIsLoading(false);
      });
    }
  }, [store.isSeriesActive]); // Fetch data when isSeriesActive changes

  useEffect(() => {
    if (searchQuery === "") {
      // If searchQuery is empty, reload initial movies or series
      if (store.isSeriesActive) {
        actions.getSeriesByName("A");
      } else {
        actions.getMoviesByName("A");
      }
    } else {
      // If searchQuery is not empty, search for movies or series
      if (store.isSeriesActive) {
        actions.getSeriesByName(searchQuery);
      } else {
        actions.getMoviesByName(searchQuery);
      }
    }
  }, [searchQuery, store.isSeriesActive]); // Reload when searchQuery or isSeriesActive changes

  return (
    <div className="text-center mt-5 container">
      <Toggle />

      <Search setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {store.isSeriesActive
            ? store.films.map((film) => (
                <FilmCard
                  key={film.id}
                  name={film.original_name}
                  imgUrl={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                  filmUrl={`/single/${film.id}`}
                  className="col mt-3"
                />
              ))
            : store.films.map((film) => (
                <FilmCard
                  key={film.id}
                  name={film.original_title}
                  imgUrl={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                  filmsUrl={`/single/${film.id}`}
                  className="col mt-3"
                />
              ))}
        </div>
      )}

    </div>
  );
};
