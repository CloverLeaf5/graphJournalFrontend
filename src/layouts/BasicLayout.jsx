import React from 'react';
import styled from 'styled-components';

const TopLevelLayout = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 16px;
`;


function BasicLayout ({ children }) {
    return (
        <TopLevelLayout>
            {children}
        </TopLevelLayout>
    );
  }
  
  export default BasicLayout;