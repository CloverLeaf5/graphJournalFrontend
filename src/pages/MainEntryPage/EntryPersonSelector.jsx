import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TagPersonCard from './TagPersonCard';

const EntryPersonSelector = (props) => {
    
    const [entryPeopleArray, setEntryPeopleArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                if (response && response.data){
                    setEntryPeopleArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idx) => {
        let alreadyIn = props.selectedEntryPeople.find((tag) => {
            return tag._id === entryPeopleArray[idx]._id;
        });

        if (alreadyIn) return;

        props.setSelectedEntryPeople([...props.selectedEntryPeople, entryPeopleArray[idx]]);
        props.setShowObject((prevState)=>{return {...prevState, skipTagsButton: false, tagsTable: true, everythingElse: true}});
    } 
    
    return (
            <div >
                <h5>Select People:</h5>
                {entryPeopleArray.map((tag, idx) => <TagPersonCard title={tag.title} key={idx} handleClick={()=>handleClick(idx)} />)}
            </div>
    )

    
}

export default EntryPersonSelector