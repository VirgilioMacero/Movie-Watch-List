import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export default function ForgotPassword(props) {
  const { store, actions } = useContext(Context);

  const [loginEmail, setLoginEmail] = useState("");

  return (
    <Modal
      show={props.showRevoveryModal}
      onHide={() => props.setShowRevoveryModal(false)}
      centered
      className="rounded-3"
    >
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
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

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              actions.recoverPassword(loginEmail);
              props.setShowRevoveryModal(false);
            }}
          >
            Send recovery email
          </Button>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <Button
              variant="link"
              className="text-decoration-none"
              onClick={props.handleNewUserClick}
            ></Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
