import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faArrowLeft,
  faArrowRight,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../component/Filter.jsx";
import Spinner from "../component/Spinner.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isDarkMode"))) {
      console.log("deberia funcionar");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [store.isDarkMode]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (store.isSeriesActive) {
        await actions.getPopularSeries(currentPage);
      } else {
        await actions.getPopularMovies(currentPage);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [store.isSeriesActive, currentPage]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      if (searchQuery === "") {
        if (store.isSeriesActive) {
          await actions.getPopularSeries(currentPage);
        } else {
          await actions.getPopularMovies(currentPage);
        }
      } else {
        if (store.isSeriesActive) {
          await actions.getSeriesByName(searchQuery, currentPage);
        } else {
          await actions.getMoviesByName(searchQuery, currentPage);
        }
      }
      setIsLoading(false);
    };
    fetchSearchResults();
  }, [searchQuery, store.isSeriesActive, currentPage]);

  useEffect(() => {
    const fetchGenreResults = async () => {
      setIsLoading(true);
      if (store.selectedGenre) {
        if (store.isSeriesActive) {
          await actions.getSeriesByGenre(store.selectedGenre, currentPage);
        } else {
          await actions.getMoviesByGenre(store.selectedGenre, currentPage);
        }
      }
      setIsLoading(false);
    };
    fetchGenreResults();
  }, [store.selectedGenre, store.isSeriesActive, currentPage]);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterApply = async (
    selectedGenre,
    selectedCategory,
    fromDate,
    toDate
  ) => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to the first page
    setPageGroup(0); // Reset to the first page group

    try {
      if (selectedGenre) {
        if (store.isSeriesActive) {
          await actions.getSeriesByGenre(selectedGenre, 1);
        } else {
          await actions.getMoviesByGenre(selectedGenre, 1);
        }
      }

      if (selectedCategory) {
        if (selectedCategory === "trending") {
          if (store.isSeriesActive) {
            await actions.getTrendingSeries(1);
          } else {
            await actions.getTrendingMovies(1);
          }
        } else if (selectedCategory === "topRated") {
          if (store.isSeriesActive) {
            await actions.getTopRatedSeries(1);
          } else {
            await actions.getTopRatedMovies(1);
          }
        } else if (selectedCategory === "popular") {
          if (store.isSeriesActive) {
            await actions.getPopularSeries(1);
          } else {
            await actions.getPopularMovies(1);
          }
        }
      }

      if (fromDate && toDate) {
        if (store.isSeriesActive) {
          await actions.getSeriesDate(fromDate, toDate, 1);
        } else {
          await actions.getMovieDate(fromDate, toDate, 1);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };

  const handlePrevGroup = () => {
    setPageGroup(pageGroup - 1);
  };

  const renderPagination = () => {
    const totalPageGroups = Math.ceil(store.totalPages / 10);
    const startPage = pageGroup * 10 + 1;
    const endPage = Math.min(startPage + 9, store.totalPages);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        {pageGroup > 0 && (
          <button onClick={handlePrevGroup} className="page-arrow">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {pages}
        {pageGroup < totalPageGroups - 1 && (
          <button onClick={handleNextGroup} className="page-arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="text-center container" style={{ marginTop: "100px" }}>
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
        <Spinner />
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
      {renderPagination()}
    </div>
  );
};

export default Home;
