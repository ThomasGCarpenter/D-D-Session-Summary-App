import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import MyVerticallyCenteredModalCampaigns from "./campaigns-tasks-modal";
import "./campaigns-id-viewSessions.css";

function Session(this: any) {
  const { id } = useParams();
  const [sessionInfo, setSessionData] = useState<any[]>([]);
  const [campaignData, setCampaignData] = useState<File>();

  const [file, setFile] = useState<any[]>([]);
  const [modalShow, setModalShow] = React.useState(false);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    getViewSessions();
    getCampaignData();
  }, []);

  const getViewSessions = () =>
    axios
      .get(`http://localhost:9444/campaigns/${id}/sessions`)

      .then((response) => {
        console.log(id);
        console.log(response);
        // console.log(response.data.sessionData)
        setSessionData(response.data.sessionData);
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });

  const getCampaignData = () =>
    axios
      .get("http://localhost:9444/campaigns/create")
      .then((response) => {
        // console.log(response.data);
        setCampaignData(response.data.campaignData);
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });

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

  return (
    <div className="container">
      <div className="headers">
        <div className="row border-bottom border-primary border-2 my-4 pb-3">
          <div className="col-4">
            <button type="submit" className="button-lore">
              <Link className="nav-link" to={`/campaigns/${id}/addsession`}>
                Add Session
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          Tasks
          <div>Long Term:</div>
          <div>Short Term:</div>
        </div>
      </div>
      <div>
        <div className="row-above-table">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Campaign Task
          </Button>

          <MyVerticallyCenteredModalCampaigns
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <input type="file" name="file" onChange={handleChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <table className="table w-auto table-sm table-hover ">
          <thead className="thead ">
            <tr>
              <th className="primary" scope="col">
                Edit
              </th>
              <th className="primary" scope="col">
                Title
              </th>
              <th className="primary" scope="col">
                Date
              </th>
              <th className="primary" scope="col">
                View Session
              </th>
            </tr>
          </thead>
          <tbody>
            {sessionInfo.map((session) => {
              return (
                <tr className="row-info">
                  <td>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <Link
                          className="nav-link"
                          to={`/campaigns/${session.session_id}/edit/${session._id}`}
                        >
                          Edit Session
                        </Link>
                      </button>
                    </div>
                  </td>
                  <td>{session.title}</td>
                  <td>{session.date}</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <Link
                          className="nav-link"
                          to={`/campaigns/${session.session_id}/session/${session._id}`}
                        >
                          View Session
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Session;
