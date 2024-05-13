import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export default function FilmCard(props) {
  const { store, actions } = useContext(Context);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");

  const handleIconClickFavorite = (event) => {
    event.preventDefault(); // Prevent the default behavior of the link click
    if (!store.isLoged) {
      setShowLoginModal(true);
    } else {
      console.log("Loged");
      setShowLoginModal(false);
    }
  };

  const handleIconClickRecently = (event) => {
    event.preventDefault(); // Prevent the default behavior of the link click
    if (!store.isLoged) {
      setShowLoginModal(true);
    } else {
      console.log("Loged");
      setShowLoginModal(false);
      // If user is logged in, add the film to recently watched list
      actions.addRecentlyWatched(props.film.id, props.film.original_title, props.isMovie);
    }
  };

  const handleNewUserClick = () => {
    setShowLoginModal(false); // Close the login modal
    setShowRegisterModal(true); // Show the register modal
  };

  return (
    <div className={`${props.className}`}>
      <Link className="text-decoration-none" to={props.filmUrl}>
        <div
          className="FilmCard"
          style={{
            backgroundImage: `url(${props.imgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="d-flex flex-row-reverse">
            <div className="FilmCardButtons">
              {props.isWatched !== true ? (
                <i
                  onClick={(event) => handleIconClickRecently(event)}
                  className="bi bi-eye-slash h3 text-dark"
                ></i>
              ) : (
                <i
                  onClick={(event) => handleIconClickRecently(event)}
                  className="bi bi-eye h3 "
                ></i>
              )}
              {props.isFavorite !== true ? (
                <i
                  onClick={(event) => handleIconClickFavorite(event)}
                  className="bi bi-star h3 text-dark"
                ></i>
              ) : (
                <i
                  onClick={(event) => handleIconClickFavorite(event)}
                  className="bi bi-star-fill h3 text-warning"
                ></i>
              )}
            </div>
          </div>
          <div className="FilmCardTitle">
            <p>{props.name}</p>
          </div>
        </div>
      </Link>

      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        className="rounded-3"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                placeholder="Enter email address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{ width: "100%" }}
              onClick={(e) => {
                e.preventDefault();
                actions.login(loginEmail, loginPassword);
                setShowLoginModal(false);
              }}
            >
              Submit
            </Button>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
              <Form.Check type="checkbox" label="Remember me" />

              <Button
                variant="link"
                className="text-decoration-none"
                onClick={handleNewUserClick}
              >
                <Form.Text
                  className="text"
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    fontSize: "16px",
                  }}
                >
                  New User?
                </Form.Text>
              </Button>
            </div>
            <Button variant="warning" type="forgot" className="forgotPassword">
              {" "}
              Forgot Password?{" "}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Register Modal */}
      <Modal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={registerName}
                onChange={(e) => {
                  setRegisterName(e.target.value);
                }}
                type="text"
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={registerLastName}
                onChange={(e) => {
                  setRegisterLastName(e.target.value);
                }}
                type="text"
                placeholder="Enter your last name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter email address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={registerPassword}
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                value={registerRePassword}
                onChange={(e) => {
                  setRegisterRePassword(e.target.value);
                }}
                type="password"
                placeholder="Re-enter password"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                if (registerPassword === registerRePassword) {
                  actions.register(
                    registerName,
                    registerLastName,
                    registerEmail,
                    registerPassword
                  );
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }
              }}
              type="submit"
              style={{ width: "100%" }}
            >
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
