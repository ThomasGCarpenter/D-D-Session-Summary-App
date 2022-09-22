import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any | null>(null);

  const navigate = useNavigate();
  //Check if a user has previously logged in
  let userObj = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userObj);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    window.localStorage.clear();
    navigate("/");
    console.log(localStorage);
  };

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    navigate("/campaigns");

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post("http://localhost:9444/login", userData);
      console.log("TTTTTTTTTTTTTTt", result);
      console.log("HHHHHHHHHHHHHH", result.data);
      setUser(result.data);
      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(result.data));
      console.log("hhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiii", localStorage);
      console.log("diiiiiiiiieeeeeeeeeeeeeeeeeeeeeeee", result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="SignUp">
      <div className="container">
        <form className="card p-3" onSubmit={handleFormSubmit}>
          <div className="module">
            <h3>Log In!</h3>
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
          <button type="submit" className="btn btn-danger m-1">
            Log In!
          </button>

          <button
            type="submit"
            className="btn btn-danger m-1"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
