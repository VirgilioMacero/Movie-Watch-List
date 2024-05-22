import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // For Bootstrap styles

export const Filter = ({ show, onClose, onApply, isSeriesActive }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleApply = () => {
    const filterCount = [selectedGenre, selectedCategory, fromDate || toDate].filter(Boolean).length;

    if (filterCount > 1) {
      setValidationMessage("Please select only one filter at a time.");
      return;
    }

    setValidationMessage("");
    onApply(selectedGenre, selectedCategory, fromDate, toDate);
    onClose();
  };

  const handleRemoveFilter = (filterType) => {
    if (filterType === "genre") {
      setSelectedGenre("");
    } else if (filterType === "category") {
      setSelectedCategory("");
    } else if (filterType === "fromDate") {
      setFromDate("");
    } else if (filterType === "toDate") {
      setToDate("");
    }
  };

  if (!show) {
    return null;
  }

  const movieGenres = [
    { value: "", label: "Choose a Genre" },
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "animation", label: "Animation" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "documentary", label: "Documentary" },
    { value: "drama", label: "Drama" },
    { value: "family", label: "Family" },
    { value: "fantasy", label: "Fantasy" },
    { value: "history", label: "History" },
    { value: "horror", label: "Horror" },
    { value: "music", label: "Music" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "scienceFiction", label: "Science Fiction" },
    { value: "tvMovie", label: "TV Movie" },
    { value: "thriller", label: "Thriller" },
    { value: "war", label: "War" },
    { value: "western", label: "Western" },
  ];

  const seriesGenres = [
    { value: "", label: "Choose a Genre" },
    { value: "actionAdventure", label: "Action & Adventure" },
    { value: "animation", label: "Animation" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "documentary", label: "Documentary" },
    { value: "drama", label: "Drama" },
    { value: "family", label: "Family" },
    { value: "kids", label: "Kids" },
    { value: "mystery", label: "Mystery" },
    { value: "news", label: "News" },
    { value: "reality", label: "Reality" },
    { value: "scifiFantasy", label: "Sci-Fi & Fantasy" },
    { value: "soap", label: "Soap" },
    { value: "talk", label: "Talk" },
    { value: "warPolitics", label: "War & Politics" },
    { value: "western", label: "Western" },
  ];

  const categories = [
    { value: "", label: "Choose a Category" },
    { value: "topRated", label: "Top Rated" },
    { value: "popular", label: "Popular" },
    { value: "trending", label: "Trending" },
  ];

  const genres = isSeriesActive ? seriesGenres : movieGenres;

  const getLabelForValue = (value, list) => {
    const item = list.find((item) => item.value === value);
    return item ? item.label : value;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{}}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 style={{ marginBottom: "25px" }}>Filter By Date</h2>
        <div className="date-filter">
          <div className="date-input">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="date-input" style={{ gap: "27px" }}>
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="genreContent">
          <h2 className="genreHeader">Filter By Genre</h2>
          <div className="genreForm">
            <select
              className="genreBar form-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="categoryContent">
          <h2 className="categoryHeader">Filter By Category</h2>
          <div className="categoryForm">
            <select
              className="categoryBar form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {validationMessage && (
          <div className="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}

        <div className="applied-filters mt-3">
          {selectedGenre && (
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleRemoveFilter("genre")}
            >
              {getLabelForValue(selectedGenre, genres)} <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          {selectedCategory && (
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleRemoveFilter("category")}
            >
              {getLabelForValue(selectedCategory, categories)} <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          {fromDate && (
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleRemoveFilter("fromDate")}
            >
              From: {fromDate} <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          {toDate && (
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleRemoveFilter("toDate")}
            >
              To: {toDate} <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <button
          className="apply-button btn btn-primary"
          style={{ marginTop: "25px" }}
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
