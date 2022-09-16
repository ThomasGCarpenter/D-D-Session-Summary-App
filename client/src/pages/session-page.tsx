import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './session-page.css'

function SessionPage () {
    const { id, session_id } = useParams();

    const [displaySession, setDisplaySession] = useState<any[]>([])


    useEffect(() => {
        getDisplaySession();
    
      }, []);

    const getDisplaySession =  () =>
    axios
    .get(`http://localhost:9444/campaigns/${session_id}/session/${id}`)
    .then((response) => {
      console.log(id)
      console.log(response);
      // console.log(response.data.sessionData)
      setDisplaySession(response.data.sessionData)
    })
    .catch((error) => {
          console.log(`We have a server error`, error);
        });


    return(
        <div className='container'>
                {displaySession.map((session) => {
                    return (
                        <div className='row'>
                            <div className='col-4'>
                                <div>
                                    <h3>To Do List</h3>
                                        <table>
                                            <tr>
                                                Long Term
                                            </tr>
                                        </table>
                                </div>
                            </div>
                                    <div className='col-8'>
                                        <h1>{session.title}</h1>
                                    </div>

                                    
                                <div className='col-sm'>{session.date}</div>
                                <div className='col-sm'>{session.characters}</div>

                               
                            <div>{session.moments}</div>
                            <div className='row'>
                                <div className='col-7'>
                                    {session.knowledge}
                                </div>
                                <div className='col-5'>
                                    {session.moments}
                                </div>

                            </div>
                            <div className='row'>
                                {session.storylines}
                            </div>
                        </div>
                             
                          
                            )
                            })  
                        }  
            
     
        </div>
)}
export default SessionPage