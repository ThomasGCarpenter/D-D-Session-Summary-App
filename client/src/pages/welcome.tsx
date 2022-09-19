import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Image from "../images/epic.jpg";
import "./welcome.css";

function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

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
    <div className="welcome">
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md">
              <div className="goober">
                <img src={Image} className="magic" />
              </div>
            </div>

            <form className="col-md">
              <div className="module">
                <h3 className="sign-up">Sign Up!</h3>
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
                <Link className="nav-link" to={`/`}>
                  Sign Up!
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    //     <div className="welcome">
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-sm-6">
    //                 <div className="welcome__module1">
    //                     <div className="text">
    //                         <h3>Hello and Welcome to the Dungeons and Dragons Session Summary Saver! </h3>
    //                         <p>For fans of meticulous record keeping</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="col-sm-6">
    //                 <div className="welcome__module2">
    //                     <div className="signIn">
    //                         <Link className="signIn_link" to="/login">Log In/Log out!</Link>
    //                     </div>
    //                     <div className="signUn">
    //                         <Link className="signUp_link" to="/signup">Sign Up!</Link>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}

export default Welcome;
