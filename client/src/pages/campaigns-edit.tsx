import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";
import "./campaigns-create.css";

function CampaignEdit() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () =>
    axios
      .get(`http://localhost:9444/campaigns/${id}/edit`)
      .then((response) => {
        setEditCampaign(response.data.editCampaign);
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const campaignData = {
      title,
      players,
      startDate,
      description,
    };

    try {
      const result = await axios.put(
        `http://localhost:9444/campaigns/${id}/edit`,
        campaignData
      );
      const data = result.data;
      console.log("RESULT OF ADD STORY", data);
    } catch (err) {
      console.log(err);
    }
  };

  const [editCampaign, setEditCampaign] = useState<any[]>([]);

  const deleteCampaign = async () => {
    try {
      const resultOfDelete = await axios.delete(
        `http://localhost:9444/campaigns/${id}/delete`
      );
      const data = resultOfDelete.data;
      console.log("RESULT OF Delete", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="Create" onSubmit={handleFormSubmit}>
      {editCampaign.map((campaign, index) => {
        return (
          <div className="container-flex">
            <div className="title-row">
              <h5>Campaign Title</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={campaign.title}
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />
            <div className="players-row">
              <h5>Players</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={campaign.players}
              onChange={(evt) => setPlayers(evt.target.value)}
              value={players}
            />
            <div className="date-row">
              <h5>Start Date</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={campaign.startDate}
              onChange={(evt) => setStartDate(evt.target.value)}
              value={startDate}
            />
            <div className="description-row">
              <h5>Campaign Description</h5>
            </div>
            <input
              type="textarea"
              className="form-control"
              placeholder={campaign.description}
              onChange={(evt) => setDescription(evt.target.value)}
              value={description}
            />
            <div>
              <button type="submit" className="btn btn-success m-3">
                <Link className="nav-link" to="/campaigns">
                  Edit Campaign
                </Link>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-success m-3"
                onClick={deleteCampaign}
              >
                <Link className="nav-link" to="/">
                  Delete Campaign
                </Link>
              </button>
            </div>
          </div>
        );
      })}
    </form>
  );
}

export default CampaignEdit;
