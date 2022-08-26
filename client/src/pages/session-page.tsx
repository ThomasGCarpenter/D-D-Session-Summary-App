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
        <div className='session'>
           
                {displaySession.map((session) => {
                    return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'>
                            {session.title}
                        </div>
                        <div className='col-sm'>{session.date}</div>
                        <div className='col-sm'>{session.characters}</div>

                    </div>
                    
                    {/* <div>{session.date}</div> */}
                    <div>{session.knowledge}</div>
                    <div>{session.moments}</div>
                </div>
                
                       )
                    })  
                   }  
            
     
        </div>
)}
export default SessionPage