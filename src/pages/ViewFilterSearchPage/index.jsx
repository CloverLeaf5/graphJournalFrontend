import axios from 'axios'
import { Button, Combobox, Select } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BasicLayout from '../../layouts/BasicLayout'

const ViewFilterSearchPage = () => {

    const location = useLocation();
    const currentEntries = location.state.entriesArray

    const [filterType, setFilterType] = useState("nothing")
    const [entryTypesArray, setEntryTypesArray] = useState([])
    const [tagsArray, setTagsArray] = useState([])
    const [peopleArray, setPeopleArray] = useState([])
    const [groupsArray, setGroupsArray] = useState([])

    const [entryType, setEntryType] = useState("nothing")
    const [selectedTag, setSelectedTag] = useState("")
    const [selectedPerson, setSelectedPerson] = useState("")
    const [selectedGroup, setSelectedGroup] = useState("")


    const navigate = useNavigate();

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
                console.log("Something went wrong with getting the Groups");
            }
        }
        fetchData();
    }, [])

    ///TYPE
    const handleEntryTypeChange = (selection) => {
        const typeObject = entryTypesArray.find((obj) => {
            return obj.text === selection;
        })
        if (typeObject)
            setEntryType(typeObject.value);
        else
            setEntryType("nothing")
    }

    const filterByType = () => {
        const filteredEntries = currentEntries.filter((entry) =>{
            return entry.type !== entryType
        })
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId
                }
            })
        }
        
    }

    ///TAG
    const filterByTag = () => {
        const filteredEntries = currentEntries.filter((entry) =>{
            const currentTags = entry.tags.map((tag)=>tag.title)
            if (currentTags.length===0) return true;
            else return !currentTags.includes(selectedTag)
        })
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId
                }
            })
        }
    }

    ///PERSON
    const filterByPerson = () => {
        const filteredEntries = currentEntries.filter((entry) =>{
            const currentPeople = entry.people.map((person)=>person.title)
            if (currentPeople.length===0) return true;
            else return !currentPeople.includes(selectedPerson)
        })
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId
                }
            })
        }
    }

    ///GROUP
    const filterByGroup = () => {
        const filteredEntries = currentEntries.filter((entry) =>{
            const currentGroups = entry.groups.map((group)=>group.title)
            if (currentGroups.length===0) return true;
            else return !currentGroups.includes(selectedGroup)
        })
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewEdit", {
                state: {
                    entriesArray: filteredEntries,
                    title: location.state.title,
                    details: location.state.details,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId
                }
            })
        }
    }


    const handleCancel = () => {
        navigate("/viewEdit", {
            state: location.state
        })
    }


    return (
        <BasicLayout>
            <label>What type of data would you like to filter out?</label>
            <Select value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="nothing">Choose an option</option>
                <option value="type">Entry Type</option>
                <option value="tag">Tag</option>
                <option value="person">Person</option>
                <option value="group">Group</option>
            </Select>
            {filterType==="type" && <div className="type-selection" style={{width:'max-content'}}>
                <label>Select a type:</label>
                <Combobox
                    openOnFocus
                    items={entryTypesArray.map(type => type.text)}
                    onChange={handleEntryTypeChange}
                    placeholder="Select Type"
                />
                {entryType!=="nothing" && <Button onClick={filterByType}>Filter Entries</Button>}
            </div>}
            {filterType==="tag" && <div className="tag-selection" style={{width:'max-content'}}>
                <label>Select a tag:</label>
                <Combobox
                    openOnFocus
                    items={tagsArray.map(tag => tag.title)}
                    onChange={(selection)=>setSelectedTag(selection)}
                    placeholder="Select Tag"
                />
                {selectedTag!=="" && <Button onClick={filterByTag}>Filter Entries</Button>}
            </div>}
            {filterType==="person" && <div className="person-selection" style={{width:'max-content'}}>
                <label>Select a person:</label>
                <Combobox
                    openOnFocus
                    items={peopleArray.map(person => person.title)}
                    onChange={(selection)=>setSelectedPerson(selection)}
                    placeholder="Select Person"
                />
                {selectedPerson!=="" && <Button onClick={filterByPerson}>Filter Entries</Button>}
            </div>}
            {filterType==="group" && <div className="group-selection" style={{width:'max-content'}}>
                <label>Select a group:</label>
                <Combobox
                    openOnFocus
                    items={groupsArray.map(group => group.title)}
                    onChange={(selection)=>setSelectedGroup(selection)}
                    placeholder="Select Group"
                />
                {selectedGroup!=="" && <Button onClick={filterByGroup}>Filter Entries</Button>}
            </div>}
            <Button onClick={handleCancel}>Cancel / Skip This</Button>
        </BasicLayout>
    )
}

export default ViewFilterSearchPage