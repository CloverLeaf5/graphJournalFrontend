import React from 'react';
import { useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';

function DashboardPage() {

const user = useSelector((state) => state.auth.authUser);



  return (
    <BasicLayout>
      <h3>DASHBOARD FOR { user && user.fullName }</h3>
    </BasicLayout>
  );
}

export default DashboardPage;
