import axios from 'axios';
import { Combobox } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'

const EntryTypeSelector = (props) => {

    const [entryTypesArray, setEntryTypesArray] = useState([]);

    const { entryType, setEntryType, entryTypeText, setEntryTypeText } = props;

    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/entry/getEntryTypesWithText", { withCredentials: true })
                if (response && response.data){
                    setEntryTypesArray(response.data);
                }

            } catch(err) {
                console.log(err)
                console.log("Something went wrong with getting the Types");
            }
        }
        fetchData();
    }, [])


    const handleEntryTypeChange = (selection) => {
        const typeObject = entryTypesArray.find((obj) => {
            return obj.text === selection;
        })

        if (typeObject){
            setEntryType(typeObject.value);
            console.log(typeObject.value)
            setEntryTypeText(typeObject.text)
            if (typeObject.value !== "nothing"){
                props.setShowObject((prevState) => {
                    return { ...prevState, tags: true, skipTagsButton: true};
                })
            }
            if (typeObject.value === "nothing"){
                props.setShowObject((prevState) => {
                    return { ...prevState, tags: false, skipTagsButton: false, everythingElse: false};
                })
            }
        } else {
            setEntryType("nothing");
            setEntryTypeText("")
        }
        
    }

    
    
    

    return (

            <div style={{width:'max-content'}}>
                <Combobox
                    openOnFocus
                    items={entryTypesArray.map(type => type.text)}
                    onChange={handleEntryTypeChange}
                    placeholder="Select Type"
                    initialSelectedItem={entryTypeText}
                />
            </div>
    )
}

export default EntryTypeSelector