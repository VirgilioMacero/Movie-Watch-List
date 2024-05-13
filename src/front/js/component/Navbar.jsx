import React, { useState, useContext } from "react";
import WatchGoImage from "../../img/WatchGO-LightMode.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { action } from "easy-peasy";

export const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { store, actions } = useContext(Context);

  return (
    <div>
      {showNavBar ? (
        <div className="Side-NavBar" id="SideNavBar">
          <div className="d-flex flex-row-reverse">
            <button
              onClick={() => {
                setShowNavBar(!showNavBar);
              }}
              className="btn bg-danger"
              style={{
                borderRadius: "0px",
                borderBottomLeftRadius: "10px",
                borderLeft: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              <i className="bi bi-x-lg h4"></i>
            </button>
          </div>
          <ul>
            <Link
              to="/"
              onClick={() => {
                setShowNavBar(false);
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/favorites"
              onClick={() => {
                setShowNavBar(false);
              }}
            >
              <li>Favorites</li>
            </Link>
            <Link
              to="/recently-watched"
              onClick={() => {
                setShowNavBar(false);
              }}
            >
              <li>Recently Watched</li>
            </Link>
            <Link
              to="/about_us"
              onClick={() => {
                setShowNavBar(false);
              }}
            >
              <li>About Us</li>
            </Link>
          </ul>
          <ul>
            <li>
              {!store.isLoged ? (
                <button
                  className="btn bg-primary"
                  style={{ fontWeight: "bolder", marginLeft: "10px" }}
                  onClick={() => {
                    actions.setShowLoginModal(true);
                    setShowNavBar(false);
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn bg-danger"
                  style={{ fontWeight: "bolder", marginLeft: "10px" }}
                  onClick={() => {
                    actions.logOut();
                    setShowNavBar(false);
                  }}
                >
                  Log Out
                </button>
              )}
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      <div className=" container my-4 position-relative d-flex justify-content-between">
        <div>
          <button
            className="navbar-toggler navbar-light text-dark border border-secondary mx-2 my-2"
            type="button"
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="position-absolute start-50 translate-middle-x">
          <Link to="/">
            <img
              src={WatchGoImage}
              alt="Watch & Go"
              style={{ width: "200px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
