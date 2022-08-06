import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Stories () {

  const [title, setTitle] = useState('')


  async function populate() {
    try {
      const response = await axios.get("http://localhost:9444/addstory");
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }





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
      <tr>
        <th scope="row">1</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>

   <button className="btn btn-success m-1">
    <Link className="nav-link" to="/add-story">Add Story!</Link>
   </button>
    
  </table>
  //  <Link className="nav-link" to="/stories">Stories</Link>
)}

export default Stories;