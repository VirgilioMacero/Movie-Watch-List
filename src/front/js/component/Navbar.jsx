import React, { useState, useEffect, useContext } from "react";
import WatchGoImage from "../../img/WatchGO-LightMode.png";
import WatchGoImageDark from "../../img/WatchGO-DarkMode.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ClickOutsideComponent from "./ClickOutsideComponent.jsx";

export const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.isLoged) {
      actions.getUser();
    }
  }, []);

  useEffect(() => {
    const darkModeClass = store.isDarkMode ? "dark-mode" : "";
    document.body.className = darkModeClass;
  }, [store.isDarkMode]);

  const toggleDarkMode = () => {
    actions.setIsDarkMode(!store.isDarkMode);
  };

  const handleLogoClick = async () => {
    await actions.resetFilters();
  };

  return (
    <div>
      {showNavBar ? (
        <ClickOutsideComponent
          onOutsideClick={() => {
            setShowNavBar(false);
          }}
        >
          <div className="Side-NavBar" id="SideNavBar">
            <div className="d-flex flex-row-reverse">
              <button
                onClick={() => setShowNavBar(!showNavBar)}
                className="btn"
                style={{ borderRadius: "0px", borderBottomLeftRadius: "10px" }}
              >
                <i className="bi bi-x-lg h4"></i>
              </button>
            </div>
            <div className="d-flex flex-column justify-content-between Side-NavBar-Buttons">
              <ul>
                <Link to="/" onClick={() => setShowNavBar(false)}>
                  <li>
                    <i className="bi bi-house-fill h5"></i> Home
                  </li>
                </Link>
                <Link to="/favorites" onClick={() => setShowNavBar(false)}>
                  <li>
                    <i className="bi bi-star-fill h5"></i> Favorites
                  </li>
                </Link>
                <Link
                  to="/recently-watched"
                  onClick={() => setShowNavBar(false)}
                >
                  <li>
                    <i className="bi bi-eye-fill h5"></i> Recently Watched
                  </li>
                </Link>
                <Link to="/about_us" onClick={() => setShowNavBar(false)}>
                  <li>
                    <i className="bi bi-question-circle-fill h5"></i> About Us
                  </li>
                </Link>
                <Link to="/profile" onClick={() => setShowNavBar(false)}>
                  <li>
                    <i className="bi bi-person-circle h4"></i> Profile
                  </li>
                </Link>
              </ul>
              <ul>
                <li>
                  {!store.isLoged ? (
                    <button
                      className="btn bg-primary loginButton"
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
                      className="btn bg-danger loginButton"
                      style={{ fontWeight: "bolder", marginLeft: "10px" }}
                      onClick={() => {
                        actions.logOut();
                        setShowNavBar(false);
                        window.location.reload();
                      }}
                    >
                      Log Out
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </ClickOutsideComponent>
      ) : (
        ""
      )}
      <div className="container my-4 position-relative d-flex justify-content-between">
        <div>
          <button
            className="btn navbar-light text-dark border  p-2 px-3 shadow"
            type="button"
            style={{ color: "black" }}
            onClick={() => setShowNavBar(!showNavBar)}
          >
            <i className="bi bi-list h4"></i>
          </button>
          <button
            className="btn navbar-light text-dark border p-2 px-3 shadow"
            type="button"
            style={{ color: "black", marginLeft: "10px" }}
            onClick={toggleDarkMode}
          >
            <i
              className={`bi ${
                store.isDarkMode ? "bi-sun-fill" : "bi-moon-fill"
              } h4`}
            ></i>
          </button>
        </div>
        <div className="position-absolute start-50 translate-middle-x">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={store.isDarkMode ? WatchGoImageDark : WatchGoImage}
              alt="Watch & Go"
              style={{ width: "200px" }}
            />
          </Link>
        </div>
        {store.isLoged ? (
          <div style={{ alignContent: "end" }}>
            <Link className="profileLink" to={"/profile"}>
              <h5>
                Hello again, {store.user.name} {store.user.lastName}
              </h5>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
