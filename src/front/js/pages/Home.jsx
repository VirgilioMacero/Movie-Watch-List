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
  }, [store.isSeriesActive]); // Fetch data when isSeriesActive changes

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
  }, [searchQuery, store.isSeriesActive]); // Reload when searchQuery or isSeriesActive changes

  const handleFilterToggle = () => {
    setShowFilter(!showFilter); // Toggle filter visibility
  };

  const handleFilterApply = async (selectedGenre, selectedRating) => {
    setIsLoading(true);
    let minRating = 0;
    let maxRating = 10; // Maximum rating value
    if (selectedRating) {
      // Set rating range based on selected rating
      minRating = (selectedRating - 1) * 2; // Adjust min rating based on selected star
      maxRating = selectedRating * 2; // Adjust max rating based on selected star
    }
    try {
      if (selectedGenre) {
        if (store.isSeriesActive) {
          await actions.getSeriesByGenre(selectedGenre);
        } else {
          await actions.getMoviesByGenre(selectedGenre);
        }
      }
      if (store.isSeriesActive) {
        await actions.getSeriesByRating({ min: minRating, max: maxRating });
      } else {
        await actions.getMoviesByRating({ min: minRating, max: maxRating });
      }
      setShowFilter(false); // Hide filter component after selection
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

      <Filter 
        show={showFilter} 
        onClose={handleFilterToggle} 
        onApply={handleFilterApply} 
        isSeriesActive={store.isSeriesActive} // Pass isSeriesActive to Filter component
      />
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
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
