import React from 'react'


const TagPersonCard = (props) => {

    const title = props.title;
    
    return (
        <div className="tag-person-card" onClick={props.handleClick}>
            <h6>{title}</h6>
        </div>
    )
}

export default TagPersonCard


//onClick={props.whenClicked}