import React, { useState, useContext } from "react";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
import { Context } from "../store/appContext";
import { action } from "easy-peasy";

export default function Authentication(props) {
  const { store, actions } = useContext(Context);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleNewUserClick = () => {
    actions.setShowLoginModal(false); // Close the login modal
    setShowRegisterModal(true); // Show the register modal
  };

  const handleRegisterClick = () => {};

  return (
    <div>
      <Login
        showLoginModal={store.setShowLoginModal}
        setShowLoginModal={() => {
          actions.setShowLoginModal();
        }}
        handleNewUserClick={handleNewUserClick}
      />
      <Register
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />
    </div>
  );
}
