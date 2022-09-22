import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";
import "./campaigns-create.css";

interface CampaignData {
  title: string;
  players: string[];
  startDate: string;
  description: string;
  userObj: string;
}

interface UserObj {
  password: string;
  token: string;
  username: string;
  _id: string;
}

export interface Players {}

function CampaignCreate() {
  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  let userObj: UserObj & string = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  console.log("LOOOOK HERE", userObj);

  const navigate = useNavigate();

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();
    navigate("/campaigns");

    const campaignData: CampaignData = {
      title,
      players: [players],
      startDate,
      description,
      userObj,
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
    <form className="Create" onSubmit={handleFormSubmit}>
      <div className="container-flex">
        <header className="header-row">
          <h1 className="col">Create a Campaign</h1>
        </header>
        <div className="title-row">
          <h5>Campaign Title</h5>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Campaign Title"
          onChange={(evt) => setTitle(evt.target.value)}
          value={title}
        />
        <div className="players-row">
          <h5>Players</h5>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Players"
          onChange={(evt) => console.log(setPlayers(evt.target.value))}
          value={players}
        />
        <div className="date-row">
          <h5>Start Date</h5>
        </div>
        <input
          type="date"
          className="form-control"
          placeholder="Start date"
          onChange={(evt) => console.log(setStartDate(evt.target.value))}
          value={startDate}
        />
        <div className="description-row">
          <h5>Campaign Description</h5>
        </div>
        <input
          type="textarea"
          className="form-control"
          placeholder="Description"
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />

        <button type="submit" className="btn btn-success m-3">
          {/* <Link className="nav-link" to="/campaigns">
            Create Campaign
          </Link> */}
        </button>
      </div>
    </form>
  );
}

export default CampaignCreate;
