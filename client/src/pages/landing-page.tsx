import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./landing-page.css";

function LandingPage() {
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
    navigate("/logout");
    console.log(localStorage);
  };

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post("http://localhost:9444/login", userData);

      setUser(result.data);
      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(result.data));

      navigate("/campaigns");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container1">
      <div className="row justify-content-center">
        <div className="col-6">
          <p className="logIn">Log In!</p>
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="logInForm">
              <div className="module">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(evt) => setUsername(evt.target.value)}
                  value={username}
                />
              </div>
            </div>
            <div className="passwordForm">
              <div className="module">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(evt) => setPassword(evt.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="logInButton">
              <button type="submit" className="btn btn-success m-1">
                Log In
              </button>
              <div className="bottom">
                <div className="signUp">
                  <button className="btn btn-primary m-1">
                    <Link className="nav-link" to={"/signup"}>
                      Sign Up Here!
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
