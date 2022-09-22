import { Link, useLocation } from "react-router-dom";
import "./header.css";
import React, { useState } from "react";

function Header() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  return (
    <nav className="navbar navbar-expand-lg  d-flex">
      <div className="icon"></div>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h3>The Lore of Yore</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="navbar-text"></li>
            <li className="nav-item">
              <Link className="nav-link" to="/campaigns">
                <h4>Campaigns</h4>
              </Link>
            </li>
            <li className="nav-item">
              <h4>
                {currentUser ? (
                  <div>
                    {currentUser.username}
                    <div>
                      <Link className="nav-link" to="/login">
                        Logout!
                      </Link>
                    </div>
                  </div>
                ) : null}
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
