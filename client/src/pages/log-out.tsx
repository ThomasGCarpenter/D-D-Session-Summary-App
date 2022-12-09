import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LogOut() {
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
    <button type="submit" className="btn btn-danger m-1" onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogOut;
