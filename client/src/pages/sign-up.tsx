import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './signup.css';
import axios from 'axios';

function SignUp () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (evt: any) => {
        evt.preventDefault()
    
    
        const userData = {
            username,
            password
        }
    
        try {
          const result = await axios.post('http://localhost:9444/signup', userData)
          const data = result.data
          console.log('RESULT OF ADD STORY', data);
        } catch (err) {
          console.log(err)
        }
      }
    return (
        <div className='SignUp'>
            <div className="container">
                <form className = 'card p-3' onSubmit={handleFormSubmit}>
                    <div className="module">
                        <h3>Sign Up!</h3>
                    </div>
                    <div className="module">
                        <label></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="Username must be unique"
                            onChange={(evt) => setUsername(evt.target.value)}    
                            value={username}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Username must be unique</small> */}
                    </div>
                    <div className="module">
                        <label></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(evt) => setPassword(evt.target.value)}    
                            value={password}
                       />
                    </div>
                    
                    <button type="submit" className="btn btn-success m-1">
                    <Link className="nav-link" to={`/`}>Sign Up!</Link>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;