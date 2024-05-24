import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";
import NeedLogin from "../component/NeedLogin.jsx";

export const RecentlyWatched = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  useEffect(() => {
    if (store.isLoged) {
      if (searchQuery === "") {
        actions.loadRecently();
      } else {
        // If searchQuery is not empty, search for movies or series
        if (store.isSeriesActive) {
          actions.getRecentlySeriesByName(searchQuery);
        } else {
          actions.getRecentlyMoviesByName(searchQuery);
        }
      }
    }
  }, [searchQuery, store.isSeriesActive]); // Reload when searchQuery or isSeriesActive changes

  const getFavoriteId = (movieId, is_movie) => {
    const result = store.favoriteFilms.find(
      (film) => film.film_id === movieId && film.is_movie === is_movie
    );

    return result ? result.id : null;
  };
  return (
    <div className="text-left container" style={{ marginTop: "100px" }}>
      <h2> Recently Watched </h2>
      <div className="d-flex flex-row-reverse mt-4">
        <Toggle />
        <Search setSearchQuery={setSearchQuery} />
      </div>
      {store.isLoged ? (
        <div className="grid-container">
          {store.recentlyWatchedFilms.map((film) => {
            const favorite_id = getFavoriteId(
              film.film_id,
              !store.isSeriesActive
            );
            if (film.film_image != null) {
              if (store.isSeriesActive && !film.is_movie) {
                return (
                  <FilmCard
                    key={film.id}
                    favorite_id={favorite_id}
                    recently_id={film.id}
                    name={film.film_name.substring(0, 35)}
                    imgUrl={`https://image.tmdb.org/t/p/original/${film.film_image}`}
                    film_image={film.film_image}
                    isFavorite={store.favoriteFilms.some(
                      (filme) => filme.film_id === film.film_id
                    )}
                    isWatched={store.recentlyWatchedFilms.some(
                      (filme) => filme.film_id === film.film_id
                    )}
                    film_id={film.film_id}
                    is_movie={film.is_movie}
                    filmUrl={`/single/${film.film_id}`}
                  />
                );
              } else if (!store.isSeriesActive && film.is_movie) {
                return (
                  <FilmCard
                    key={film.id}
                    favorite_id={favorite_id}
                    recently_id={film.id}
                    name={film.film_name.substring(0, 35)}
                    imgUrl={`https://image.tmdb.org/t/p/original/${film.film_image}`}
                    film_image={film.film_image}
                    film_id={film.film_id}
                    is_movie={film.is_movie}
                    isFavorite={store.favoriteFilms.some(
                      (filme) => filme.film_id === film.film_id
                    )}
                    isWatched={store.recentlyWatchedFilms.some(
                      (filme) => filme.film_id === film.film_id
                    )}
                    filmUrl={`/single/${film.film_id}`}
                  />
                );
              }
            }
          })}
        </div>
      ) : (
        <NeedLogin />
      )}
    </div>
  );
};
