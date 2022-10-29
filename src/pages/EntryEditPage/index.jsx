import axios from 'axios';
import { Button, Checkbox, Dialog } from 'evergreen-ui';
import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import BasicLayout from '../../layouts/BasicLayout'
import APIHelper from '../MainEntryPage/APIHelper';
import EntryDetailsForm from '../MainEntryPage/EntryDetailsForm';
import EntryGroupSelector from '../MainEntryPage/EntryGroupSelector';
import EntryPersonSelector from '../MainEntryPage/EntryPersonSelector';
import EntryTagSelector from '../MainEntryPage/EntryTagSelector';
import EntryTypeSelector from '../MainEntryPage/EntryTypeSelector';
import MapInput from '../MainEntryPage/MapInput';
import TagPersonTable from '../MainEntryPage/TagPersonTable';

const EntryEditPage = () => {

    const location = useLocation();
    const entry = location.state;

    const [entryType, setEntryType] = useState(entry.type)
    const [entryTypeText, setEntryTypeText] = useState(entry.typeText);
    const [selectedEntryTags, setSelectedEntryTags] = useState(entry.tags);
    const [selectedEntryPeople, setSelectedEntryPeople] = useState(entry.people);
    const [selectedEntryGroups, setSelectedEntryGroups] = useState(entry.groups);
    const [quillArea, setQuillArea] = useState(entry.details ? entry.details : "");
    const [pictureFields, setPictureFields] = useState(entry.pictures);
    const [booleans, setBooleans] = useState({
        useGoogleMap: entry.useAPILocation,
        isStarred: entry.isStarred,
        isAchievement: entry.isAchievement
    });
    const [formFields, setFormFields] = useState({
        startDate: entry.startDate,
        endDate: entry.endDate ? entry.endDate : "",
        title: entry.title,
        subtitle: entry.subtitle ? entry.subtitle : "",
        location: entry.location ? entry.location : "",
        rating: entry.rating ? entry.rating : "",
        time: entry.approxTime ? entry.approxTime : ""
    });
    const [metricsArray, setMetricsArray] = useState(entry.metrics);
    const [showObject, setShowObject] = useState({
        tags: true,
        skipTagsButton: true,
        tagsTable: true, 
        everythingElse: true,
        apiHelper: false,
        requiredData: false
    });
    const [APIData, setAPIData] = useState([]);
    const [APIIndexSelection, setAPIIndexSelection] = useState("");
    const [mapSearchField, setMapSearchField] = useState(entry.APILocationString);
    const [mapLocation, setMapLocation] = useState(
        entry.APILocationLat
        ? {lat: entry.APILocationLat, lng: entry.APILocationLng}
        : {}
    );
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    
    const navigate = useNavigate();

    const postData = async (body) => {
        await axios
        .post("http://localhost:5000/api/v1/entry/updateEntry", body, { withCredentials: true })
        .then((response) => {
            setAPIData(response.data);
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
            if ((entryType === "movie") || (entryType === "show")){
                if (response.data.length === 0){
                    setEntryType("nothing");
                    navigate("/dashboard");
                } else {
                    setShowObject({
                        tags: false,
                        skipTagsButton: false,
                        tagsTable: false, 
                        everythingElse: false,
                        apiHelper: true,
                        requiredData: false
                    });
                }
            } else {
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
            console.log("Something went wrong with entry update");
            console.log(err);
        })
    }


    const submitUpdates = () => {
        const data = {
            entryId: entry._id,
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
            approxTime: formFields.time,
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

    const deleteEntry = async () => {
        await axios.post("http://localhost:5000/api/v1/entry/deleteEntry", 
                        {entryId: entry._id},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
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
            <h2>Edit Your Entry</h2>
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
            {showObject.everythingElse && <Button onClick={submitUpdates}>Update Entry</Button>}
            {showObject.everythingElse && <Button intent="danger" onClick={()=>setShowDeleteDialog(true)}>Delete Entry</Button>}
            <Dialog
                isShown={showDeleteDialog}
                title="Confirm Delete Entry"
                intent="danger"
                onCloseComplete={() => {
                    setShowDeleteDialog(false);
                    deleteEntry();}}
                confirmLabel="Delete">
            Are you sure you want to delete this Entry? This cannot be undone and will affect any saved views with this entry.
            </Dialog>
            {showObject.apiHelper && <APIHelper
                                    entryType={entryType}
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

export default EntryEditPage