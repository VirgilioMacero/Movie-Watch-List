import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styles

export const Filter = ({ show, onClose }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
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
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="date-input">
            <label>To:</label>
            <input type="date" />
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
        </div>
        <h2 class="genreHeader">Filter By Genre</h2>
        <select>
          <option value="">Select Genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          {/* Add more genres as needed */}
        </select>
        <h2  class="ratingHeader">Filter By Rating</h2>
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
    </div>
  );
};
