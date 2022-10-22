import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import LoginErrorPage from './pages/LoginErrorPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoutes from './utils/ProtectedRoutes';
import TagEntryPage from './pages/TagEntryPage';
import PersonEntryPage from './pages/PersonEntryPage';
import GroupEntryPage from './pages/GroupEntryPage';
import MainEntryPage from './pages/MainEntryPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/login/success" element={ <LoginSuccessPage/> } />
        <Route path="/login/error" element={ <LoginErrorPage/> } />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={ <DashboardPage/> } />
          <Route path="/tagEntry" element={ <TagEntryPage/> } />
          <Route path="/personEntry" element={ <PersonEntryPage/> } />
          <Route path="/groupEntry" element={ <GroupEntryPage/> } />
          <Route path="/mainEntry" element={ <MainEntryPage/> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
