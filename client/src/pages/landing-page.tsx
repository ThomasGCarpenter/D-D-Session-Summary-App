import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "./landing-page.css";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    navigate("/home");

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post("http://localhost:9444/signup", userData);
      const data = result.data;
      console.log("RESULT OF ADD STORY", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="module">
          <h3 className="sign-up">Sign Up!</h3>
        </div>
        <div className="module">
          <input
            type="text"
            className="form-control"
            placeholder="Username must be unique"
            onChange={(evt) => setUsername(evt.target.value)}
            value={username}
          />
        </div>
        <div className="module">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-success m-1">
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
