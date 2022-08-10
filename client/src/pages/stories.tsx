import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Stories () {

  const [answers, setAnswers] = useState<any[]>([])
  // const answers = [{ answer: 'Tom Rocks'}]
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () =>
    axios
      .get("http://localhost:9444/addstory")
      .then((response) => {
        // console.log(response.data);
        setAnswers(response.data.answers)
      })
        .catch((error) => {
          console.log(`We have a server error`, error);
        });

  return (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Chapter</th>
        <th scope="col">Title</th>
        <th scope="col">Date</th>
        <th scope="col">Author(s)</th>
      </tr>
    </thead>
    <tbody>
      {answers.map((answer) => {
        return (
          <tr>
            <th scope="row">1</th>
            <td>{answer.answer}</td>
            <td></td>
            <td></td>
          </tr>
        )
      })
    }    </tbody>

   <button className="btn btn-success m-1">
    <Link className="nav-link" to="/add-story">Add Story!</Link>
   </button>
    
  </table>
  //  <Link className="nav-link" to="/stories">Stories</Link>
)}

export default Stories;