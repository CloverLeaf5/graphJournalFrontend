import { Table, TextInput } from 'evergreen-ui';
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import "./quill.snow.css";

const ViewEditPage = () => {

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    const location = useLocation();
    const [entriesArray, setEntriesArray] = useState(location.state);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const handleEntryClick = (clickedIndex) => {
        console.log(clickedIndex)
    }

    return (
        <div>
            <BasicLayout>
                <label>View Title</label>
                <TextInput placeholder='View Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label>View Details</label>
                <ReactQuill theme="snow" value={details} onChange={setDetails} />
            </BasicLayout>
            <div className="entry-table">
                <h2>List of Entries (click to edit or delete)</h2>
                <Table.Head>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Date</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Type</Table.TextCell>
                    <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Title</Table.TextCell>
                </Table.Head>
                <Table.Body>
                    {entriesArray.map((entry, idx) => 
                        <Table.Row key={idx} isSelectable={true} onSelect={()=>handleEntryClick(idx)}>
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
                    )}
                </Table.Body>
            </div>
        </div>
    )
}

export default ViewEditPage