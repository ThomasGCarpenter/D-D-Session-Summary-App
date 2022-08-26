import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { stringify } from 'querystring';

function CreateSession () {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [characters, setCharacters] = useState('')
    const [knowledge, setKnowledge] = useState('')
    const [moments, setMoments] = useState('')

    const handleFormSubmit = async (evt: any) => {
      evt.preventDefault()
  
  
      const sessionData = {
        session_id: "string",
        title,
        date,
        characters,
        knowledge,
        moments
      }
  
      try {
        const result = await axios.post(`http://localhost:9444/campaigns/${id}/addsession`, sessionData)
        const data = result.data
        console.log('RESULT OF ADD STORY', data);
      } catch (err) {
        console.log(err)
      }
    }
     
    return (
      <form className="Story" onSubmit={handleFormSubmit}>
        <div className="container">
              <div>
                <h5>Title of Chapter</h5>
              </div>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Answer" 
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />

            <div>
              <h5>Date</h5>
            </div>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Date" 
              onChange={(evt) => setDate(evt.target.value)}
              value={date}
            />

          <div>
            <h5>Meet any interesting characters?</h5>
          </div>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Answer" 
          onChange={(evt) => setCharacters(evt.target.value)}
          value={characters}
         />

          <div>
            <h5>Did your group gain any knowledge?</h5>
          </div>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Answer" 
          onChange={(evt) => setKnowledge(evt.target.value)}
          value={knowledge}
         />

          <div>
            <h5>Memorable Moments?</h5>
          </div>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Answer" 
          onChange={(evt) => setMoments(evt.target.value)}
          value={moments}
         />

        </div>
       <button type="submit" className="btn btn-success m-3">
       <Link className="nav-link" to={`/campaigns/${id}/sessions`}>Add to Lore</Link>
       </button>
      </form>
    )
  }
  
  
  export default CreateSession
