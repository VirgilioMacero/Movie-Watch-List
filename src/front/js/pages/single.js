import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getSingleMovie(params.theid);
  }, [params.theid]);

  const year = new Date(store.movie.release_date);

  return (
    <div className="container">
      <div className="d-flex">
        <h1>
          <Link to={"/"}>
            <i className="bi bi-caret-left"></i>
          </Link>
          {store.movie.original_title} ({year.getFullYear()})
        </h1>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <img
            width={300}
            height={400}
            src={`https://image.tmdb.org/t/p/original${store.movie.poster_path}`}
          ></img>
        </div>
        <div className="col">
          <h3>Description</h3>
          <p>{store.movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
