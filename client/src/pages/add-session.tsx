import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomTag from "./custom-npm-test";

import MyVerticallyCenteredModalCharacter from "./Modals/addSession-knowledgeModal";
import "./add-session.css";
import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";

function CreateSession() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [characters, setCharacters] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [moments, setMoments] = useState("");
  const [storyArcs, setStoryArcs] = useState("");
  const [shortTermTask, setShortTermTask] = useState("");
  const [items, setItems] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const [file, setFile] = useState<any[]>([]);
  const [modalShow, setModalShow] = React.useState(false);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("file", file as unknown as Blob);

    console.log(
      "LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL",
      formData
    );

    axios
      .post("http://localhost:9444/campaigns/upload", formData, {})
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const sessionData = {
      session_id: "string",
      title,
      date,
      characters,
      knowledge,
      moments,
      storyArcs,
      items,
      extraInfo,
      shortTermTask,
    };

    try {
      const funk = (moments: string) => {
        const root = ReactDOMClient.createRoot(
          document.getElementById("root")!
        );
        const element = <CustomTag textToUrl={moments} />;
        root.render(element);
      };
      funk(sessionData.moments);
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
      <table className="table w-auto table-sm table-bordered">
        <thead className="thead ">
          <tr>
            <th className="primary" scope="col">
              <button
                type="submit"
                onClick={(evt) => handleFormSubmit(evt)}
                className="button-add"
              >
                <Link className="nav-link" to={`/campaigns/${id}/sessions`}>
                  Add to Lore
                </Link>
              </button>
            </th>
            <th className="primary" scope="col">
              Title
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setTitle(evt.target.value)}
                value={title}
              />
            </th>
            <th className="primary" scope="col">
              Date
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setDate(evt.target.value)}
                value={date}
              />
            </th>
            <th className="primary" scope="col">
              <form
                onSubmit={handleSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <input type="file" name="file" onChange={handleChange} />
                <button type="submit">Upload</button>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="session-info">
            <td className="characters">
              Meet any interesting characters?
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setCharacters(evt.target.value)}
                value={characters}
              />
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => setModalShow(true)}
              >
                Add Character to Log.
              </Button>
              <MyVerticallyCenteredModalCharacter
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </td>
            <td className="characters">
              Did You Or The Group Gain New Knowledge?
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setKnowledge(evt.target.value)}
                value={knowledge}
              />
            </td>
            <td className="characters">
              Any Memorable Moments?
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setMoments(evt.target.value)}
                value={moments}
              />
            </td>
          </tr>
          <tr>
            <td className="characters">
              New Short Term Tasks?
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setShortTermTask(evt.target.value)}
                value={shortTermTask}
              />
            </td>
            <td className="characters">
              Were New Items Obtained?
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setItems(evt.target.value)}
                value={items}
              />
            </td>
            <td className="characters">
              Describe Story Arc
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setStoryArcs(evt.target.value)}
                value={storyArcs}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="characters">
              Extra Information
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setExtraInfo(evt.target.value)}
                value={extraInfo}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CreateSession;

// D&D App
// const sessionMoments = "we were attacked by a <ddb> lich </ddb>";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const element = <CustomTag textToUrl={sessionMoments} />;
// root.render(element)
