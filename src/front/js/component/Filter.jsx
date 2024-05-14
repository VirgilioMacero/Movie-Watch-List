import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styles

export const Filter = ({ show, onClose, onApply }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleApply = () => {
    onApply(selectedGenre, selectedRating);
    onClose();
  };

  if (!show) {
    return null;
  }

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
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          </div>
          <div className="date-input">
            <label>To:</label>
            <input type="date" />
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          </div>
        </div>
        <div className="genreContent">
          <h2 className="genreHeader">Filter By Genre</h2>
          <select
            className="genreBar form-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="fantasy">Fantasy</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="music">Music</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="science fiction">Science Fiction</option>
            <option value="tv movie">TV Movie</option>
            <option value="thriller">Thriller</option>
            <option value="war">War</option>
            <option value="western">Western</option>
          </select>
        </div>
        <div className="ratingSection">
        <h2 className="ratingHeader">Filter By Rating</h2>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className={star <= selectedRating ? 'selected' : ''}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
        </div>
        <button className="apply-button btn btn-primary" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};
