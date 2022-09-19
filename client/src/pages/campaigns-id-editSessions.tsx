import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";
import "./campaigns-create.css";

function CampaignEdit() {
  const { id, session_id } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [characters, setCharacters] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [moments, setMoments] = useState("");

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () =>
    axios
      .get(`http://localhost:9444/campaigns/${session_id}/edit/${id}`)
      .then((response) => {
        console.log(id);
        console.log(response);
        // console.log(response.data.sessionData)
        setEditSession(response.data.editSession);
        console.log(response.data.editSession);
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const sessionData = {
      title,
      date,
      characters,
      knowledge,
      moments,
    };

    try {
      const result = await axios.put(
        `http://localhost:9444/campaigns/${session_id}/edit/${id}`,
        sessionData
      );
      const data = result.data;
      console.log("RESULT OF ADD STORY", data);
    } catch (err) {
      console.log(err);
    }
  };

  const [editSession, setEditSession] = useState<any[]>([]);

  const deleteCampaign = async () => {
    try {
      const resultOfDelete = await axios.delete(
        `http://localhost:9444/campaigns/${session_id}/delete/${id}`
      );
      const data = resultOfDelete.data;
      console.log("RESULT OF Delete", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="Create" onSubmit={handleFormSubmit}>
      {editSession.map((session, index) => {
        return (
          <div className="container-flex">
            <div className="title-row">
              <h5>Session Title</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={session.title}
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />

            <div className="players-row">
              <h5>Date</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={session.date}
              onChange={(evt) => setDate(evt.target.value)}
              value={date}
            />

            <div className="description-row">
              <h5>Characters</h5>
            </div>
            <input
              type="textarea"
              className="form-control"
              placeholder={session.characters}
              onChange={(evt) => setCharacters(evt.target.value)}
              value={characters}
            />
            <div className="date-row">
              <h5>Knowledge</h5>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={session.knowledge}
              onChange={(evt) => setKnowledge(evt.target.value)}
              value={knowledge}
            />

            <div className="description-row">
              <h5>Moments</h5>
            </div>
            <input
              type="textarea"
              className="form-control"
              placeholder={session.moments}
              onChange={(evt) => setMoments(evt.target.value)}
              value={moments}
            />
            <div>
              <button type="submit" className="btn btn-success m-3">
                <Link className="nav-link" to="/campaigns">
                  Edit Session
                </Link>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-success m-3"
                onClick={deleteCampaign}
              >
                <Link
                  className="nav-link"
                  to={`/campaigns/${session.session_id}/sessions`}
                >
                  Delete Session
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
