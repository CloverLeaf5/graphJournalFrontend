import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Combobox, Table, TextInputField } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import BasicLayout from "../../layouts/BasicLayout"
import TagPersonCard from "../MainEntryPage/TagPersonCard"

const TABLE_WIDTH = 300;

const ViewCombineSearchPage = () => {

    const location = useLocation();
    const currentEntries = location.state.entriesArray
    const currentEntryDisplayTypes = location.state.entryDisplayTypes

    // All tags, types, people, and groups from the database
    const [entryTypesArray, setEntryTypesArray] = useState([])
    const [tagsArray, setTagsArray] = useState([])
    const [peopleArray, setPeopleArray] = useState([])
    const [groupsArray, setGroupsArray] = useState([])

    // To hold the criteria that the user inputs
    const [entryType, setEntryType] = useState("nothing")
    const [selectedEntryTags, setSelectedEntryTags] = useState([])
    const [selectedEntryPeople, setSelectedEntryPeople] = useState([])
    const [selectedEntryGroups, setSelectedEntryGroups] = useState([])

    const [startDateStart, setStartDateStart] = useState("")
    const [startDateEnd, setStartDateEnd] = useState("")
    const [endDateStart, setEndDateStart] = useState("")
    const [endDateEnd, setEndDateEnd] = useState("")

    const navigate = useNavigate();
    

    useEffect(() => {
        // Get types, tags, people, and groups to allow the user to search based on these
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
            try {
                const response = await axios.get("http://localhost:5000/api/v1/tag/getTags", { withCredentials: true })
                if (response && response.data){
                    setTagsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
            try {
                const response = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                if (response && response.data){
                    setPeopleArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the People");
            }
            try {
                const response = await axios.get("http://localhost:5000/api/v1/group/getGroups", { withCredentials: true })
                if (response && response.data){
                    setGroupsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async () => {
        // Create a body object to send input search criteria to the backend
        const body = {
            type: entryType,
            tags: selectedEntryTags,
            people: selectedEntryPeople,
            groups: selectedEntryGroups,
            startDateStart: startDateStart,
            startDateEnd: startDateEnd,
            endDateStart: endDateStart,
            endDateEnd: endDateEnd
        }

        try {
            const response = await axios.post("http://localhost:5000/api/v1/view/findEntries", body, { withCredentials: true })
            if (response && response.data){
                const foundEntries = response.data
                // Must strip the time part of the dates
                for (const entry of foundEntries){
                    entry.startDate = entry.startDate.slice(0,10)
                    if (entry.endDate) entry.endDate = entry.endDate.slice(0,10)
                }
                // Only add new ones to the array. Also add a new default display type
                const currentEntriesIDs = currentEntries.map((entry) => (entry._id))
                for (const entry of foundEntries){
                    if (!currentEntriesIDs.includes(entry._id)){
                        currentEntries.push(entry)
                        currentEntryDisplayTypes.push("default")
                    }
                }
                // SORT BOTH ARRAYS IN TANDEM https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
                //1) combine the arrays:
                let list = [];
                for (let i=0; i<currentEntries.length; i++) 
                    list.push({'entry': currentEntries[i], 'display': currentEntryDisplayTypes[i]});
                //2) sort:
                list.sort(function(a, b) {
                    return (
                        (Number(b.entry.startDate.slice(0,4)) - Number(a.entry.startDate.slice(0,4))) || // Check year
                        (Number(b.entry.startDate.slice(5,7)) - Number(a.entry.startDate.slice(5,7))) || // Check month
                        (Number(b.entry.startDate.slice(8,10)) - Number(a.entry.startDate.slice(8,10))) || // Check date
                        (Number(b.entry.approxTime) - Number(a.entry.approxTime)) // Check time
                    )
                });
                //3) separate them back out:
                for (let i=0; i<list.length; i++) {
                    currentEntries[i] = list[i].entry;
                    currentEntryDisplayTypes[i] = list[i].display;
                }
                // GO BACK TO THE VIEW EDIT, SEND THE NECESSARY STATE
                // Must keep the viewID in state if this is a view to update
                if (location.state.viewId) {
                    navigate("/viewEdit", {
                        state: {
                            entriesArray: currentEntries,
                            entryDisplayTypes: currentEntryDisplayTypes,
                            title: location.state.title,
                            details: location.state.details,
                            viewType: location.state.viewType,
                            useGoogleMap: location.state.useGoogleMap,
                            googleMapCenterLat: location.state.googleMapCenterLat,
                            googleMapCenterLng: location.state.googleMapCenterLng,
                            googleMapZoom: location.state.googleMapZoom,
                            googleMapTypeId: location.state.googleMapTypeId,
                            mostRecentFirst: location.state.mostRecentFirst,
                            viewId: location.state.viewId
                        }
                    })
                } else {
                    navigate("/viewEdit", {
                        state: {
                            entriesArray: currentEntries,
                            entryDisplayTypes: currentEntryDisplayTypes,
                            title: location.state.title,
                            details: location.state.details,
                            viewType: location.state.viewType,
                            useGoogleMap: location.state.useGoogleMap,
                            googleMapCenterLat: location.state.googleMapCenterLat,
                            googleMapCenterLng: location.state.googleMapCenterLng,
                            googleMapZoom: location.state.googleMapZoom,
                            googleMapTypeId: location.state.googleMapTypeId,
                            mostRecentFirst: location.state.mostRecentFirst
                        }
                    })
                }
            }
        } catch(err) {
            console.log("Something went wrong with getting the posting the data");
        }
    }

    // HANDLE INTERACTIONS WITH THE UI
    const handleEntryTypeChange = (selection) => {
        const typeObject = entryTypesArray.find((obj) => {
            return obj.text === selection;
        })
        if (typeObject)
            setEntryType(typeObject.value);
        else
            setEntryType("nothing")
    }

    const handleClickTag = (idx) => {
        let alreadyIn = selectedEntryTags.find((tag) => {
            return tag._id === groupsArray[idx]._id;
        });
        if (alreadyIn) return;
        setSelectedEntryTags([...selectedEntryTags, tagsArray[idx]]);
    }

    const handleClickPerson = (idx) => {
        let alreadyIn = selectedEntryPeople.find((person) => {
            return person._id === peopleArray[idx]._id;
        });
        if (alreadyIn) return;
        setSelectedEntryPeople([...selectedEntryPeople, peopleArray[idx]]);
    }

    const handleClickGroup = (idx) => {
        let alreadyIn = selectedEntryGroups.find((group) => {
            return group._id === groupsArray[idx]._id;
        });
        if (alreadyIn) return;
        setSelectedEntryGroups([...selectedEntryGroups, groupsArray[idx]]);
    }

    const handleClickTagTable = (idxToRemove) => {
        setSelectedEntryTags((prevState) => {
            return prevState.filter((tag, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }

    const handleClickPersonTable = (idxToRemove) => {
        setSelectedEntryPeople((prevState) => {
            return prevState.filter((person, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }

    const handleClickGroupTable = (idxToRemove) => {
        setSelectedEntryGroups((prevState) => {
            return prevState.filter((group, idx) => {
                return (idx !== idxToRemove)
            })
        })
    }

    return (
        <BasicLayout>
            <h1>Create a Vew View</h1>
            <h2>Selections below are optional and combined "AND" style</h2>
            <h2>Which means all options must be true for entries to be found</h2>
            <h4>Entries can be added or filtered out next</h4>

            <div style={{width:'max-content'}}>
                <label>Select a type:</label>
                <Combobox
                    openOnFocus
                    items={entryTypesArray.map(type => type.text)}
                    onChange={handleEntryTypeChange}
                    placeholder="Select Type"
                />
            </div>
            <div >
                <h5>Select Tags:</h5>
                {tagsArray.map((tag, idx) => <TagPersonCard title={tag.title} key={idx} handleClick={()=>handleClickTag(idx)} />)}
            </div>
            <div >
                <h5>Select People:</h5>
                {peopleArray.map((person, idx) => <TagPersonCard title={person.title} key={idx} handleClick={()=>handleClickPerson(idx)} />)}
            </div>
            <div >
                <h5>Select Groups:</h5>
                {groupsArray.map((group, idx) => <TagPersonCard title={group.title} key={idx} handleClick={()=>handleClickGroup(idx)} />)}
            </div>

            <div className="tag-person-tables">
                <div className="tag-table">
                    {selectedEntryTags.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Tags</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {selectedEntryTags.map((tag, idx) => 
                            <Table.Row key={idx} isSelectable={true} onSelect={()=>handleClickTagTable(idx)}>
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {tag.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="person-table">
                    {selectedEntryPeople.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {selectedEntryPeople.map((person, idx) => 
                            <Table.Row key={idx} isSelectable={true} onSelect={()=>handleClickPersonTable(idx)}>
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {person.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="group-table">
                    {selectedEntryGroups.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Groups</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {selectedEntryGroups.map((group, idx) => 
                            <Table.Row key={idx} isSelectable={true} onSelect={()=>handleClickGroupTable(idx)}>
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {group.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
            
            </div>

            <TextInputField
                    name='startDateStart'
                    label='Beginning of Start Date search'
                    type='date'
                    value={startDateStart}
                    onChange={(e)=>setStartDateStart(e.target.value)} />
            <TextInputField
                    name='startDateEnd'
                    label='End of Start Date search'
                    type='date'
                    value={startDateEnd}
                    onChange={(e)=>setStartDateEnd(e.target.value)} />
            <TextInputField
                    name='endDateStart'
                    label='Beginning of End Date search'
                    type='date'
                    value={endDateStart}
                    onChange={(e)=>setEndDateStart(e.target.value)} />
            <TextInputField
                    name='endDateEnd'
                    label='End of End Date search'
                    type='date'
                    value={endDateEnd}
                    onChange={(e)=>setEndDateEnd(e.target.value)} />
            <Button onClick={handleSubmit}>Submit</Button>
            <Link to="/dashboard">Go Back</Link>
        </BasicLayout>

    )
}

export default ViewCombineSearchPage