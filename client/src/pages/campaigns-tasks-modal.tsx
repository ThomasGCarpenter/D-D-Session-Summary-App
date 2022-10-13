import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";

function MyVerticallyCenteredModalCampaigns(props: any) {
  const [taskLong, setTaskLong] = useState("");
  const [taskShort, setTaskShort] = useState("");

  let userObj = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const campaignData = {
      taskLong,
      taskShort,
    };

    try {
      if (userObj.token) {
        const result = await axios({
          method: "POST",
          url: "http://localhost:9444/campaigns/create",
          data: campaignData,
        });
        console.log(campaignData);
        const data = result.data;
        console.log("RESULT OF ADD STORY", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <form className="Create" onSubmit={handleFormSubmit}>
          <h5 className="to-do">To Do List</h5>
          <div className="long-term">
            Long Term
            <input
              type="textarea"
              className="form-control"
              placeholder="List any Long Term Tasks"
              onChange={(evt) => setTaskLong(evt.target.value)}
              value={taskLong}
            />
            <button>Add</button>
          </div>

          <div className="short-term">
            Short Term
            <input
              type="textarea"
              className="form-control"
              placeholder="List Any Short Term Tasks"
              onChange={(evt) => setTaskShort(evt.target.value)}
              value={taskShort}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModalCampaigns;
