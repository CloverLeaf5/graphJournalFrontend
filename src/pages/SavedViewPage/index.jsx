import axios from 'axios';
import { Button, Dialog, Pane, Popover, Select, Table, TextInput } from 'evergreen-ui';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import EntryCardOriginal from './EntryCardOriginal';
import Map from './Map';
import "./quill.bubble.css";

const SavedViewPage = () => {

    let clickedIndex;

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state.entriesArray);
    const [title, setTitle] = useState(location.state.title);
    const [details, setDetails] = useState(location.state.details);
    const [viewType, setViewType] = useState(location.state.viewType);
    const [useMap, setUseMap] = useState(location.state.useGoogleMap);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    const viewEntryAtClickedIndex = (close) => {
        close();
        navigate("/entryView", {
            state: {
                currentEntry: entriesArray[clickedIndex],
                title: title,
                details: details,
                entriesArray: entriesArray,
                viewType: viewType,
                useGoogleMap: useMap,
                googleMapCenterLat: location.state.googleMapCenterLat,
                googleMapCenterLng: location.state.googleMapCenterLng,
                googleMapZoom: location.state.googleMapZoom,
                googleMapTypeId: location.state.googleMapTypeId,
                viewId: location.state.viewId,
                whereFrom: "/savedView"
            }
        });
    }


    const handleEditView = () => {
        navigate("/viewEdit", {
            state: {
                title: location.state.title,
                details: location.state.details,
                entriesArray: location.state.entriesArray,
                viewType: location.state.viewType,
                useGoogleMap: location.state.useGoogleMap,
                googleMapCenterLat: location.state.googleMapCenterLat,
                googleMapCenterLng: location.state.googleMapCenterLng,
                googleMapZoom: location.state.googleMapZoom,
                googleMapTypeId: location.state.googleMapTypeId,
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
                            <EntryCardOriginal entry={entry} entriesArray={entriesArray} whenClicked={()=>{clickedIndex=idx}} />
                        </Pane>
                    </Popover>
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