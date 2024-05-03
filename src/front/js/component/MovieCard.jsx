import React from "react";

export default function MovieCard(props) {
  return (
    <div className={`${props.className}`}>
      <a className="text-decoration-none" href={props.movieUrl}>
        <div
          className="MovieCard"
          style={{
            background: `url(${props.imgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="MovieCardButtons">
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
          <div className="MovieCardTitle">
            <p>{props.name}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
