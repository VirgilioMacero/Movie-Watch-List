import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import MovieCard from "../component/MovieCard.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 container">
      <div className="d-grid">
        <MovieCard
          name="Pinocho"
          imgUrl="https://media.poetryfoundation.org/uploads/media/default/0001/19/a8ddf0cc004e3fef6c20ae6e48cde0f10dd1f80d.jpeg"
          movieUrl=" "
        />
      </div>
    </div>
  );
};
