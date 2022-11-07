import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TagPersonCard from './TagPersonCard';


const CardGrid = styled.div`
width: 100%;
height: auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap: 5px;
text-align: center;
font-size: 16px;
border-style: solid;
margin: 8px auto 8px 5px;
cursor: pointer;
`;


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
                    <CardGrid>
                        {entryPeopleArray.map((person, idx) => <TagPersonCard title={person.title} key={idx} handleClick={()=>handleClick(idx)} />)}
                    </CardGrid>
                </div>}
            </div>
    )

    
}

export default EntryPersonSelector