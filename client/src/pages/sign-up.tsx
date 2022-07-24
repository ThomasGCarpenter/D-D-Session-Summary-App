import React, { useState } from 'react';


function SignUp () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log(username)
    return (
        <div className='SignUp'>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="Username"
                            onChange={(evt) => setUsername(evt.target.value)}    
                            value={username}
                        />
                        <small id="emailHelp" className="form-text text-muted">Username must be unique</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(evt) => setPassword(evt.target.value)}    
                            value={password}
                       />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;