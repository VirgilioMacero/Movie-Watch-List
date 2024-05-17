import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import NeedLogin from "../component/NeedLogin.jsx";

export default function Profile() {
  const { store, actions } = useContext(Context);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  function handleShowPassword(e) {
    e.preventDefault();

    const password = document.getElementById("password");
    const rePassword = document.getElementById("rePassword");

    if (showPassword) {
      password.type = "text";
      rePassword.type = "text";
    } else {
      password.type = "password";
      rePassword.type = "password";
    }
    setShowPassword(!showPassword);
  }
  function handleSave(e) {
    e.preventDefault();

    if (email != "" || password != "") {
    } else {
      alert("You need to add some data to change");
    }
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      {!store.isLoged ? (
        <NeedLogin />
      ) : (
        <div
          style={{
            border: "1px solid #DEE2E6",
            borderRadius: "10px",
            padding: "50px",
          }}
        >
          <h3>Change Profile</h3>
          <form>
            <div className="d-flex flex-column mt-4">
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                style={{
                  border: "1px solid #DEE2E6",
                  borderRadius: "10px",
                  padding: "10px",
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex flex-column mt-4">
              <label htmlFor="reEmail" style={{ fontWeight: "bold" }}>
                Re-Enter Email
              </label>
              <input
                id="reEmail"
                type="email"
                style={{
                  border: "1px solid #DEE2E6",
                  borderRadius: "10px",
                  padding: "10px",
                }}
                value={reEmail}
                onChange={(e) => {
                  setReEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex flex-column mt-4">
              <label htmlFor="password" style={{ fontWeight: "bold" }}>
                Password
              </label>
              <div className="passwordInput">
                <input
                  id="password"
                  type="password"
                  style={{
                    border: "none",
                    width: "95%",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleShowPassword(e);
                  }}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-fill h4"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill h4"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="d-flex flex-column mt-4">
              <label htmlFor="rePassword" style={{ fontWeight: "bold" }}>
                Re-Enter Password
              </label>
              <div className="passwordInput">
                <input
                  id="rePassword"
                  type="password"
                  style={{
                    border: "none",
                    width: "95%",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  value={rePassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                ></input>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleShowPassword(e);
                  }}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-fill h4"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill h4"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button
                className="btn bg-primary w-25 loginButton"
                style={{
                  fontWeight: "bold",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                onClick={(e) => {
                  handleSave(e);
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
