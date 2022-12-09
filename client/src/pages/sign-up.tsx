import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any | null>(null);

  const navigate = useNavigate();
  //Check if a user has previously logged in
  let userObj = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log(userObj);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post("http://localhost:9444/signup", userData);
      console.log("result", result);
      console.log("result.data", result.data);
      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      console.log("local storage", localStorage);
      console.log("result.data", result.data);
      navigate("/welcome");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUp">
      <div className="container">
        <form className="card p-3" onSubmit={handleFormSubmit}>
          <div className="module">
            <h3>Sign Up!</h3>
          </div>
          <div className="module">
            <label></label>
            <input
              type="text"
              className="form-control"
              placeholder="Username must be unique"
              onChange={(evt) => setUsername(evt.target.value)}
              value={username}
            />
            {/* <small id="emailHelp" className="form-text text-muted">Username must be unique</small> */}
          </div>
          <div className="module">
            <label></label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(evt) => setPassword(evt.target.value)}
              value={password}
            />
          </div>

          <button type="submit" className="btn btn-success m-1">
            <button className="nav-link">Sign Up!</button>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
