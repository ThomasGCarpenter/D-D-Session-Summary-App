import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function Session (this: any) {
  const { id }  = useParams();
  const [sessionInfo, setSessionData] = useState<any[]>([])
  const [campaignData, setCampaignData] = useState<any[]>([])

  // const [file, setFile] = useState<any[]>([])

  // function handleChange(event: any) {
  //   setFile(event.target.files[0])
  // }

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



      // const handleFormSubmit = async (evt: any) => {
      //         evt.preventDefault()
                 
      //         // const formData = new FormData();
      //         // formData.append('file', file);
              

      //         console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL", formData)
      //          axios
      //             .post("http://localhost:9444/campaigns/upload", formData, {
      //               headers: { "Content-Type": "multipart/form-data" }
      //             })
      //                       .then((res: any) => {
      //                         console.log(res);
      //                       })
      //                       .catch((err: any) => {
      //                         console.log(err);
      //                       });
                      
      //                 }
            
  return (
    <div>
  
        <button className="btn btn-success m-1">
            <Link className="nav-link" to={`/campaigns/${id}/addsession`}>Add A Session to "Put Campaign Title Here"!</Link>
        </button>

        {/* <form action="/campaigns/upload" method="post" encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleChange}/>
           <button type="submit">Submit</button>
        </form> */}
    
    <table className="table">
            <thead>
                <tr>
                    <th scope="col">Edit</th>
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
                <td></td>
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