import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Create () {

//  const [data, setData] = useState({
//     answer: ""
//   });

//   const handleChange = (e: any) => {
//     const value = e.target.value;
//     setData({
//       ...data,
//       [e.target.name]: value
//     });
//   };


       const handleFormSubmit = async (evt: any) => {
        evt.preventDefault()
        console.log(evt)
        
     const userData = {
        answer: evt.target.value
     }
        try {
            await axios
                .post("http://localhost:9444/addstory", userData)
                       .then((res) => {
                          let data = res.data;
                            console.log(data);
                       })
                    
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
                            // onChange={handleChange}
                            // value={answer}
                       />
            
            
        </div>
         <button type="submit" className="btn btn-success m-3">Next</button>
    </form>
    )
}


export default Create;