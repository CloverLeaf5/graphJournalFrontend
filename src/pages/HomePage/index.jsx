import { Link } from 'react-router-dom';
import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';

function App() {
  return (
    <BasicLayout>
      <h3>HOMEPAGE</h3>
      <Link to="/login">Login</Link>
      </BasicLayout>
  );
}

export default App;
