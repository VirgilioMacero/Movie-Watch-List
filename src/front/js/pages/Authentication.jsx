import React, { useState, useContext } from "react";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
import { Context } from "../store/appContext";
import { action } from "easy-peasy";
import ForgotPassword from "../component/ForgotPassword.jsx";

export default function Authentication(props) {
  const { store, actions } = useContext(Context);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRevoveryModal, setShowRevoveryModal] = useState(false);

  const handleNewUserClick = () => {
    actions.setShowLoginModal(false); // Close the login modal
    setShowRegisterModal(true); // Show the register modal
  };

  const handleRecoveryClick = (e) => {
    e.preventDefault();
    actions.setShowLoginModal(false); // Close the login modal
    setShowRevoveryModal(true);
  };

  return (
    <div>
      <Login
        showLoginModal={store.setShowLoginModal}
        setShowLoginModal={() => {
          actions.setShowLoginModal();
        }}
        handleNewUserClick={handleNewUserClick}
        handleRecoveryClick={handleRecoveryClick}
      />
      <Register
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />
      <ForgotPassword
        showRevoveryModal={showRevoveryModal}
        setShowRevoveryModal={setShowRevoveryModal}
      />
    </div>
  );
}
