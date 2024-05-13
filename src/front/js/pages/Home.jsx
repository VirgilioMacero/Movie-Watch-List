import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import FilmCard from "../component/FilmCard.jsx";
import { Search } from "../component/Search.jsx";
import { Toggle } from "../component/Toggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../component/filter.jsx"; // Import the Filter component

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [showFilter, setShowFilter] = useState(false); // State for filter visibility
  const [selectedFilter, setSelectedFilter] = useState(null); // State for selected filter option

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
    setSelectedFilter(option); // Update selected filter option
    setShowFilter(false); // Hide filter component after selection
  };

  return (
    <div className="text-center mt-5 container">
      <Toggle />
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Search setSearchQuery={setSearchQuery} style={{ width: "90%" }} />
        <FontAwesomeIcon
          icon={faFilter}
          onClick={handleFilterToggle}
          style={{ fontSize: "50px", cursor: "pointer", width: "10%" }} // Styles for the filter icon
        />{" "}
        {/* Filter toggle icon */}
      </div>
      {showFilter && <Filter onSelect={handleFilterSelect} />}{" "}
      {/* Render Filter component if showFilter is true */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {store.films.map((film) => {
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
