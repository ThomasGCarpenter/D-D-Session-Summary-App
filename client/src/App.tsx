import React from 'react';
import './App.css';
import Welcome from './pages/welcome'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'
import { Routes, Route } from "react-router-dom" 
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </div>
  );
}

export default App;
