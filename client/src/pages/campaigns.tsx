import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './campaigns.css'
import { getPreEmitDiagnostics } from 'typescript';


function Campaigns () {
  
  const [results, setResults] = useState<any[]>([])
  const { title } = useParams()
  

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () =>
    axios
      .get("http://localhost:9444/campaigns/create")
      .then((response) => {
        console.log(response.data);
        setResults(response.data.campaignData)
        console.log()
      })
        .catch((error) => {
          console.log(`We have a server error`, error);
        });


  return (
    <div className="position-relative"style = {{height:"100vh"}}>
        <header className="header-row">
           <div>
                <button className="btn btn-success position-absolute top-0 start-90">
                    <Link className="nav-link" to="/campaigns/create">Create Campaign!</Link>
                </button>
            </div>
        </header>
        
        <table className="table border-dark table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Edit Campaign</th>
                    <th scope="col">Campaign Title</th>
                    <th scope="col">Players</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">View/Add Session</th>
                </tr>
            </thead>
            <tbody>
                {results.map((campaign, index) => {
                    return (
                    <tr>
                        <td>
                            <div>
                              <button type="button" className="btn btn-outline-primary btn-sm">
                                <Link className="nav-link" to= {`/campaigns/${campaign._id}/edit`}>Edit Campaign</Link>
                              </button>
                            </div>
                        </td>
                        <td>{campaign.title}</td>
                        <td>{campaign.players}</td>
                        <td>{campaign.startDate}</td>
                        
                        <td>
                            <div>
                               
                                 <button type="button" className="btn btn-outline-primary btn-sm">
                                    <Link className="nav-link" to= {`/campaigns/${campaign._id}/sessions`}>View Sessions</Link>
                                </button>
                                <button type="button" className="btn btn-outline-danger btn-sm">
                                    <Link className="nav-link" to= {`/campaigns/${campaign._id}/addsession`}>Add Session</Link>
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

export default Campaigns; 




