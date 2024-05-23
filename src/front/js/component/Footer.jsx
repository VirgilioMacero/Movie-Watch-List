import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => (
  <div className=" footer">
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          © 2024 Watch & Go, Inc
        </p>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to={"/"} className="nav-link px-2 text-body-secondary">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link px-2 text-body-secondary">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/about_us"}
              className="nav-link px-2 text-body-secondary"
            >
              About
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  </div>
);
