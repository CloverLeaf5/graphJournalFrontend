import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TagPersonCard from './TagPersonCard';
import "../../styles/entry.css"


const EntryTagSelector = (props) => {
    
    const [entryTagsArray, setEntryTagsArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/tag/getTags", { withCredentials: true })
                if (response && response.data){
                    let data = response.data;
                    data.sort((a,b) => (a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0));
                    setEntryTagsArray(data);
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
            <div>
                {entryTagsArray.length>0 && <div>
                    <h4>Select Tags:</h4>
                    <div className = "card-grid">
                        {entryTagsArray.map((tag, idx) => <TagPersonCard title={tag.title} key={idx} handleClick={()=>handleClick(idx)} />)}
                    </div>
                </div>}
            </div>
    )

    
}

export default EntryTagSelector