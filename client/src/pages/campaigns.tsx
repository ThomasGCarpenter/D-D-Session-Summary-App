import React from 'react';
import './campaigns.css';
import { Link } from "react-router-dom";

function Campaigns() {
    return(
        
        <div className="campaigns">
            <div className="container">
               <div className="campaign_module">
                <h5>
                    <Link className="nav-link" to="/stories">Evil Campaign</Link>
                </h5>
                    <p>DM: Tom</p>
                <h3>Players:</h3>
                    <p>Miles, Derek, Mike</p>
                <h3>Start Date:</h3>
                    <p>July 28, 2022</p>
                <h6>Number of Chapters:</h6>
                    
               </div>
            </div>
        </div>
      
    )
}

export default Campaigns; 