import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export default function login(props) {
  const { store, actions } = useContext(Context);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <Modal
      show={props.showLoginModal}
      onHide={() => props.setShowLoginModal(false)}
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
              props.setShowLoginModal(false);
            }}
          >
            Login
          </Button>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <Form.Check type="checkbox" label="Remember me" />

            <Button
              variant="link"
              className="text-decoration-none"
              onClick={props.handleNewUserClick}
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
  );
}
