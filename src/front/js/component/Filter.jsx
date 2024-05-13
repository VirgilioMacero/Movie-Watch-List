import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const Filter = ({ onSelect }) => {
  const handleOptionSelect = (option) => {
    onSelect(option);
  };

  return (
    <div>
      <button onClick={() => handleOptionSelect("genre")}>Genre</button>
      <button onClick={() => handleOptionSelect("reviews")}>Reviews</button>
    </div>
  );
};

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
    setShowFilter(false); // Close the filter component after selection
  };

  return (
    <div>
      <FontAwesomeIcon icon={faFilter} onClick={handleFilterToggle} />
      {showFilter && <Filter onSelect={handleFilterSelect} />}
      {selectedFilter && <p>Selected Filter: {selectedFilter}</p>}
    </div>
  );
};

export default Home;
