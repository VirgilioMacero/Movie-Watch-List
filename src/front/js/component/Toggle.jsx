import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Toggle = () => {
  const { store, actions } = useContext(Context);

  const handleToggle = () => {
    if (store.isSeriesActive) {
      actions.getSeriesByName("A"); // Fetch series if switch toggles to "Series"
    } else {
      actions.getMoviesByName("A"); // Fetch movies if switch toggles to "Movies"
    }
    actions.toggleSeries(); // Toggle between Movies and Series
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-50 pb-4">
        <div className="add-content">
          <div className="row align-items-center">
            <div className="col pe-1 text-end" style={{ fontSize: "30px" }}>
              Movies
            </div>
            <div
              className="col d-flex justify-content-center"
              style={{ padding: "0" }}
            >
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={store.isSeriesActive}
                  onChange={handleToggle}
                  style={{ transform: "scale(2)" }}
                />
              </div>
            </div>
            <div className="col ps-1 text-start" style={{ fontSize: "30px" }}>
              Series
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
