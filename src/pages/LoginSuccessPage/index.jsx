import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';

function LoginSuccessPage() {
  
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);
  
  return (
    <BasicLayout>
      <h3>LOGIN SUCCESS</h3>
    </BasicLayout>
  );
}

export default LoginSuccessPage;