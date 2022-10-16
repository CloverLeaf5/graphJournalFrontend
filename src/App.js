import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import LoginErrorPage from './pages/LoginErrorPage';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route exact path="/login" element={ <LoginPage/> } />
        <Route path="/login/success" element={ <LoginSuccessPage/> } />
        <Route path="/login/error" element={ <LoginErrorPage/> } />
        <Route path="/dashboard" element={ <DashboardPage/> } />
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
