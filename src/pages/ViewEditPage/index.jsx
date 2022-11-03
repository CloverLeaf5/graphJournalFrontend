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

    let clickedIndex;

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    const mapRef = useRef();

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state.entriesArray);
    const [title, setTitle] = useState(location.state.title);
    const [details, setDetails] = useState(location.state.details);
    const [viewType, setViewType] = useState(location.state.viewType);
    const [missingData, setMissingData] = useState(false);
    const [useMap, setUseMap] = useState(location.state.useGoogleMap);
    

    const handleCombineClick = () => {
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewCombine", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewCombine", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : ""
                }
            })
        }
    }

    const handleFilterClick = () => {
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId) {
            navigate("/viewFilter", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    viewId: location.state.viewId
                }
            })
        } else {
            navigate("/viewFilter", {
                state: {
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : ""
                }
            })
        }
    }

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
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    viewId: location.state.viewId,
                    whereFrom: "/viewEdit"
                }
            });
        } else {
            navigate("/entryView", {
                state: {
                    currentEntry: entriesArray[clickedIndex],
                    title: title,
                    details: details,
                    entriesArray: entriesArray,
                    viewType: viewType,
                    useGoogleMap: useMap,
                    googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                    googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                    googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                    googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                    whereFrom: "/viewEdit"
                }
            });
        }
    }

    const removeClickedIndex = (close) => {
        const copiedArray = [...entriesArray];
        copiedArray.splice(clickedIndex,1);
        setEntriesArray(copiedArray);
        close();
    }

    const saveView = async () => {
        const entryIDs = entriesArray.map((entry)=>entry._id);
        let body = {
            title: title,
            details: details,
            entries: entryIDs,
            viewType: viewType,
            useGoogleMap: useMap,
            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : ""
        }
        if(title===""){
            setMissingData(true);
            return;
        }
        else
            setMissingData(false);
        console.log(location.state);
        if (location.state.viewId) {   // Then update current view (will have viewId if coming from savedView, not if new)
            body.viewId = location.state.viewId;
            try{
                const response = await axios.post("http://localhost:5000/api/v1/view/updateView", body, { withCredentials: true })
                if (response && response.data) {
                    // Must keep the viewID in state if this is a view to update
                    navigate("/savedView", {
                        state: {
                            title: title,
                            details: details,
                            entriesArray: entriesArray,
                            viewType: viewType,
                            useGoogleMap: useMap,
                            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                            viewId: response.data._id
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
                    // Must keep the viewID in state if this is a view to update
                    navigate("/savedView", {
                        state: {
                            title: title,
                            details: details,
                            entriesArray: entriesArray,
                            viewType: viewType,
                            useGoogleMap: useMap,
                            googleMapCenterLat: useMap ? mapRef.current?.getCenter().lat() : "",
                            googleMapCenterLng: useMap ? mapRef.current?.getCenter().lng() : "",
                            googleMapZoom: useMap ? mapRef.current?.getZoom() : "",
                            googleMapTypeId: useMap ? mapRef.current?.getMapTypeId() : "",
                            viewId: response.data._id
                        }
                    });
                }
                
            } catch (err) {
                console.log("Something went wrong with group creation");
                console.log(err);
            }
        }
        
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
                            <EntryCardOriginal entry={entry} entriesArray={entriesArray} whenClicked={()=>{clickedIndex=idx}} />
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