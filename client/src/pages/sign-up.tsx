import React, { useState } from 'react';
import './signup.css';

function SignUp () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log(username)
    return (
        <div className='SignUp'>
            <div className="container">
                <form className = 'card p-3'>
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
                    
                    <button type="submit" className="btn btn-success m-1">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;