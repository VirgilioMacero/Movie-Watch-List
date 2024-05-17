import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function NeedLogin() {
  const { store, actions } = useContext(Context);

  return (
    <div
      style={{
        border: "2px solid #DEE2E6",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>You need to log In</h3>
      <button
        className="btn bg-primary  loginButton"
        style={{ fontWeight: "bolder", marginTop: "20px" }}
        onClick={() => {
          actions.setShowLoginModal(true);
        }}
      >
        Log In
      </button>
    </div>
  );
}
