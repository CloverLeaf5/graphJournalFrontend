import axios from 'axios';
import { Button, Dialog, Pane, Popover, Table } from 'evergreen-ui';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import EntryCardOriginal from '../ViewEditPage/EntryCardOriginal';
import EntryDetailedView from '../ViewEditPage/EntryDetailedView';
import Map from './Map';
import "./quill.bubble.css";

const SavedViewPage = () => {

    let clickedIndex;

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state.entriesArray); // The actual entries in the view
    const [entryDisplayTypes, setEntryDisplayTypes] = useState(location.state.entryDisplayTypes) // How each entry is displayed in traditional mode
    const [title, setTitle] = useState(location.state.title); // Title of the view
    const [details, setDetails] = useState(location.state.details); // Quill details
    const [viewType, setViewType] = useState(location.state.viewType); // How the entries are displayed
    const [useMap, setUseMap] = useState(location.state.useGoogleMap); // The Google Map
    const [mostRecentFirst, setMostRecentFirst] = useState(location.state.mostRecentFirst); // The chronological order of displayed entries
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    // Open the single entry viewer page. Send in the relevant state
    const viewEntryAtClickedIndex = (close) => {
        close();
        navigate("/entryView", {
            state: {
                currentEntry: entriesArray[clickedIndex],
                title: title,
                details: details,
                entriesArray: entriesArray,
                entryDisplayTypes: entryDisplayTypes,
                viewType: viewType,
                useGoogleMap: useMap,
                googleMapCenterLat: location.state.googleMapCenterLat,
                googleMapCenterLng: location.state.googleMapCenterLng,
                googleMapZoom: location.state.googleMapZoom,
                googleMapTypeId: location.state.googleMapTypeId,
                mostRecentFirst: mostRecentFirst,
                viewId: location.state.viewId,
                whereFrom: "/savedView" // So that the page knows to return to the saved view page
            }
        });
    }


    // Open the view editor page. Send in the relevant state
    const handleEditView = () => {
        navigate("/viewEdit", {
            state: {
                title: title,
                details: details,
                entriesArray: entriesArray,
                entryDisplayTypes: entryDisplayTypes,
                viewType: viewType,
                useGoogleMap: useMap,
                googleMapCenterLat: location.state.googleMapCenterLat,
                googleMapCenterLng: location.state.googleMapCenterLng,
                googleMapZoom: location.state.googleMapZoom,
                googleMapTypeId: location.state.googleMapTypeId,
                mostRecentFirst: mostRecentFirst,
                viewId: location.state.viewId
            }
        });
    }

    const handleDeleteView = async () => {
        const response = await axios.post("http://localhost:5000/api/v1/view/deleteView", {viewId: location.state.viewId}, {withCredentials: true})
        if (response && response.data) console.log (response.data);
        navigate("/dashboard");
    }

    return (
        <div>
            <BasicLayout>
                {title.length>0 && <h2>{title}</h2>}
                {details.length>0 && <ReactQuill theme="bubble" value={details} readOnly={true} />}
                {useMap && <Map entriesArray={entriesArray}
                                googleMapCenterLat={location.state.googleMapCenterLat}
                                googleMapCenterLng={location.state.googleMapCenterLng}
                                googleMapZoom={location.state.googleMapZoom}
                                googleMapTypeId={location.state.googleMapTypeId} />}
            </BasicLayout>

            {viewType==="table" && <div className="entry-table">
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
                                <Button onClick={close}>Cancel</Button>
                            </BasicLayout>
                            )}>
                            <Table.Row key={idx} isSelectable={true} onSelect={()=>{clickedIndex=idx}}>
                                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                                    {entry.startDate}
                                </Table.TextCell>
                                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                                    {entry.type}
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
                {entriesArray.map((entry, idx) => 
                    <Popover key={idx} content={({ close }) => (
                        <BasicLayout>
                            <Button onClick={()=>viewEntryAtClickedIndex(close)}>View Entry</Button>
                            <Button onClick={close}>Cancel</Button>
                        </BasicLayout>
                        )}>
                        <Pane style={{width:'max-content'}}>
                        {entryDisplayTypes[idx] === "default" && <EntryCardOriginal entry={entry} entriesArray={entriesArray} whenClicked={()=>{clickedIndex=idx}} />}
                        </Pane>
                    </Popover>
                )}
            </div>}

            {viewType==="detailed" && <div className="detailed">
                <h2>List of Entries</h2>
                {entriesArray.map((entry, idx) => 
                    <div>
                        <EntryDetailedView key={idx} entry={entry} entriesArray={entriesArray} orderChange={mostRecentFirst} />
                        {idx<entriesArray.length && <hr/>}
                    </div>
                )}
            </div>}

            <Button intent="danger" onClick={()=>setShowDeleteDialog(true)}>Delete this View</Button>
            <Dialog
                isShown={showDeleteDialog}
                title="Confirm Delete View"
                intent="danger"
                onCloseComplete={() => {
                    setShowDeleteDialog(false);
                    handleDeleteView();}}
                confirmLabel="Delete">
            Are you sure you want to delete this View? This cannot be undone.
            </Dialog>
            <Button onClick={handleEditView}>Edit this View</Button>
            <Link to="/dashboard">Go Home</Link>
        </div>
        
    )
}

export default SavedViewPage