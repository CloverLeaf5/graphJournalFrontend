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


const EntryGroupSelector = (props) => {
    
    const [entryGroupsArray, setEntryGroupsArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/group/getGroups", { withCredentials: true })
                if (response && response.data){
                    let data = response.data;
                    data.sort((a,b) => (a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0));
                    setEntryGroupsArray(data);
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
            <div>
                {entryGroupsArray.length>0 && <div>
                    <h4>Select Groups:</h4>
                    <CardGrid>
                        {entryGroupsArray.map((group, idx) => <TagPersonCard title={group.title} key={idx} handleClick={()=>handleClick(idx)} />)}
                    </CardGrid>
                </div>}
            </div>
    )

    
}

export default EntryGroupSelector