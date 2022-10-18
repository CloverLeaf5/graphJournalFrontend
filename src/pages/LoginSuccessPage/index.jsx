import React, { useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout';

function LoginSuccessPage() {
  
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1200);
  }, []);
  
  return (
    <BasicLayout>
      <h3>LOGIN SUCCESS</h3>
    </BasicLayout>
  );
}

export default LoginSuccessPage;