import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Session () {
  
  const [sessionData, setSessionData] = useState<any[]>([])
  const [campaignData, setCampaignData] = useState<any[]>([])

  useEffect(() => {
    getFeedback();
    getCampaignData();
  }, []);

  const getFeedback = () =>
    axios
      .get("http://localhost:9444/campaigns/addsession")
      .then((response) => {
        // console.log(response.data);
        setSessionData(response.data.sessionData)
      })
        .catch((error) => {
          console.log(`We have a server error`, error);
        });

    const getCampaignData = () =>
        axios
          .get("http://localhost:9444/campaigns/create")
          .then((response) => {
            console.log(response.data);
            setCampaignData(response.data.result)
          })
            .catch((error) => {
              console.log(`We have a server error`, error);
            });   

    

  return (
    <div>
        {campaignData.map((title) => {
            return(
        <div className="position-relative">
            <h3>
                {title.description}
            </h3>
        </div>
            )
        })  
      }  
        <button className="btn btn-success m-1">
            <Link className="nav-link" to="/campaigns/addsession">Add A Session to "Put Campaign Title Here"!</Link>
        </button>
    
    <table className="table">
            <thead>
                <tr>
                    <th scope="col">Chapter</th>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Author(s)</th>
                </tr>
            </thead>
        <tbody>
        {sessionData.map((title) => {
            return (
                <tr>
                    <th scope="row">1</th>
                    <td>{title.title}</td>
                    <td>{title.date}</td>
                    <td></td>
                </tr>
            )
         })  
        }    
        </tbody>        
    </table>
  </div>
)}

export default Session;