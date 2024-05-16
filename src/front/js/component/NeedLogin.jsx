import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function NeedLogin() {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>You Need to Log In</h1>
      <button
        className="btn bg-primary text-light"
        onClick={() => {
          actions.setShowLoginModal(true);
        }}
      >
        Log In
      </button>
    </div>
  );
}
