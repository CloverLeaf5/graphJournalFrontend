import React from 'react'
import "./cardClass.css";


const MovieCard = (props) => {

    const { title, release, imageDBPath, imagePosterPath } = props;
    
    return (
        <div className={props.selectedClass} onClick={props.handleClick}>
            <h6>{title}</h6>
            <h6>{release}</h6>
            {imagePosterPath !== "null" 
               ? <img src={`${imageDBPath}${imagePosterPath}`} alt={`${title} poster from The Movie Database TMDB`} />
               : <p>Image Not Found</p>}
        </div>
    )
}

export default MovieCard