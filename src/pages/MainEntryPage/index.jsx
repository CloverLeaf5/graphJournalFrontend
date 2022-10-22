import axios from 'axios';
import { Button } from 'evergreen-ui';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import APIHelper from './APIHelper';
import EntryDetailsForm from './EntryDetailsForm';
import EntryGroupSelector from './EntryGroupSelector';
import EntryPersonSelector from './EntryPersonSelector';
import EntryTagSelector from './EntryTagSelector';
import EntryTypeSelector from './EntryTypeSelector';
import TagPersonTable from './TagPersonTable';

const MainEntryPage = () => {
    
    const [entryType, setEntryType] = useState("nothing")
    const [selectedEntryTags, setSelectedEntryTags] = useState([]);
    const [selectedEntryPeople, setSelectedEntryPeople] = useState([]);
    const [selectedEntryGroups, setSelectedEntryGroups] = useState([]);
    const [quillArea, setQuillArea] = useState("");
    const [pictureField, setPictureField] = useState("");
    const [formFields, setFormFields] = useState({
        startDate: "",
        endDate: "",
        title: "",
        location: "",
        time: ""
    });
    const [showObject, setShowObject] = useState({
        tags: false,
        skipTagsButton: false,
        tagsTable: false, 
        everythingElse: false,
        apiHelper: false
    });
    const [APIData, setAPIData] = useState([]);
    const [APIIndexSelection, setAPIIndexSelection] = useState("");

    const postData = async (body) => {
        await axios
        .post("http://localhost:5000/api/v1/entry/newEntry", body, { withCredentials: true })
        .then((response) => {
            setAPIData(response.data);
            setSelectedEntryTags([]);
            setSelectedEntryPeople([]);
            setSelectedEntryGroups([]);
            setFormFields({
                startDate: "",
                endDate: "",
                title: "",
                location: "",
                time: ""
            });
            setQuillArea("");
            setPictureField("");
            setShowObject({
                tags: false,
                skipTagsButton: false,
                tagsTable: false, 
                everythingElse: false,
                apiHelper: true
            });
        })
        .catch((err) => {
            console.log("Something went wrong with entry creation");
        })
    }

    const submitForm = () => {
        const data = {
            type: entryType,
            tags: selectedEntryTags,
            people: selectedEntryPeople,
            groups: selectedEntryGroups,
            startDate: formFields.startDate,
            endDate: formFields.endDate,
            title: formFields.title,
            details: quillArea,
            location: formFields.location,
            approxTime: formFields.time,
            picture: pictureField
        }
        postData(data)
    }


    const APIHelperSubmit = () => {
        setShowObject((prevState) => {
            return {...prevState, apiHelper: false}
        })
        updateAPI({arraySelection: APIIndexSelection});
    }

    const updateAPI = async (body) => {
        await axios
        .post("http://localhost:5000/api/v1/entry/updateAPIImage", body, { withCredentials: true })
        .catch((err) => {
            console.log("Something went wrong with entry API Image update");
        })
    }
    
    return (
        <BasicLayout>
            <h2>Input a new Entry</h2>
            <EntryTypeSelector entryType={entryType} setEntryType={setEntryType} setShowObject={setShowObject} />
            {showObject.tags && <EntryTagSelector 
                                    selectedEntryTags={selectedEntryTags}
                                    setSelectedEntryTags={setSelectedEntryTags}
                                    setShowObject={setShowObject}
                                    showObject={showObject} />}
            {showObject.tags && <EntryPersonSelector 
                                    selectedEntryPeople={selectedEntryPeople}
                                    setSelectedEntryPeople={setSelectedEntryPeople}
                                    setShowObject={setShowObject}
                                    showObject={showObject} />}
            {showObject.tags && <EntryGroupSelector 
                                    selectedEntryGroups={selectedEntryGroups}
                                    setSelectedEntryGroups={setSelectedEntryGroups}
                                    setShowObject={setShowObject}
                                    showObject={showObject} />}
            {showObject.skipTagsButton && <Button 
                                    onClick={()=>{
                                        return setShowObject((prevState)=>{
                                            return {...prevState, tags: false, skipTagsButton: false, everythingElse: true}
                                        })
                                    }}>Skip This</Button>}
            {showObject.tagsTable && <TagPersonTable
                                    selectedEntryTags={selectedEntryTags}
                                    setSelectedEntryTags={setSelectedEntryTags}
                                    selectedEntryPeople={selectedEntryPeople}
                                    setSelectedEntryPeople={setSelectedEntryPeople}
                                    selectedEntryGroups={selectedEntryGroups}
                                    setSelectedEntryGroups={setSelectedEntryGroups}
                                    />}
            {showObject.everythingElse && <EntryDetailsForm
                                    entryType={entryType}
                                    formFields={formFields}
                                    setFormFields={setFormFields}
                                    quillArea={quillArea}
                                    setQuillArea={setQuillArea}
                                    pictureField={pictureField}
                                    setPictureField={setPictureField} />}
            {showObject.everythingElse && <Button onClick={submitForm}>Submit Entry</Button>}
            {showObject.apiHelper && <APIHelper
                                    entryType={entryType}
                                    APIData={APIData}
                                    setAPIData={setAPIData}
                                    APIIndexSelection={APIIndexSelection}
                                    setAPIIndexSelection={setAPIIndexSelection}
                                    showObject={showObject}
                                    setShowObject={setShowObject}
                                    APIHelperSubmit={APIHelperSubmit} />}
            
            <Link to="/dashboard">Go Back</Link>
            
        </BasicLayout>
    )
}

export default MainEntryPage