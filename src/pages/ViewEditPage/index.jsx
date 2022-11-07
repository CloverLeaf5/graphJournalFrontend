import axios from 'axios';
import { Button, Checkbox, Pane, Popover, Select, Table, TextInput } from 'evergreen-ui';
import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import EntryCardOriginal from './EntryCardOriginal';
import Map from './Map';
import "./quill.snow.css";

const ViewEditPage = () => {

    // Updated to store the index of the array that a user clicks on
    let clickedIndex;

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    // Holds a reference to the Google Map component
    const mapRef = useRef();

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state.entriesArray); // The actual entries in the view
    const [entryDisplayTypes, setEntryDisplayTypes] = useState(location.state.entryDisplayTypes) // How each entry is displayed in traditional mode
    const [title, setTitle] = useState(location.state.title); // Title of the view
    const [details, setDetails] = useState(location.state.details); // Quill details
    const [viewType, setViewType] = useState(location.state.viewType); // How the entries are displayed
    const [missingData, setMissingData] = useState(false); // Whether title is empty when submit is clicked
    const [useMap, setUseMap] = useState(location.state.useGoogleMap); // The Google Map
    const [mostRecentFirst, setMostRecentFirst] = useState(location.state.mostRecentFirst); // The chronological order of displayed entries
    

    // GO TO THE VIEW COMBINE PAGE, SEND THE NECESSARY STATE
    const handleCombineClick = () => {
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewCombine", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    mostRecentFirst: mostRecentFirst,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewCombine", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    mostRecentFirst: mostRecentFirst
                }
            })
        }
    }

    // GO TO THE VIEW FILTER PAGE, SEND THE NECESSARY STATE
    const handleFilterClick = () => {
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewFilter", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    mostRecentFirst: mostRecentFirst,
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewFilter", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    mostRecentFirst: mostRecentFirst
                }
            })
        }
    }

    // GO TO THE ENTRY VIEW PAGE. DETAILS WILL BE STORED IN STATE, SO THE BROWSER BACK BUTTON DOESN'T WORK
    const viewEntryAtClickedIndex = (close) => {
        // Must keep the viewID in state if this is a view to update
        close();
        if (location.state.viewId) {
            navigate("/entryView", {
                state: {
                    currentEntry: entriesArray[clickedIndex],
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    viewId: location.state.viewId,
                    mostRecentFirst: mostRecentFirst,
                    whereFrom: "/viewEdit" // So the user can get back to the edit page rather than the saved view page
                }
            });
        } else {
            navigate("/entryView", {
                state: {
                    currentEntry: entriesArray[clickedIndex],
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    entryDisplayTypes: entryDisplayTypes,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    mostRecentFirst: mostRecentFirst,
                    whereFrom: "/viewEdit" // So the user can get back to the edit page rather than the saved view page
                }
            });
        }
    }

    // Simply removes the selected entry from the array (must also remove from the entryDisplayTypes array)
    const removeClickedIndex = (close) => {
        close();
        // Remove entry
        const copiedArray = [...entriesArray];
        copiedArray.splice(clickedIndex,1);
        setEntriesArray(copiedArray);
        // Remove entry display
        const copiedDisplays = [...entryDisplayTypes];
        copiedDisplays.splice(clickedIndex,1);
        setEntryDisplayTypes(copiedDisplays);
    }

    // SAVE THE VIEW, RESPONDS TO THE SUBMIT BUTTON
    const saveView = async () => {
        // Extract the IDs from the entries
        const entryIDs = entriesArray.map((entry)=>entry._id);
        // Create the save object to be sent to the backend
        let body = {
            title: title,
            details: details,
            entries: entryIDs,
            entryDisplayTypes: entryDisplayTypes,
            viewType: viewType,
            useGoogleMap: useMap,
            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
            mostRecentFirst: mostRecentFirst
        }
        // Only save if the title has been set
        if(title===""){
            setMissingData(true);
            return;
        }
        else
            setMissingData(false);
        // If there is a current viewId then this is not new, and is an update
        // BIG IF STATEMENT TO MAKE THE DETERMINATION
        if (location.state.viewId) {
            body.viewId = location.state.viewId;
            try{
                const response = await axios.post("http://localhost:5000/api/v1/view/updateView", body, { withCredentials: true })
                if (response && response.data) {
                    // Navigate to the saved view of the newly updated View
                    // Must keep the viewID in state if this is a view to update
                    navigate("/savedView", {
                        state: {
                            title: title,
                            details: details,
                            entriesArray: entriesArray,
                            entryDisplayTypes: entryDisplayTypes,
                            viewType: viewType,
                            useGoogleMap: useMap,
                            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                            viewId: response.data._id,
                            mostRecentFirst: mostRecentFirst
                        }
                    });
                }
                
            } catch (err) {
                console.log("Something went wrong with group creation");
                console.log(err);
            }

        } else {  // No viewId means that this is a new view
            try{
                const response = await axios.post("http://localhost:5000/api/v1/view/saveView", body, { withCredentials: true })
                if (response && response.data) {
                    // Navigate to the saved view of the newly updated View
                    // Must keep the viewID in state if this is a view to update
                    navigate("/savedView", {
                        state: {
                            title: title,
                            details: details,
                            entriesArray: entriesArray,
                            entryDisplayTypes: entryDisplayTypes,
                            viewType: viewType,
                            useGoogleMap: useMap,
                            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                            viewId: response.data._id,
                            mostRecentFirst: mostRecentFirst
                        }
                    });
                }
                
            } catch (err) {
                console.log("Something went wrong with group creation");
                console.log(err);
            }
        }
    }

    const handleChronology = (e) => {
        setEntriesArray(entriesArray.reverse());
        setEntryDisplayTypes(entryDisplayTypes.reverse());
        setMostRecentFirst(e.target.checked);
    }

    return (
        <div>
            <BasicLayout>
                {missingData && <h3 style={{color: "red"}}>Title is required</h3>}
                <label>View Title</label>
                <TextInput placeholder='View Title' value={title} onChange={(e)=>setTitle(e.target.value)} isInvalid={missingData} required />
                <label>View Details</label>
                <ReactQuill theme="snow" value={details} onChange={setDetails} />
                <div>
                    <Button onClick={handleCombineClick}>Combine With Another Search</Button>
                    <Button onClick={handleFilterClick}>Filter Out Entries</Button>
                </div>
                {useMap && <Map entriesArray={entriesArray} mapRef={mapRef} location={location} />}
                <Checkbox label="Use Google Map" checked={useMap} onChange={e=>setUseMap(e.target.checked)} />
                <label>Select a View Type</label>
                <Select value={viewType} onChange={e=>setViewType(e.target.value)}>
                    <option value="table">Table</option>
                    <option value="traditional">Traditional</option>
                    {/* <option value="timeline">Timeline</option> */}
                </Select>
                <Checkbox label="Chronology: Most recent first" checked={mostRecentFirst} onChange={e=>handleChronology(e)} />
            </BasicLayout>

            {viewType==="table" && <div className="entry-table">
                <h2>List of Entries (click to remove from view)</h2>
                <Table.Head>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Date</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Type</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Title</Table.TextCell>
                </Table.Head>
                <Table.Body>
                    {entriesArray.map((entry, idx) => 
                        <Popover key={idx} content={({ close }) => (
                            <BasicLayout>
                                <Button onClick={()=>viewEntryAtClickedIndex(close)}>View Entry</Button>
                                <Button onClick={()=>removeClickedIndex(close)}>Remove from View</Button>
                                <Button onClick={close}>Cancel</Button>
                            </BasicLayout>
                            )}>
                            <Table.Row key={idx} isSelectable={true} onSelect={()=>{clickedIndex=idx}}>
                                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                                    {entry.startDate}
                                </Table.TextCell>
                                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                                    {entry.typeText}
                                </Table.TextCell>
                                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                                    {entry.title}
                                </Table.TextCell>
                            </Table.Row>
                        </Popover>
                    )}
                </Table.Body>
            </div>}

            {viewType==="traditional" && <div className="traditional">
                <h2>List of Entries (click to remove from view)</h2>
                {entriesArray.map((entry, idx) => 
                    <Popover key={idx} content={({ close }) => (
                        <BasicLayout>
                            <Button onClick={()=>viewEntryAtClickedIndex(close)}>View Entry</Button>
                            <Button onClick={()=>removeClickedIndex(close)}>Remove from View</Button>
                            <Button onClick={close}>Cancel</Button>
                        </BasicLayout>
                        )}>
                        <Pane style={{width:'max-content'}}>
                            {entryDisplayTypes[idx] === "default" && <EntryCardOriginal entry={entry} entriesArray={entriesArray} orderChange={mostRecentFirst} whenClicked={()=>{clickedIndex=idx}} />}
                        </Pane>
                    </Popover>
                )}
            </div>}
            <BasicLayout>
                {missingData && <h3 style={{color: "red"}}>Title is required</h3>}
                <Button onClick={saveView}>Save View</Button>
                <Link to="/dashboard">Go Back</Link>
            </BasicLayout>
        </div>
    )
}

export default ViewEditPage