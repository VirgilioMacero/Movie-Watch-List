import React from "react";
import { Link } from "react-router-dom";

export default function FilmCard(props) {
  return (
    <div className={`${props.className}`}>
      <Link className="text-decoration-none" to={props.filmUrl}>
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
              {props.isWatched != true ? (
                <i
                  onClick={(event) => {
                    event.preventDefault();
                    props.addToWatched(props.id);
                  }}
                  className="bi bi-eye-slash h3 text-dark"
                ></i>
              ) : (
                <i
                  onClick={(event) => {
                    event.preventDefault();
                    props.removeFromWatched(props.id);
                  }}
                  className="bi bi-eye h3 "
                ></i>
              )}{" "}
              {props.isFavorite != true ? (
                <i
                  onClick={(event) => {
                    event.preventDefault();
                    props.addToFavorites(props.id);
                  }}
                  className="bi bi-star h3 text-dark"
                ></i>
              ) : (
                <i
                  onClick={(event) => {
                    event.preventDefault();
                    props.addToFavorites(props.id);
                  }}
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
    </div>
  );
}
