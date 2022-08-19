import React from 'react';
import './App.css';
import Welcome from './pages/welcome'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'
import { Routes, Route } from "react-router-dom" 
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import AddSession from './pages/add-session'
import Campaigns from './pages/campaigns'
import NewCampaign from './pages/campaigns-create'
import ViewSession from './pages/campaigns-id-viewSessions'
import EditSession from './pages/campaigns-id-editSessions'


function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/addsession" element={<AddSession />} /> 
          <Route path="campaigns/create" element={<NewCampaign />} /> 
          <Route path="campaigns/viewSessions/id" element={<ViewSession />} /> 
          <Route path="campaigns/${campaignId}/editSessions" element={<EditSession />} /> 
          
        </Routes>
      </div>
  );
}

export default App;
