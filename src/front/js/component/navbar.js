import React from "react";
import { Link } from "react-router-dom";
import WatchGoImage from "../../img/WatchGO-LightMode.png";

export const Navbar = () => {
  return (
    <div className="position-relative d-flex justify-content-between">
      <div>
        <button
          className="navbar-toggler navbar-light text-dark border border-secondary mx-2 my-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="position-absolute start-50 translate-middle-x">
        <img src={WatchGoImage} alt="Watch & Go" style={{ width: "160px" }} />
      </div>
    </div>
  );
};
