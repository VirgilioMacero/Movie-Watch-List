import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function Spinner() {
  const { store, actions } = useContext(Context);

  return (
    <div
      className={`spinner-border mt-5 ${store.isDarkMode ? "text-light" : ""}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
