import { Button } from 'evergreen-ui';
import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MovieCard from './MovieCard';

const APIHelper = (props) => {

    // The received array will be stored on the server. Will need to send an index of the selection
    const {APIData, entryType, setEntryType} = props;

    const cardClicked = (idx) => {
        props.setAPIIndexSelection(idx);
    } 

    const noneOfTheseClick = () => {
        props.setShowObject((prevState) => {
            return {...prevState, apiHelper: false}
        })
        setEntryType("nothing");
    }

    
    return (
        <BasicLayout>
            <h2>Select a poster for your movie or show</h2>
            {(entryType==="movie") && APIData.map((movie, idx) => <MovieCard 
                                                    title={movie.title}
                                                    release={movie.release}
                                                    imageDBPath={movie.imageDBPath}
                                                    imagePosterPath={movie.imagePosterPath}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            {(entryType==="show") && APIData.map((show, idx) => <MovieCard 
                                                    title={show.title}
                                                    release={show.release}
                                                    imageDBPath={show.imageDBPath}
                                                    imagePosterPath={show.imagePosterPath}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            <Button onClick={props.APIHelperSubmit}>Submit choice</Button>
            <Button onClick={noneOfTheseClick}>None of these / Skip</Button>
        </BasicLayout>
    )
}

export default APIHelper