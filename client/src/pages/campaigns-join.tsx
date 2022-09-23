import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./campaigns.css";
import { getPreEmitDiagnostics } from "typescript";
import "@popperjs/core";

import "./campaigns-join.css";

function Campaigns() {
  const { id } = useParams();
  const [results, setResults] = useState<any[]>([]);
  const { title } = useParams();

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
      <div className="col-9">
        <h3 className="my-campaigns">My Campaigns</h3>
      </div>

      {results
        .filter((campaign) => campaign._id === id)
        .map((campaign) => {
          const player = campaign.players.split(",");
          console.log(player);
          return (
            <>
              <div className="col-4 mx-auto">
                <div className="card">
                  <div className="players"> {campaign.players}</div>
                  <div className="goobers" key={player}>
                    {player}
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" type="button">
                      <div key={player}>{player}</div>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Campaigns;
