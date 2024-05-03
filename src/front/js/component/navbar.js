import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
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
  );
};
