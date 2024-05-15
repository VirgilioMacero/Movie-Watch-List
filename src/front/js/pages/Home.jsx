import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../component/Filter.jsx"; // Import the updated Filter component

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [showFilter, setShowFilter] = useState(false); // State for filter visibility

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

  const handleFilterToggle = () => {
    setShowFilter(!showFilter); // Toggle filter visibility
  };

  const handleFilterSelect = (option) => {
    // Handle the filter selection logic here
    setShowFilter(false); // Hide filter component after selection
  };

  const getFavoriteId = (movieId, is_movie) => {
    const result = store.favoriteFilms.find(
      (film) => film.film_id === movieId && film.is_movie === is_movie
    );

    return result ? result.id : null;
  };

  return (
    <div className="text-center mt-5 container">
      <Toggle />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Search setSearchQuery={setSearchQuery} style={{ width: "90%" }} />
        <div className="filter-icon-wrapper">
          <FontAwesomeIcon
            icon={faFilter}
            onClick={handleFilterToggle}
            className="filter-icon"
          />{" "}
        </div>
      </div>
      <Filter show={showFilter} onClose={handleFilterToggle} />{" "}
      {/* Render Filter component as a modal */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {store.films.map((film) => {
            if (film.backdrop_path != null) {
              const id = getFavoriteId(film.id, !store.isSeriesActive);
              return (
                <FilmCard
                  key={film.id}
                  id={id}
                  name={
                    film.original_title
                      ? film.original_title.substring(0, 35)
                      : film.name.substring(0, 35)
                  }
                  film_id={film.id}
                  imgUrl={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                  film_image={film.backdrop_path}
                  isFavorite={store.favoriteFilms.some(
                    (filme) => filme.film_id === film.id
                  )}
                  filmUrl={`/single/${film.id}`}
                  is_movie={!store.isSeriesActive}
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
