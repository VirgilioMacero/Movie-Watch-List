import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Search = ({ setSearchQuery }) => {
  const { actions } = useContext(Context);

  const handleInputChange = (e) => {
    const searchQuery = e.target.value.trim(); // Trim any whitespace from input
    setSearchQuery(searchQuery); // Update search query
  };

  const handleInputEmpty = () => {
    setSearchQuery(""); // Set search query to empty
  };

  return (
    <div className="w-100">
      <div className="add-content">
        <div className="input-wrapper">
          <input
            type="text"
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.key === "Backspace" && e.target.value === "") {
                handleInputEmpty(); // Call handleInputEmpty when backspacing and input is empty
              }
            }}
            placeholder="Search from Title here ..."
          />
        </div>
      </div>
    </div>
  );
};
