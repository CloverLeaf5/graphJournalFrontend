import axios from 'axios';
import { Button, Checkbox } from 'evergreen-ui';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import APIHelper from './APIHelper';
import EntryDetailsForm from './EntryDetailsForm';
import EntryGroupSelector from './EntryGroupSelector';
import EntryPersonSelector from './EntryPersonSelector';
import EntryTagSelector from './EntryTagSelector';
import EntryTypeSelector from './EntryTypeSelector';
import MapInput from './MapInput';
import TagPersonTable from './TagPersonTable';

const MainEntryPage = () => {
    
    const [entryType, setEntryType] = useState("nothing");
    const [entryTypeText, setEntryTypeText] = useState("");
    const [selectedEntryTags, setSelectedEntryTags] = useState([]);
    const [selectedEntryPeople, setSelectedEntryPeople] = useState([]);
    const [selectedEntryGroups, setSelectedEntryGroups] = useState([]);
    const [quillArea, setQuillArea] = useState("");
    const [pictureFields, setPictureFields] = useState([]);
    const [booleans, setBooleans] = useState({
        useGoogleMap: true,
        isStarred: false,
        isAchievement: false
    });
    const [formFields, setFormFields] = useState({
        startDate: "",
        endDate: "",
        title: "",
        subtitle: "",
        location: "",
        rating: "",
        time: ""
    });
    const [metricsArray, setMetricsArray] = useState([]);
    const [showObject, setShowObject] = useState({
        tags: false,
        skipTagsButton: false,
        tagsTable: false, 
        everythingElse: false,
        apiHelper: false,
        requiredData: false
    });
    const [APIData, setAPIData] = useState([]);
    const [APIIndexSelection, setAPIIndexSelection] = useState(-1);  // -1 will be sent as default if no index is selected
    const [mapSearchField, setMapSearchField] = useState("");
    const [mapLocation, setMapLocation] = useState();

    const navigate = useNavigate();

    const postData = async (body) => {
        await axios
        .post("http://localhost:5000/api/v1/entry/newEntry", body, { withCredentials: true })
        .then((response) => {
            setAPIData(response.data);
            setEntryTypeText("");
            setSelectedEntryTags([]);
            setSelectedEntryPeople([]);
            setSelectedEntryGroups([]);
            setFormFields({
                startDate: "",
                endDate: "",
                title: "",
                subtitle: "",
                location: "",
                rating: "",
                time: ""
            });
            setQuillArea("");
            setPictureFields([]);
            setMetricsArray([]);
            if ((entryType === "movie") || (entryType === "show") || (entryType === "book"))
                setShowObject({
                    tags: false,
                    skipTagsButton: false,
                    tagsTable: false, 
                    everythingElse: false,
                    apiHelper: true,
                    requiredData: false
                });
            else {
                setShowObject({
                    tags: false,
                    skipTagsButton: false,
                    tagsTable: false, 
                    everythingElse: false,
                    apiHelper: false,
                    requiredData: false
                });
                setEntryType("nothing");
                navigate("/dashboard");
            }

        })
        .catch((err) => {
            console.log("Something went wrong with entry creation");
            console.log(err);
        })
    }

    const submitForm = () => {
        const data = {
            type: entryType,
            typeText: entryTypeText,
            tags: selectedEntryTags,
            people: selectedEntryPeople,
            groups: selectedEntryGroups,
            startDate: formFields.startDate,
            endDate: formFields.endDate,
            title: formFields.title,
            subtitle: formFields.subtitle,
            details: quillArea,
            location: formFields.location,
            APILocationLat: mapLocation ? mapLocation.lat : "",
            APILocationLng: mapLocation ? mapLocation.lng : "",
            APILocationString: mapSearchField,
            useAPILocation: booleans.useGoogleMap,
            rating: formFields.rating,
            isStarred: booleans.isStarred,
            isAchievement: booleans.isAchievement,
            approxTime: formFields.time.length>0 ? formFields.time : "0",
            metrics: metricsArray,
            pictures: pictureFields
        }
        if (data.title==="" || data.startDate===""){
            setShowObject((prevState) => {
                return {...prevState, requiredData: true}
            });
            return;
        } else {
            setShowObject((prevState) => {
                return {...prevState, requiredData: false}
            });
        }
        postData(data)
    }


    const APIHelperSubmit = () => {
        setShowObject((prevState) => {
            return {...prevState, apiHelper: false}
        })
        updateAPI({arraySelection: APIIndexSelection});
        setEntryType("nothing");
        navigate("/dashboard");
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
            {showObject.requiredData && <h3 style={{color: "red"}}>Title and (Start)Date are required</h3>}
            <EntryTypeSelector entryType={entryType}
                                setEntryType={setEntryType}
                                entryTypeText={entryTypeText}
                                setEntryTypeText={setEntryTypeText}
                                setShowObject={setShowObject} />
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
                                    booleans={booleans}
                                    setBooleans={setBooleans}
                                    metricsArray={metricsArray}
                                    setMetricsArray={setMetricsArray}
                                    pictureFields={pictureFields}
                                    setPictureFields={setPictureFields}
                                    showObject={showObject} />}
            {showObject.everythingElse && booleans.useGoogleMap && <MapInput
                                    mapSearchField={mapSearchField}
                                    setMapSearchField={setMapSearchField}
                                    mapLocation={mapLocation}
                                    setMapLocation={setMapLocation}
                                    />}
            {showObject.everythingElse && <Checkbox label="Use Google Map Input"
                                                    checked={booleans.useGoogleMap}
                                                    onChange={e=>setBooleans({...booleans, useGoogleMap: e.target.checked})} />}
            {showObject.requiredData && <h3 style={{color: "red"}}>Title and (Start)Date are required</h3>}
            {showObject.everythingElse && <Button onClick={submitForm}>Submit Entry</Button>}
            {showObject.apiHelper && <APIHelper
                                    entryType={entryType}
                                    setEntryType={setEntryType}
                                    APIData={APIData}
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