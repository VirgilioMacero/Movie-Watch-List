import React from "react";

export default function MovieCard(props) {
  return (
    <a className="text-decoration-none" href={props.movieUrl}>
      <div
        className="MovieCard"
        style={{
          background: `url(${props.imgUrl})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="MovieCardButtons">
          {props.isWatched != true ? (
            <a
              onClick={(event) => {
                event.preventDefault();
                props.addToWatched(props.id);
              }}
            >
              <i className="bi bi-eye-slash h3 text-dark"></i>
            </a>
          ) : (
            <a
              onClick={(event) => {
                event.preventDefault();
                props.removeFromWatched(props.id);
              }}
            >
              <i className="bi bi-eye h3 "></i>
            </a>
          )}{" "}
          {props.isFavorite != true ? (
            <a
              onClick={(event) => {
                event.preventDefault();
                props.addToFavorites(props.id);
              }}
            >
              <i className="bi bi-star h3 text-dark"></i>
            </a>
          ) : (
            <a
              onClick={(event) => {
                event.preventDefault();
                props.addToFavorites(props.id);
              }}
            >
              <i className="bi bi-star-fill h3 text-warning"></i>
            </a>
          )}
        </div>
        <div className="MovieCardTitle">
          <p>{props.name}</p>
        </div>
      </div>
    </a>
  );
}
