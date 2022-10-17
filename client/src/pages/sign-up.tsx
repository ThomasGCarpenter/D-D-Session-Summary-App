import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./signup.css";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post("http://localhost:9444/signup", userData);
      const data = result.data;

      // Go to Login In Page
      navigate('/login')

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
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
