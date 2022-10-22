import axios from 'axios';
import { Button } from 'evergreen-ui';
import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MovieCard from './MovieCard';

const APIHelper = (props) => {

    // The received array will be stored on the server. Will need to send an index of the selection
    const {APIData, setAPIData, entryType} = props;

    const postData = async (body) => {
        const response = await axios
        .post("http://localhost:5000/api/v1/group/newGroup", body, { withCredentials: true })
        .catch((err) => {
            console.log("Something went wrong with group creation");
        });
    
        console.log("Response: ", response);
    }

    

    const cardClicked = (idx) => {
        props.setAPIIndexSelection(idx);
    } 

    const noneOfTheseClick = () => {
        props.setShowObject((prevState) => {
            return {...prevState, apiHelper: false}
        })
    }

    
    return (
        <BasicLayout>
            <h2>If more information is needed, it will be diplayed here</h2>
            {(entryType==="movie") && APIData.map((movie, idx) => <MovieCard 
                                                    title={movie.title}
                                                    release={movie.release}
                                                    image={movie.image}
                                                    selectedClass={(props.APIIndexSelection === idx) ? 'selected-card' : ''}
                                                    key={idx}
                                                    handleClick={()=>cardClicked(idx)} />)}
            <Button onClick={props.APIHelperSubmit}>Submit choice</Button>
            <Button onClick={noneOfTheseClick}>None of these / Skip</Button>
        </BasicLayout>
    )
}

export default APIHelper