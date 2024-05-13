import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";

export const Favorites = () => {
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
    <div className="text-left container" style={{ marginTop: "100px" }}>
      <h2> Favorites </h2>
      <div className="d-flex flex-row-reverse mt-4">
        <Toggle />
        <Search setSearchQuery={setSearchQuery} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {store.favoriteFilms.map((film) => {
            if (film.backdrop_path != null) {
              return (
                <FilmCard
                  key={film.id}
                  name={
                    film.original_title
                      ? film.original_title.substring(0, 35)
                      : film.name.substring(0, 35)
                  }
                  imgUrl={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                  filmUrl={`/single/${film.id}`}
                  className="col mt-3"
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
