import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './pages/welcome'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header'

function App() {
  return (
    <div className="App">
      <Header/>
      <Welcome />
    </div>
  );
}

export default App;
