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
  const [join, setJoin] = useState("");
  let userObj = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userObj);

  const joinData = {
    join,
    userObj,
  };

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
  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    try {
      const result = await axios.put(
        `http://localhost:9444/campaigns/join/${id}`,
        joinData
      );
      const data = result.data;
      console.log("RESULT OF ADD Join", data);
    } catch (err) {
      console.log(err);
    }
  };
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
                <div className="description-row">
                  <h5>Which Player are you?</h5>
                </div>
                <input
                  type="textarea"
                  className="form-control"
                  onChange={(evt) => setJoin(evt.target.value)}
                  value={join}
                />
                <button
                  type="submit"
                  className="btn btn-success m-3"
                  onClick={handleFormSubmit}
                ></button>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Campaigns;
