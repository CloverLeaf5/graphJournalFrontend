import React from 'react'
import "../../styles/entry.css"


const TagPersonCard = (props) => {

    const title = props.title;
    
    return (
        <div className="tag-person-card" onClick={props.handleClick}>
            <p className="tag-person-text">{title}</p>
        </div>
    )
}

export default TagPersonCard
