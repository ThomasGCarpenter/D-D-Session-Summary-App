import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './signin.css';

function SignIn () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
// useEffect(() => {
//     axios.post('http://localhost:3000/', {})
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// })


     const handleFormSubmit = async (evt: any) => {
        evt.preventDefault()
        console.log(evt)
        const userData = {
            username: username,
            password: password
        };
        try {
            await axios
                .post("http://localhost:3000/signin", userData)
                  .then((res) => {
                        console.log(res.data);
                        setUsername(username);
                        setPassword(password);
                    })
        } catch (err) {
            console.log(err)
        }
 }
    
    
    


    return (
        <div className='SignIn' onSubmit={handleFormSubmit}>
            <div className="container">
                <form className = 'card p-3'>
                    <div className="module">
                        <h3>Sign In!</h3>
                    </div>
                    <div className="module">
                        <label></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="Username"
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
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" checked />
                                <label className="form-check-label"> Remember me </label>
                            </div>
                        </div>    
                    </div>
                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                
                    
                    <button type="submit" className="btn btn-success m-1">Log In</button>
                </form>
            </div>
        </div>
    )
    
}

export default SignIn;



