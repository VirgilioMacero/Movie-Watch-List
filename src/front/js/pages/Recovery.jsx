import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Recovery() {
  const { store, actions } = useContext(Context);
  let query = useQuery();
  let token = query.get("token");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    if (password != "") {
      // change Password
      if (password != "" && rePassword != "") {
        if (password === rePassword) {
          actions.changePassword(password, token);
          setPassword("");
          setRePassword("");
        } else {
          actions.showAlert(
            "Warning",
            "The Password should be same in bouth fields"
          );
        }
      } else if (password != "" && rePassword === "") {
        actions.showAlert(
          "Warning",
          "You need to Re-enter the Password for it to save"
        );
      }
    } else {
      actions.showAlert(
        "Warning",
        "You need to add some data to change the password"
      );
    }
  }

  return (
    <div
      className="container"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <div
        className="shadow"
        style={{
          border: "1px solid #DEE2E6",
          borderRadius: "10px",
          padding: "50px",
        }}
      >
        <div className="d-flex justify-content-between">
          <h3>Recovery of Password</h3>
        </div>
        <form>
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
                borderRadius: "10px",
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
    </div>
  );
}
