import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";
import "./add-session.css";

function CreateSession() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [characters, setCharacters] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [moments, setMoments] = useState("");
  const [storylines, setStorylines] = useState("");

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const sessionData = {
      session_id: "string",
      title,
      date,
      characters,
      knowledge,
      moments,
      storylines,
    };

    try {
      const result = await axios.post(
        `http://localhost:9444/campaigns/${id}/addsession`,
        sessionData
      );
      const data = result.data;
      console.log("RESULT OF ADD STORY", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row border-bottom border-primary border-2 my-4 pb-3">
        <div className="col-9">
          <h3 className="my-campaigns">Add to your lore</h3>
        </div>
        <div className="col-3">
          <button type="submit" className="button-add">
            <Link className="nav-link" to={`/campaigns/${id}/sessions`}>
              Add to Lore
            </Link>
          </button>
        </div>
      </div>

      <form className="Story" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-7 border border-2 border-dark">
            <div>
              <h5 className="to-do">To Do List</h5>
              <div className="long-term">
                Long Term
                <input
                  type="textarea"
                  className="form-control"
                  placeholder="Answer"
                  onChange={(evt) => setTitle(evt.target.value)}
                  value={title}
                />
                <button>Add</button>
              </div>

              <div className="short-term">
                Short Term
                <input
                  type="textarea"
                  className="form-control"
                  placeholder="Answer"
                  onChange={(evt) => setTitle(evt.target.value)}
                  value={title}
                />
              </div>
            </div>
          </div>
          <div className="col-5 border border-2 border-dark">
            <h5 className="title">
              Title of Chapter
              <input
                type="text"
                className="form-control"
                placeholder="Answer"
                onChange={(evt) => setTitle(evt.target.value)}
                value={title}
              />
            </h5>
            <div>
              <h5>
                Date
                <input
                  type="text"
                  className="form-control"
                  placeholder="Date"
                  onChange={(evt) => setDate(evt.target.value)}
                  value={date}
                />
              </h5>
            </div>

            <div>
              <h5>Meet any interesting characters?</h5>
            </div>
            <button>Add Character!</button>
          </div>
        </div>

        <div className="row">
          <div className="col-8 border border-2 border-dark">
            <h5>Did your group gain any knowledge?</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Answer"
              onChange={(evt) => setKnowledge(evt.target.value)}
              value={knowledge}
            />
          </div>
          <div className="col-4 border border-2 border-dark">
            <h5>Memorable Moments?</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Answer"
              onChange={(evt) => setMoments(evt.target.value)}
              value={moments}
            />
          </div>
        </div>

        <div className="row">
          <h5>Storylines</h5>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Answer"
          onChange={(evt) => setStorylines(evt.target.value)}
          value={storylines}
        />
      </form>
    </div>
  );
}

export default CreateSession;
