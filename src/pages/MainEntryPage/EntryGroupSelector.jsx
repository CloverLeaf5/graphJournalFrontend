import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TagPersonCard from './TagPersonCard';

const EntryGroupSelector = (props) => {
    
    const [entryGroupsArray, setEntryGroupsArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/group/getGroups", { withCredentials: true })
                if (response && response.data){
                    setEntryGroupsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Groups");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idx) => {
        let alreadyIn = props.selectedEntryGroups.find((group) => {
            return group._id === entryGroupsArray[idx]._id;
        });

        if (alreadyIn) return;

        props.setSelectedEntryGroups([...props.selectedEntryGroups, entryGroupsArray[idx]]);
        props.setShowObject((prevState)=>{return {...prevState, skipTagsButton: false, tagsTable: true, everythingElse: true}});
    } 
    
    return (
            <div >
                <h5>Select Groups:</h5>
                {entryGroupsArray.map((group, idx) => <TagPersonCard title={group.title} key={idx} handleClick={()=>handleClick(idx)} />)}
            </div>
    )

    
}

export default EntryGroupSelector