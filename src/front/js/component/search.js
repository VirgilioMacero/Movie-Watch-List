import React, { useState, useContext, useEffect } from "react"; // Import useEffect from react
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Search = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="w-100">
      <div className="add-content">
        <div className="input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              actions.getMoviesByName(e.target.value);
            }}
            placeholder="Search from Title here ..."
          />
        </div>
      </div>
    </div>
  );
};
