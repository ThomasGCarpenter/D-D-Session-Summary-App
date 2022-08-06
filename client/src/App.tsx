import React from 'react';
import './App.css';
import Welcome from './pages/welcome'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'
import { Routes, Route } from "react-router-dom" 
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import Stories from './pages/stories'
import Create from './pages/add-story'
import Campaigns from './pages/campaigns'

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="stories" element={<Stories />} /> 
          <Route path="add-story" element={<Create />} /> 
        </Routes>
      </div>
  );
}

export default App;
