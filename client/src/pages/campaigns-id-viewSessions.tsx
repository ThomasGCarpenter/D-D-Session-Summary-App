import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function Session () {
  const { id }  = useParams();
  const [sessionInfo, setSessionData] = useState<any[]>([])
  const [campaignData, setCampaignData] = useState<any[]>([])

  useEffect(() => {
    getViewSessions();
    getCampaignData();
  
  }, []);

 
  const getViewSessions =  () =>
    axios
    .get(`http://localhost:9444/campaigns/${id}/sessions`)
    
    .then((response) => {
      console.log(id)
      console.log(response);
      // console.log(response.data.sessionData)
      setSessionData(response.data.sessionData)
      

  })
        .catch((error) => {
          console.log(`We have a server error`, error);
        });

  const getCampaignData = () =>
    axios
          .get("http://localhost:9444/campaigns/create")
          .then((response) => {
            // console.log(response.data);
            setCampaignData(response.data.campaignData)
          })
            .catch((error) => {
              console.log(`We have a server error`, error);
            });   

  let rowCounter = 1;
 
  return (
    <div>
        {/* {campaignData.map((campaign) => {
            return(
        <div className="position-relative">
            <h3>
                {campaign.description}
            </h3>
        </div>
            )
        })  
      }   */}
        <button className="btn btn-success m-1">
            <Link className="nav-link" to={`/campaigns/${id}/addsession`}>Add A Session to "Put Campaign Title Here"!</Link>
        </button>
    
    <table className="table">
            <thead>
                <tr>
                    <th scope="col">Edit</th>
                    <th scope="col">Chapter</th>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">View Session</th>
                </tr>
            </thead>
        <tbody>
        {sessionInfo.map((session) => {
            return (
              <tr>
              
               <td>
                  <div>
                    <button type="button" className="btn btn-outline-primary btn-sm">
                      <Link className="nav-link" to= {`/campaigns/${session.session_id}/edit/${session._id}`}>Edit Session</Link>
                    </button>
                  </div>
                </td>
                <td>{rowCounter++}</td>
                    <td>{session.title}</td>
                    <td>{session.date}</td>
                    <td>
                    <div>
                    <button type="button" className="btn btn-outline-primary btn-sm">
                      <Link className="nav-link" to= {`/campaigns/${session.session_id}/session/${session._id}`}>View Session</Link>
                    </button>
                  </div>
                    </td>
              </tr>
            )
         })  
        }    
        </tbody>        
    </table>
  </div>
)}

export default Session;