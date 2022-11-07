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
                    <CardGrid>
                        {entryTagsArray.map((tag, idx) => <TagPersonCard title={tag.title} key={idx} handleClick={()=>handleClick(idx)} />)}
                    </CardGrid>
                </div>}
            </div>
    )

    
}

export default EntryTagSelector