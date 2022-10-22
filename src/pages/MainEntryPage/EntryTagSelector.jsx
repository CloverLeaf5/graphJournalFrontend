import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TagPersonCard from './TagPersonCard';

const EntryTagSelector = (props) => {
    
    const [entryTagsArray, setEntryTagsArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/tag/getTags", { withCredentials: true })
                if (response && response.data){
                    setEntryTagsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idx) => {
        let alreadyIn = props.selectedEntryTags.find((tag) => {
            return tag._id === entryTagsArray[idx]._id;
        });

        if (alreadyIn) return;

        props.setSelectedEntryTags([...props.selectedEntryTags, entryTagsArray[idx]]);
        props.setShowObject((prevState)=>{return {...prevState, skipTagsButton: false, tagsTable: true, everythingElse: true}});
    } 
    
    return (
            <div >
                <h5>Select Tags:</h5>
                {entryTagsArray.map((tag, idx) => <TagPersonCard title={tag.title} key={idx} handleClick={()=>handleClick(idx)} />)}
            </div>
    )

    
}

export default EntryTagSelector