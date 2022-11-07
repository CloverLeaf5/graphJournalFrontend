import React from 'react'
import styled from 'styled-components';

const CardDiv = styled.div`
width: 100%;
height: auto;
justify-content: center;
align-items: center;
font-size: 14px;
font-weight: bold;
border-style: solid;
border-radius: 16px;
margin: 4px 0;
cursor: pointer;
`;

const TagPersonCard = (props) => {

    const title = props.title;
    
    return (
        <CardDiv className="tag-person-card" onClick={props.handleClick}>
            <p>{title}</p>
        </CardDiv>
    )
}

export default TagPersonCard
