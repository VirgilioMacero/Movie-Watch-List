import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export default function FilmCard(props) {
  const { store, actions } = useContext(Context);

  const handleIconClickFavorite = (event) => {
    event.preventDefault(); // Prevent the default behavior of the link click
    if (!store.isLoged) {
      actions.setShowLoginModal(true);
    } else {
      if (!props.isFavorite) {
        actions.setFavorite(
          props.film_id,
          props.name,
          props.film_image,
          props.is_movie
        );
      } else {
        actions.deleteFavorite(props.favorite_id);
      }
    }
  };

  const handleIconClickRecently = (event) => {
    event.preventDefault(); // Prevent the default behavior of the link click
    if (!store.isLoged) {
      actions.setShowLoginModal(true);
    } else {
      if (!props.isWatched) {
        actions.setRecently(
          props.film_id,
          props.name,
          props.film_image,
          props.is_movie
        );
      } else {
        actions.deleteRecently(props.recently_id);
      }
    }
  };

  return (
    <Link
      className={`text-decoration-none ${props.className}`}
      to={props.filmUrl}
    >
      <div
        className="FilmCard"
        style={{
          backgroundImage: `url(${props.imgUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex flex-row-reverse">
          <div className="FilmCardButtons">
            {props.isWatched !== true ? (
              <i
                onClick={(event) => handleIconClickRecently(event)}
                className="bi bi-eye-slash h3 text-dark"
              ></i>
            ) : (
              <i
                onClick={(event) => handleIconClickRecently(event)}
                className="bi bi-eye h3 "
              ></i>
            )}
            {props.isFavorite !== true ? (
              <i
                onClick={(event) => handleIconClickFavorite(event)}
                className="bi bi-star h3 text-dark"
              ></i>
            ) : (
              <i
                onClick={(event) => handleIconClickFavorite(event)}
                className="bi bi-star-fill h3 text-warning"
              ></i>
            )}
          </div>
        </div>
        <div className="FilmCardTitle">
          <p>{props.name}</p>
        </div>
      </div>
    </Link>
  );
}
