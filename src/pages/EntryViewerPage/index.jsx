import axios from 'axios';
import { Button, Table } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from './Map';
import "./quill.bubble.css";

const EntryViewerPage = () => {

    const TABLE_WIDTH = 300;

    const navigate = useNavigate();
    const location = useLocation();
    const entry = location.state.currentEntry

    const [imageSource, setImageSource] = useState("loading.png")
    const [quillArea, setQuillArea] = useState("");
    const [imgDims, setImgDims] = useState({height:"100px",
                                            width:"100px"})

    useEffect(() => {
        const setImage = async () => {
            if (entry.whichImage===2){
                setImageSource(`${entry.APIImageDBPath}${entry.APIImagePath}`)
            } else if (entry.whichImage===1){
                try {
                    const response = await axios
                        .post("http://localhost:5000/api/v1/entry/getAWSPhotoURL", {s3Key: entry.pictures[0].location}, { withCredentials: true })
                    if (response && response.data){
                        setImageSource(response.data);
                    }
                }catch (err) {
                    console.log("Something went wrong with getting picture(s) from AWS S3");
                    console.log(err);
                }
            } else {
                setImageSource("journal.png")
            }
        }
        setImage()
        if (entry.details) setQuillArea(entry.details);
    }, [])

    const onImgLoad = ({target:img}) => {
        setImgDims({height:img.offsetHeight, width:img.offsetWidth});
    }

    const handleGoBack = () => {
        // Must keep the viewID in state if this is a view to update
        if (location.state.viewId){
            navigate(location.state.whereFrom, {
                state: {
                    title: location.state.title,
                    details: location.state.details,
                    entriesArray: location.state.entriesArray,
                    entryDisplayTypes: location.state.entryDisplayTypes,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    mostRecentFirst: location.state.mostRecentFirst,
                    viewId: location.state.viewId
                }
            });
        } else {
            navigate(location.state.whereFrom, {
                state: {
                    title: location.state.title,
                    details: location.state.details,
                    entriesArray: location.state.entriesArray,
                    entryDisplayTypes: location.state.entryDisplayTypes,
                    viewType: location.state.viewType,
                    useGoogleMap: location.state.useGoogleMap,
                    googleMapCenterLat: location.state.googleMapCenterLat,
                    googleMapCenterLng: location.state.googleMapCenterLng,
                    googleMapZoom: location.state.googleMapZoom,
                    googleMapTypeId: location.state.googleMapTypeId,
                    mostRecentFirst: location.state.mostRecentFirst
                }
            });
        }
        
    }
    

    return (
        <div className='entry-div'>
            {imgDims.height>=imgDims.width ? <div>
                <img onLoad={onImgLoad} src={imageSource} style={imageSource!=="journal.png" ? {height: "300px"} : {height: "150px"}}></img>
                <h4>{entry.startDate}</h4>
                {entry.endDate && entry.endDate.length>0 && <h4>End Date: {entry.endDate}</h4>}
                <h4>Type: {entry.typeText}</h4>
                <h2>{entry.title}</h2>
                {entry.subtitle && entry.subtitle.length>0 && <h3>{entry.subtitle}</h3>}
                {entry.isStarred && <img src="star.png" alt="Star icon" style={{height: "100px"}} />}
                {entry.isAchievement && <img src="trophy.png" alt="Trophy icon" style={{height: "100px"}} />}
                <div className="tag-table">
                    {entry.tags.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Tags</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.tags.map((tag, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {tag.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="person-table">
                    {entry.people.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.people.map((person, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {person.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="group-table">
                    {entry.groups.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Groups</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.groups.map((group, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {group.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                {quillArea.length>0 && <ReactQuill theme="bubble" value={quillArea} readOnly={true} />}
                {entry.location && entry.location.length>0 && <h5>Location: {entry.location}</h5>}
                {entry.rating && entry.rating.length>0 && <h5>Rating {entry.rating}</h5>}
                {entry.approxTime && entry.approxTime.length>0 && <h5>Time: {entry.approxTime}</h5>}
                {entry.metrics.length>0 && <h5>Stored Metrics:</h5>}
                {entry.metrics.map((metric, idx) => 
                    <div key={idx}>
                        <label>{metric.name}</label>
                        <h6>{metric.data}</h6>
                    </div>
                )}
                {entry.useAPILocation && entry.APILocationString && <h4>{entry.APILocationString}</h4>}
                {entry.useAPILocation && <Map entry={entry} />}
            </div>


            : <div>
                <img onLoad={onImgLoad} src={imageSource} style={{width: "300px"}}></img>
                <h4>{entry.startDate}</h4>
                {entry.endDate && entry.endDate.length>0 && <h4>End Date: {entry.endDate}</h4>}
                <h2>{entry.title}</h2>
                {entry.subtitle && entry.subtitle.length>0 && <h3>{entry.subtitle}</h3>}
                {entry.isStarred && <img src="star.png" alt="Star icon" style={{height: "100px"}} />}
                {entry.isAchievement && <img src="trophy.png" alt="Trophy icon" style={{height: "100px"}} />}
                <div className="tag-table">
                    {entry.tags.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Tags</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.tags.map((tag, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {tag.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="person-table">
                    {entry.people.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>People</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.people.map((person, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {person.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                <div className="group-table">
                    {entry.groups.length > 0 && <Table.Head>
                        <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>Groups</Table.TextCell>
                    </Table.Head>}
                    <Table.Body>
                        {entry.groups.map((group, idx) => 
                            <Table.Row key={idx} isSelectable={false} >
                                <Table.TextCell flexBasis={TABLE_WIDTH} flexShrink={0} flexGrow={0}>
                                    {group.title}
                                </Table.TextCell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </div>
                {quillArea.length>0 && <ReactQuill theme="bubble" value={quillArea} readOnly={true} />}
                {entry.location && entry.location.length>0 && <h5>Location: {entry.location}</h5>}
                {entry.rating && entry.rating.length>0 && <h5>Rating {entry.rating}</h5>}
                {entry.approxTime && entry.approxTime.length>0 && <h5>Time: {entry.approxTime}</h5>}
                {entry.metrics.length>0 && <h5>Stored Metrics:</h5>}
                {entry.metrics.map((metric, idx) => 
                    <div key={idx}>
                        <label>{metric.name}</label>
                        <h6>{metric.data}</h6>
                    </div>
                )}
                {entry.useAPILocation && entry.APILocationString && <h4>{entry.APILocationString}</h4>}
                {entry.useAPILocation && <Map entry={entry} />}
            </div>}
            <Button onClick={handleGoBack}>Go Back</Button>
        </div>
        
        
    )
}

export default EntryViewerPage