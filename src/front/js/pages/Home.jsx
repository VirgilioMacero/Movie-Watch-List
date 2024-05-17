import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../component/Filter.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (store.isSeriesActive) {
        await actions.getSeriesByName("A");
      } else {
        await actions.getMoviesByName("A");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [store.isSeriesActive]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery === "") {
        if (store.isSeriesActive) {
          await actions.getSeriesByName("A");
        } else {
          await actions.getMoviesByName("A");
        }
      } else {
        if (store.isSeriesActive) {
          await actions.getSeriesByName(searchQuery);
        } else {
          await actions.getMoviesByName(searchQuery);
        }
      }
    };
    fetchSearchResults();
  }, [searchQuery, store.isSeriesActive]);

  useEffect(() => {
    const fetchGenreResults = async () => {
      if (store.selectedGenre) {
        if (store.isSeriesActive) {
          await actions.getSeriesByGenre(store.selectedGenre);
        } else {
          await actions.getMoviesByGenre(store.selectedGenre);
        }
      }
    };
    fetchGenreResults();
  }, [store.selectedGenre, store.isSeriesActive]);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterApply = async (selectedGenre, selectedCategory, fromDate, toDate) => {
    setIsLoading(true);

    try {
      if (selectedGenre) {
        if (store.isSeriesActive) {
          await actions.getSeriesByGenre(selectedGenre);
        } else {
          await actions.getMoviesByGenre(selectedGenre);
        }
      }

      if (selectedCategory) {
        if (selectedCategory === "trending") {
          if (store.isSeriesActive) {
            await actions.getTrendingSeries();
          } else {
            await actions.getTrendingMovies();
          }
        } else if (selectedCategory === "topRated") {
          if (store.isSeriesActive) {
            await actions.getTopRatedSeries();
          } else {
            await actions.getTopRatedMovies();
          }
        } else if (selectedCategory === "popular") {
          if (store.isSeriesActive) {
            await actions.getPopularSeries();
          } else {
            await actions.getPopularMovies();
          }
        }
      }

      if (fromDate && toDate) {
        if (store.isSeriesActive) {
          await actions.getSeriesDate(fromDate, toDate);
        } else {
          await actions.getMovieDate(fromDate, toDate);
        }
      }

      setShowFilter(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const getFavoriteId = (movieId, is_movie) => {
    const result = store.favoriteFilms.find(
      (film) => film.film_id === movieId && film.is_movie === is_movie
    );

    return result ? result.id : null;
  };

  const getRecentlyId = (movieId, is_movie) => {
    const result = store.recentlyWatchedFilms.find(
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
          />
        </div>
      </div>

      <Filter
        show={showFilter}
        onClose={handleFilterToggle}
        onApply={handleFilterApply}
        isSeriesActive={store.isSeriesActive}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {store.films.map((film) => {
            if (film.backdrop_path != null) {
              const favorite_id = getFavoriteId(film.id, !store.isSeriesActive);
              const recently_id = getRecentlyId(film.id, !store.isSeriesActive);
              return (
                <FilmCard
                  key={film.id}
                  favorite_id={favorite_id}
                  recently_id={recently_id}
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
                  isWatched={store.recentlyWatchedFilms.some(
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

export default Home;
