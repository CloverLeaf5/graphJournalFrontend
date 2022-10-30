import axios from 'axios';
import { Table } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SavedViewsListPage = () => {

    const [savedViewsArray, setSavedViewsArray] = useState([]);
    const [loading, setloading] = useState(true);

    const navigate = useNavigate();

    const CELL_WIDTH = 300;

    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/view/getSavedViews", { withCredentials: true })
                if (response && response.data){
                    const data = response.data;
                    for (const view of data){
                        view.createdAt = view.createdAt.slice(0,10)
                    }
                    setSavedViewsArray(data);
                }
                setloading(false);
            } catch(err) {
                // console.log("Something went wrong with getting the Entries");
                console.log(err);
            }
        }
        fetchData();
    }, [])


    const handleViewClick = (clickedIndex) => {
        navigate("/savedView", {
            state: {
                title: savedViewsArray[clickedIndex].title,
                details: savedViewsArray[clickedIndex].details,
                entries: savedViewsArray[clickedIndex].entries,
                viewType: savedViewsArray[clickedIndex].title.viewType
            }
        });
    }


    if (loading) return <div>Loading...</div>

    return (
        <div className="view-table">
            <h2>List of Views (click to view)</h2>
            <Table.Head>
                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Created Date</Table.TextCell>
                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Title</Table.TextCell>
                <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>Number of entries</Table.TextCell>
            </Table.Head>
            <Table.Body>
                {savedViewsArray.map((view, idx) => 
                    <Table.Row key={idx} isSelectable={true} onSelect={()=>handleViewClick(idx)}>
                        <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                            {view.createdAt}
                        </Table.TextCell>
                        <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                            {view.title}
                        </Table.TextCell>
                        <Table.TextCell flexBasis={CELL_WIDTH} flexShrink={0} flexGrow={0}>
                            {view.entries.length}
                        </Table.TextCell>
                    </Table.Row>
                )}
            </Table.Body>
        </div>

    )
}

export default SavedViewsListPage