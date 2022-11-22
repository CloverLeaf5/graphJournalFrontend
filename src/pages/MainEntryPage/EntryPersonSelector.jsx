import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TagPersonCard from './TagPersonCard';
import "../../styles/entry.css"



const EntryPersonSelector = (props) => {
    
    const [entryPeopleArray, setEntryPeopleArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                if (response && response.data){
                    let data = response.data;
                    data.sort((a,b) => (a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0));
                    setEntryPeopleArray(data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idx) => {
        let alreadyIn = props.selectedEntryPeople.find((person) => {
            return person._id === entryPeopleArray[idx]._id;
        });

        if (alreadyIn) return;

        props.setSelectedEntryPeople([...props.selectedEntryPeople, entryPeopleArray[idx]]);
        props.setShowObject((prevState)=>{return {...prevState, skipTagsButton: false, tagsTable: true, everythingElse: true}});
    } 
    
    return (
            <div>
                {entryPeopleArray.length>0 && <div>
                    <h4>Select People:</h4>
                    <div className = "card-grid">
                        {entryPeopleArray.map((person, idx) => <TagPersonCard title={person.title} key={idx} handleClick={()=>handleClick(idx)} />)}
                    </div>
                </div>}
            </div>
    )

    
}

export default EntryPersonSelector