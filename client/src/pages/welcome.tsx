import React from 'react';
import './welcome.css';

function Welcome() {
    return(
        
        <div className="welcome">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="welcome__module">
                            Welcome Message
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="welcome__module">
                            <button className="btn btn-primary">
                                Sign In
                            </button>
                            <button className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    )
}

export default Welcome; 