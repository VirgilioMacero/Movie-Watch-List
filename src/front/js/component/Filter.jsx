import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styles

export const Filter = ({ show, onClose, onApply, isSeriesActive }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleApply = () => {
    onApply(selectedGenre);
    onClose();
  };

  if (!show) {
    return null;
  }

  const movieGenres = [
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
    { value: "science fiction", label: "Science Fiction" },
    { value: "tv movie", label: "TV Movie" },
    { value: "thriller", label: "Thriller" },
    { value: "war", label: "War" },
    { value: "western", label: "Western" },
  ];

  const seriesGenres = [
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

  const genres = isSeriesActive ? seriesGenres : movieGenres;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Filter By Date</h2>
        <div className="date-filter">
          <div className="date-input">
            <label>From:</label>
            <input type="date" />
          </div>
          <div className="date-input">
            <label>To:</label>
            <input type="date" />
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
        <button className="apply-button btn btn-primary" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};
