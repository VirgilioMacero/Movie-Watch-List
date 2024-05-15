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
    actions.loadFavorites();
  }, []); // Fetch data when isSeriesActive changes

  useEffect(() => {
    if (searchQuery === "") {
      actions.loadFavorites();
    } else {
      // If searchQuery is not empty, search for movies or series
      if (store.isSeriesActive) {
        actions.getFavoriteSeriesByName(searchQuery);
      } else {
        actions.getFavoriteMoviesByName(searchQuery);
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
      {
        <div className="row">
          {store.favoriteFilms.map((film) => {
            if (film.film_image != null) {
              if (store.isSeriesActive && !film.is_movie) {
                return (
                  <FilmCard
                    key={film.id}
                    id={film.id}
                    name={film.film_name.substring(0, 35)}
                    imgUrl={`https://image.tmdb.org/t/p/original/${film.film_image}`}
                    film_image={film.film_image}
                    isFavorite={store.favoriteFilms.some(
                      (film) => film.film_id === film.film_id
                    )}
                    film_id={film.film_id}
                    is_movie={film.is_movie}
                    filmUrl={`/single/${film.film_id}`}
                    className="col mt-3"
                  />
                );
              } else if (!store.isSeriesActive && film.is_movie) {
                return (
                  <FilmCard
                    key={film.id}
                    id={film.id}
                    name={film.film_name.substring(0, 35)}
                    imgUrl={`https://image.tmdb.org/t/p/original/${film.film_image}`}
                    film_image={film.film_image}
                    film_id={film.film_id}
                    is_movie={film.is_movie}
                    isFavorite={store.favoriteFilms.some(
                      (film) => film.film_id === film.film_id
                    )}
                    filmUrl={`/single/${film.film_id}`}
                    className="col mt-3"
                  />
                );
              }
            }
          })}
        </div>
      }
    </div>
  );
};
