import { Button } from 'evergreen-ui';
import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MovieCard from './MovieCard';

const APIHelper = (props) => {

    // The received array will still be stored on the server. Will need to send an index of the selection
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
            <h2>Select a poster for your movie, show, or book</h2>
            {(APIData.length === 0) &&
                <div>
                    <h3>No cover or poster was found for this title.</h3>
                    <h3>Please skip this, edit the entry, and upload your own image.</h3>
                </div>
            }
            {(APIData.length > 0) && (entryType==="movie") && APIData.map((movie, idx) => <MovieCard 
                                                    title={movie.title}
                                                    release={movie.release}
                                                    imageDBPath={movie.imageDBPath}
                                                    imagePosterPath={movie.imagePosterPath}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            {(APIData.length > 0) && (entryType==="show") && APIData.map((show, idx) => <MovieCard 
                                                    title={show.title}
                                                    release={show.release}
                                                    imageDBPath={show.imageDBPath}
                                                    imagePosterPath={show.imagePosterPath}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            {(APIData.length > 0) && (entryType==="book") && APIData.map((book, idx) => <MovieCard 
                                                    title={book.title}
                                                    release={book.author}
                                                    imageDBPath={book.imageDBPath}
                                                    imagePosterPath={book.imagePosterPath}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            <Button onClick={props.APIHelperSubmit}>Submit choice</Button>
            <Button onClick={noneOfTheseClick}>None of these / Skip</Button>
        </BasicLayout>
    )
}

export default APIHelper