import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";

function MyVerticallyCenteredModal(props: any) {
  const [name, setName] = useState("");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Character
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <h5>Character's Name </h5>
          <input
            type="textarea"
            className="form-control"
            placeholder="Name"
            onChange={(evt) => setName(evt.target.value)}
            value={name}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
