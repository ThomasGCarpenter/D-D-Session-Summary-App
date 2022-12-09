import { Link, useLocation, useParams } from "react-router-dom";
import "./header.css";
import React, { useState } from "react";

function Header() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  let userObj = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userObj._id);
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === `/campaigns/${id}/sessions`)
      return <h3>The Lore of Yore - Lore</h3>;
    else if (location.pathname === "/campaigns/:id/addsession")
      return <h3>The Lore of Yore - Add to Your Lore</h3>;
    else if (location.pathname === "/campaigns")
      return <h3>The Lore of Yore - Campaigns</h3>;
    else return <h3>The Lore of Yore</h3>;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {renderHeader()}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <span className="justify-content-center">
          {location.pathname === "/campaigns" ? (
            <button className="button-create mx-auto">
              <Link className="nav-link" to="/campaigns/create">
                Add Campaign!
              </Link>
            </button>
          ) : null}
        </span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav justify-content-end">
            <span className="nav-item">
              {currentUser === currentUser.username ? (
                <div className="justify-content-space-between">
                  {`${currentUser.username} `}
                  <Link className="nav-link" to="/campaigns">
                    Campaigns
                  </Link>
                </div>
              ) : null}
            </span>
            <Link className="nav-link" to="/logout">
              Logout!
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
