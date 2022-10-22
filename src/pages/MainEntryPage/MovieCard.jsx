import React from 'react'
import "./cardClass.css";


const MovieCard = (props) => {

    const { title, release, image } = props;
    
    return (
        <div className={props.selectedClass} onClick={props.handleClick}>
            <h6>{title}</h6>
            <h6>{release}</h6>
            <img src={image} alt={title} />
        </div>
    )
}

export default MovieCard