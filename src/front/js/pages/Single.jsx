import React, { useEffect, useContext, useState} from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import CastCard from "../component/CastCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });

  useEffect(() => {
    if (store.isSeriesActive) {
      actions.getSingleTvShow(params.theid);
      actions.getSeriesCredits(params.theid);
      actions.getSeriesRatings(params.theid); // Fetch series ratings
    } else {
      actions.getSingleMovie(params.theid);
      actions.getMovieCredits(params.theid);
      actions.getMovieRatings(params.theid); // Fetch movie ratings
    }
  }, [params.theid]);

  useEffect(() => {
    const darkModeClass = isDarkMode ? 'dark-mode' : '';
    document.body.className = darkModeClass;
  }, [isDarkMode]);

  const name = store.isSeriesActive ? store.film.name : store.film.original_title;
  const year = new Date(store.isSeriesActive ? store.film.first_air_date : store.film.release_date);

  const handleGenreClick = (genre) => {
    actions.setSelectedGenre(genre);
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="d-flex">
        <h1>
          <a className="backButton" onClick={() => navigate(-1)}>
            <i className="bi bi-caret-left"></i>
          </a>
          {name} ({year.getFullYear()})
          {store.reviewCount > 0 && (
            <span className="ms-3 ratingContainer">
              {store.filmRating} <FontAwesomeIcon icon={faStar} /> ({store.reviewCount} reviews)
            </span>
          )}
        </h1>
      </div>
      <div className="row mt-4">
        <div className="col-xl-4">
          {store.film.poster_path ? (
            <img
              className="rounded-3"
              width={300}
              height={400}
              src={`https://image.tmdb.org/t/p/original${store.film.poster_path}`}
            />
          ) : (
            ""
          )}
        </div>
        <div className="col-xl-6">
          <h3>Description</h3>
          <p>{store.film.overview}</p>
          <div className="d-flex gap-3" style={{ height: "40px" }}>
            {store.film.genres
              ? store.film.genres.map((genre, index) => (
                  <button
                    key={index}
                    onClick={() => handleGenreClick(genre.name)}
                    className="btn btn-outline-primary"
                  >
                    {genre.name}
                  </button>
                ))
              : ""}
          </div>
          {store.homepage && (
            <a
              href={store.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary watch-link mt-3"
            >
              <FontAwesomeIcon icon={faPlay} className="me-2" />
              {store.isSeriesActive ? "Watch the Series Here!" : "Watch the Movie Here!"}
            </a>
          )}
          <div className="mt-3">
            <h3>Cast</h3>
          </div>
          <div className="crewImages gap-3">
            {store.filmCredits.cast
              ? store.filmCredits.cast.map((member, index) =>
                  member.profile_path != null ? (
                    <CastCard
                      key={index}
                      urlImage={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                      character={member.character}
                      name={member.name}
                    />
                  ) : null
                )
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
