import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { stringify } from 'querystring';

function Create () {

    const [answer, setAnswer] = useState('')
  
    const handleFormSubmit = async (evt: any) => {
      evt.preventDefault()
  
  
      const userData = {
        answer 
      }
  
      try {
        const result = await axios.post("http://localhost:9444/addstory", userData)
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
          onChange={(evt) => setAnswer(evt.target.value)}
          value={answer}
         />
        </div>
       <button type="submit" className="btn btn-success m-3">
       <Link className="nav-link" to="/stories">Add to Lore</Link>
       </button>
      </form>
    )
  }
  
  
  export default Create
