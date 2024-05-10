import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <div>
      <button
        className="navbar-toggler navbar-light text-dark border border-secondary mx-2 my-2"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {}
    </div>
  );
};
