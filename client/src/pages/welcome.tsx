import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "../images/epic.jpg";
import "./welcome.css";

function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();

    navigate("/campaigns/create");

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
