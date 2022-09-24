import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./campaigns.css";
import { getPreEmitDiagnostics } from "typescript";

function Campaigns() {
  const [results, setResults] = useState<any[]>([]);
  const { title } = useParams();

  let userObj = JSON.parse(localStorage.getItem("user") || "{}");

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

  return (
    <div className="container">
      <div className="row border-bottom border-primary border-2 my-4 pb-3">
        <div className="col-9">
          <h3 className="my-campaigns">My Campaigns</h3>
        </div>
        <div className="col-3">
          <button className="button-create">
            <Link className="nav-link" to="/campaigns/create">
              Create Campaign!
            </Link>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col align-self-start mt-2">
          <h4 className="active-campaigns">Active/Inactive Campaigns</h4>
        </div>
      </div>

      <div className="row">
        {results
          // .filter((campaign) => campaign.userPlayer === userObj.username)
          .map((campaign, index) => {
            return (
              <div className="col-4 mx-auto">
                <div className="card">
                  <div>
                    <button className="button-circle">
                      <Link
                        className="nav-link"
                        to={`/campaigns/${campaign._id}/edit`}
                      >
                        Edit
                      </Link>
                    </button>
                    <div className="row">
                      <div className="col-6">
                        <p className="campaign-title">{campaign.title}</p>
                      </div>
                    </div>
                  </div>
                  <p className="started">
                    campaign started {campaign.startDate}
                  </p>

                  <div className="url">
                    http://localhost:3000/campaigns/join/{campaign._id}
                  </div>

                  <div className="players">Players: {campaign.players}</div>

                  <div className="dm">DM:</div>
                  <div className="row">
                    <div className="buttons-bottom">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <Link
                          className="nav-link"
                          to={`/campaigns/${campaign._id}/sessions`}
                        >
                          View Sessions
                        </Link>
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                      >
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
          })}
        <div></div>
      </div>
    </div>
  );
}

export default Campaigns;
