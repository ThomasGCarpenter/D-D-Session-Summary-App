import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './campaigns-id-viewSessions.css'

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
    <div className='container '>
  
      <div className='headers'>
        <div className='row border-bottom border-primary border-2 my-4 pb-3'>
          <div className='col-4'>
              <h5 className='to-do'>
                  To Dos
                  <div><Link to={'/'}>Long Term</Link> | <Link to={'home'}>Short Term</Link></div>
              </h5>
          </div>
          <div className='col-4'>
              <button type="submit" className="button-private">
                  <Link className="nav-link" to={`/campaigns/${id}/sessions`}>Private Notes</Link>
              </button>
          </div>
          <div className='col-4'>
              <button type="submit" className="button-lore">
                  <Link className="nav-link" to={`/campaigns/${id}/sessions`}>Add to Lore</Link>
              </button>
          </div>
        </div>
      </div>
   
      
      <div className='row-sessions'>
      <div className="col-12">
        <h3 className='your-sessions'>
            Sessions
        </h3>
      </div>
    </div>  
    <table className="table w-auto table-sm table-hover ">
            <thead className='thead '>
                <tr>
                    <th className="primary" scope="col">Edit</th>
                    <th className="primary" scope="col">Title</th>
                    <th className="primary" scope="col">Date</th>
                    <th className="primary" scope="col">View Session</th>
        
                </tr>
            </thead>
        <tbody>
        {sessionInfo.map((session) => {
            return (
              <tr className='row-info'>
               <td>
                  <div>
                    <button type="button" className="btn btn-outline-primary btn-sm">
                      <Link className="nav-link" to= {`/campaigns/${session.session_id}/edit/${session._id}`}>Edit Session</Link>
                    </button>
                  </div>
                </td>
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