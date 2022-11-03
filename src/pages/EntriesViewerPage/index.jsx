import axios from 'axios';
import { Table } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const EntriesViewerPage = () => {

    const [entriesArray, setEntriesArray] = useState([]);
    const [loading, setloading] = useState(true);

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/entry/getEntries", { withCredentials: true })
                if (response && response.data){
                    const data = response.data;
                    for (const entry of data){
                        entry.startDate = entry.startDate.slice(0,10)
                        if (entry.endDate) entry.endDate = entry.endDate.slice(0,10)
                    }
                    setEntriesArray(data);
                }
                setloading(false);
            } catch(err) {
                // console.log("Something went wrong with getting the Entries");
                console.log(err);
            }
        }
        fetchData();
    }, [])


    const handleEntryClick = (clickedIndex) => {
        navigate("/entryEdit", {
            state: entriesArray[clickedIndex]
        })
    }


    if (loading) return <div>Loading...</div>

    return (
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
                            {entry.typeText}
                        </Table.TextCell>
                        <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                            {entry.title}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
            <Link to="/dashboard">Go Home</Link>
        </div>

    )
}

export default EntriesViewerPage