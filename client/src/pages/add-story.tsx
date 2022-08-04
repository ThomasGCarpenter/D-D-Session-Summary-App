import React, { useState } from 'react';
import axios from 'axios';

function Create () {
  const [answer, setAnswer] = useState('')

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault()

    // evt.target.value is relevant to the form control where the event originated.
    // In the case of the 'submit' event, the answer value is not on evt.target.value.
    // Use the answer filled out by the form, that is stored in React State
    const userData = {
      answer
    }

    try {
      const result = await axios .post("http://localhost:9444/addstory", userData)
      const data = result.data
      console.log('RESULT OF ADD STORY', data);
    } catch (err) {
      console.log(err)
    }
  }
   
  return (
    <form className="Story" onSubmit={handleFormSubmit}>
      <div className="container">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Answer" 
        onChange={(evt) => setAnswer(evt.target.value)}
        value={answer}
       />
      </div>
     <button type="submit" className="btn btn-success m-3">Next</button>
    </form>
  )
}


export default Create;
