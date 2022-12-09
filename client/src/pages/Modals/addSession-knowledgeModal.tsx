import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";

function MyVerticallyCenteredModalCampaigns(props: any) {
  const [knowledge, setKnowledge] = useState("");

  let userObj = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const campaignData = {
      knowledge,
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
          Did The Group Gain New Knowledge?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="Create" onSubmit={handleFormSubmit}>
          <div className="long-term">
            <input
              type="textarea"
              className="form-control"
              placeholder="Describe Here!"
              onChange={(evt) => setKnowledge(evt.target.value)}
              value={knowledge}
            />
            <button>Add</button>
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
