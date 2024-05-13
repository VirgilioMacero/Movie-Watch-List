import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export default function Register(props) {
  const { store, actions } = useContext(Context);

  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");

  return (
    <Modal
      show={props.showRegisterModal}
      onHide={() => props.setShowRegisterModal(false)}
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
                props.setShowRegisterModal(false);
                actions.setShowLoginModal(true);
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
  );
}
