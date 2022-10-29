import axios from 'axios';
import { Button, Popover, Select, Table, TextInput } from 'evergreen-ui';
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import "./quill.snow.css";

const ViewEditPage = () => {

    let clickedIndex;

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state.entriesArray);
    const [title, setTitle] = useState(location.state.title);
    const [details, setDetails] = useState(location.state.details);
    const [viewType, setViewType] = useState("table")

    const handleCombineClick = () => {
        navigate("/viewCombine", {
            state: {
                title: title,
                details: details,
                entriesArray: entriesArray
            }
        })
    }

    const handleFilterClick = () => {
        navigate("/viewFilter", {
            state: {
                title: title,
                details: details,
                entriesArray: entriesArray
            }
        })
    }

    const removeClickedIndex = (close) => {
        const copiedArray = [...entriesArray]
        copiedArray.splice(clickedIndex,1)
        setEntriesArray(copiedArray)
        close()
    }

    const saveView = async () => {
        const entryIDs = entriesArray.map((entry)=>entry._id);
        const body = {
            title: title,
            details: details,
            entries: entryIDs,
            viewType: viewType
        }
        try{
            const response = await axios.post("http://localhost:5000/api/v1/view/saveView", body, { withCredentials: true })
            if (response && response.data) {
                navigate("/savedView", {
                    state: {
                        title: title,
                        details: details,
                        entries: entriesArray,
                        viewType: viewType
                    }
                });
            }
            
        } catch (err) {
            console.log("Something went wrong with group creation");
            console.log(err);
        }
        
    }

    return (
        <div>
            <BasicLayout>
                <label>View Title</label>
                <TextInput placeholder='View Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label>View Details</label>
                <ReactQuill theme="snow" value={details} onChange={setDetails} />
                <div>
                    <Button onClick={handleCombineClick}>Combine With Another Search</Button>
                    <Button onClick={handleFilterClick}>Filter Out Entries</Button>
                </div>
                <label>Select a View Type</label>
                <Select value={viewType} onChange={e=>setViewType(e.target.value)}>
                    <option value="table">Table</option>
                    <option value="traditional">Traditional</option>
                    <option value="timeline">Timeline</option>
                </Select>
            </BasicLayout>
            {viewType==="table" && <div className="entry-table">
                <h2>List of Entries (click to edit or delete)</h2>
                <Table.Head>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Date</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Type</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Title</Table.TextCell>
                </Table.Head>
                <Table.Body>
                    {entriesArray.map((entry, idx) => 
                        <Popover key={idx} content={({ close }) => (
                            <BasicLayout>
                                <Button onClick={()=>removeClickedIndex(close)}>Remove from View</Button>
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
            <BasicLayout>
                <Button onClick={saveView}>Save View</Button>
                <Link to="/dashboard">Go Back</Link>
            </BasicLayout>
        </div>
    )
}

export default ViewEditPage