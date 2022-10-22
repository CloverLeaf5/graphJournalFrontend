import axios from 'axios';
import { Select } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'

const EntryTypeSelector = (props) => {

    const [entryTypesArray, setEntryTypesArray] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/entry/getEntryTypesWithText", { withCredentials: true })
                if (response && response.data){
                    setEntryTypesArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Types");
            }
        }
        fetchData();
    }, [])

    const handleEntryTypeChange = (e) => {
        props.setEntryType(e.target.value);
        if (e.target.value !== "nothing"){
            props.setShowObject((prevState) => {
                return { ...prevState, tags: true, skipTagsButton: true};
            })
        }
        if (e.target.value === "nothing"){
            props.setShowObject((prevState) => {
                return { ...prevState, tags: false, skipTagsButton: false, everythingElse: false};
            })
        }
    }
    
    

    return (
            <Select
                name='type'
                label='Select the type of entry'
                value={props.entryType}
                onChange={handleEntryTypeChange}>
                <option value="nothing">Select a Type</option>
                {entryTypesArray.map((type, idx) => <option value={type.value} key={idx}>{type.text}</option>)}
            </Select>
    )
}

export default EntryTypeSelector