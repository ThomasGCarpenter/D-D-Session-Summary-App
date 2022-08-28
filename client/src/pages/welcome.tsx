import React from 'react';
import './welcome.css';
import { Link } from "react-router-dom";


function Welcome() {
    return(
        
        <div className="welcome">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="welcome__module1">
                            <div className="text">
                                <h3>Hello and Welcome to the Dungeons and Dragons Session Summary Saver! </h3>
                                <p>For fans of meticulous record keeping</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="welcome__module2">
                            <div className="signIn">
                                <Link className="signIn_link" to="/login">Log In!</Link>
                            </div>
                            <div className="signUn">
                                <Link className="signUp_link" to="/signup">Sign Up!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    )
}

export default Welcome; 