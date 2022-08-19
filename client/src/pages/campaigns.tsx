import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './campaigns.css'


function Campaigns () {
  
  const [results, setResults] = useState<any[]>([])
  const id = useParams()
  

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () =>
    axios
      .get("http://localhost:9444/campaigns/create")
      .then((response) => {
        // console.log(response.data);
        setResults(response.data.result)
      })
        .catch((error) => {
          console.log(`We have a server error`, error);
        });

    // const getUrl = async () => {
        
    //     await axios
    //             .get(`http://localhost:9444/campaigns/viewSessions/${id}`)
    //             .then((response) => {
    //                 // console.log(response.data);
    //                 console.log(response.data.id)
    //             })
    //                 .catch((error) => {
    //                 console.log(`We have a server error`, error);
    //                 });
    // }

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
                {results.map((title) => {
                    return (
                    <tr>
                        <td>
                            <div>
                                <button type="button" className="btn btn-outline-secondary btn-sm">Edit</button>
                            </div>
                        </td>
                        <td>{title.title}</td>
                        <td>{title.players}</td>
                        <td>{title.startDate}</td>
                        <td>
                            <div>
                                {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => getUrl()}   >View Sessions!                           
                                </button> */}
                                 <button type="button" className="btn btn-outline-primary btn-sm">
                                    <Link className="nav-link" to="/campaigns/viewSessions/id">View Sessions</Link>
                                </button>
                                <button type="button" className="btn btn-outline-danger btn-sm">
                                    <Link className="nav-link" to="/campaigns/addsession">Add Session</Link>
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