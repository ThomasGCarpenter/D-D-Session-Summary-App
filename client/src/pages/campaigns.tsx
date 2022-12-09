import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./campaigns.css";
import { getPreEmitDiagnostics } from "typescript";

function Campaigns() {
  const [results, setResults] = useState<any[]>([]);
  const { title } = useParams();

  let userObj = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userObj._id);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () =>
    axios
      .get("http://localhost:9444/campaigns/create")
      .then((response) => {
        console.log(response.data);
        setResults(response.data.campaignData);
        console.log();
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });

  const filteredResults = results.filter((campaign) => {
    return campaign.userId === userObj._id
  })

  return (
    <div className="container">
      <div className="row">
        {filteredResults.length === 0 ? (
          <h1 className="no-campaigns-text">No Campaigns...yet! Add one!</h1>
        ) : (
          filteredResults.map((campaign, index) => {
            return (
              <div className="col-4 mx-auto">
                <div className="card">
                  <div>
                    <div className="row">
                      <div className="">
                        <p className="campaign-title">{campaign.title}</p>
                      </div>
                    </div>
                  </div>
                  <p className="started">
                    Campaign Started: {campaign.startDate}
                  </p>

                  <div className="players">Players: {campaign.players}</div>

                  <div className="dm">DM: {campaign.DM}</div>
                  <div className="row">
                    <div className="buttons-bottom">
                      <span className="add-player">
                        To Add Player, Send Invite Link
                      </span>
                      <div className="url">
                        http://localhost:3000/campaigns/join/{campaign._id}
                      </div>
                      <button className="button-edit" type="button">
                        <Link
                          className="nav-link"
                          to={`/campaigns/${campaign._id}/edit`}
                        >
                          Edit
                        </Link>
                      </button>
                      <button type="button" className="button-view">
                        <Link
                          className="nav-link"
                          to={`/campaigns/${campaign._id}/sessions`}
                        >
                          View Sessions
                        </Link>
                      </button>

                      <button type="button" className="button-add-session">
                        <Link
                          className="nav-link"
                          to={`/campaigns/${campaign._id}/addsession`}
                        >
                          Add Session
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div></div>
      </div>
    </div>
  );
}

export default Campaigns;
