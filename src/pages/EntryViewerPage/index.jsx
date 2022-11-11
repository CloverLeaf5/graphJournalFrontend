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
    const [moreImages, setMoreImages] = useState([]);

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
                } catch (err) {
                    console.log("Something went wrong with getting the first picture from AWS S3");
                    console.log(err);
                }
            } else {
                setImageSource("journal.png")
            }
        }
        // If there are more pictures for this entry in AWS
        const setOtherImages = async () => {
            if (entry.whichImage===1 && entry.pictures.length>1){
                // Get the image links for each one
                let photoLinksArray = [];
                try {
                    entry.pictures.map(async (picture, idx) => {
                        if (idx>0){ // We don't need to get the first picture again
                            const response = await axios
                                .post("http://localhost:5000/api/v1/entry/getAWSPhotoURL", {s3Key: picture.location}, { withCredentials: true })
                            if (response && response.data){
                                photoLinksArray.push(response.data);
                            }
                        }
                    })
                    setMoreImages(photoLinksArray);
                } catch (err) {
                    console.log("Something went wrong with getting the rest of the pictures from AWS S3");
                    console.log(err);
                }
            }
        }

        setImage();
        setOtherImages();
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
                <img onLoad={onImgLoad} src={imageSource} style={imageSource!=="journal.png" ? {height: "300px"} : {height: "150px"}} alt="Main photo for this entry"></img>
                {entry.pictures[0] && entry.pictures[0].caption.length>0 && <h5>{entry.pictures[0].caption}</h5>}
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
                {moreImages.length>0 && <h3>Other Pictures:</h3>}
                {moreImages.map((imageLink, idx) => 
                    <div key={idx}>
                        <img src={imageLink} style={{maxWidth: "300px", maxHeight: "300px"}} alt="Additional image for this entry"></img>
                        {entry.pictures[idx+1].caption.length>0 && <h5>{entry.pictures[idx+1].caption}</h5>}
                    </div>
                )}
                {entry.useAPILocation && entry.APILocationString && <h3>{entry.APILocationString}</h3>}
                {entry.useAPILocation && <Map entry={entry} />}
            </div>


            : <div>
                <img onLoad={onImgLoad} src={imageSource} style={{width: "300px"}} alt="Main photo for this entry"></img>
                {entry.pictures[0] && entry.pictures[0].caption.length>0 && <h5>{entry.pictures[0].caption}</h5>}
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
                {moreImages.length>0 && <h4>Other Pictures:</h4>}
                {moreImages.map((imageLink, idx) => 
                    <div key={idx}>
                        <img src={imageLink} style={{maxWidth: "300px", maxHeight: "300px"}} alt="Additional image for this entry"></img>
                        {entry.pictures[idx+1].caption.length>0 && <h5>{entry.pictures[idx+1].caption}</h5>}
                    </div>
                )}
                {entry.useAPILocation && entry.APILocationString && <h3>{entry.APILocationString}</h3>}
                {entry.useAPILocation && <Map entry={entry} />}
            </div>}
            <Button onClick={handleGoBack}>Go Back</Button>
        </div>
        
        
    )
}

export default EntryViewerPage