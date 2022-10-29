import axios from 'axios';
import { Button, Dialog } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import TagEditForm from './TagEditForm';
import TagTable from './TagTable';

const TagEditPage = () => {
    
    const [tagsArray, setTagsArray] = useState([]);
    const [tagIndex, setTagIndex] = useState(-1);
    const [tagName, setTagName] = useState("");
    const [tagDetails, setTagDetails] = useState("");
    const [tagPicture, setTagPicture] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/tag/getTags", { withCredentials: true })
                if (response && response.data){
                    setTagsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Tags");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idxClicked) => {
        setTagIndex(idxClicked);
        setTagName(tagsArray[idxClicked].title);
    }

    const submitChanges = async () => {
        await axios.post("http://localhost:5000/api/v1/tag/updateTag", {
                        tagId: tagsArray[tagIndex]._id,
                        title: tagName,
                        details: tagDetails,
                        picture: tagPicture},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }

    const deleteTag = async () => {
        await axios.post("http://localhost:5000/api/v1/tag/deleteTag", 
                        {tagId: tagsArray[tagIndex]._id},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }
    
    return (
        <BasicLayout>
            <h2>Select a Tag to edit or delete</h2>
            <TagTable tagsArray={tagsArray} handleClick={(idx)=>handleClick(idx)}/>
            {(tagIndex>=0) && <TagEditForm tagName={tagName}
                                        setTagName={setTagName}
                                        submitChanges={submitChanges}
                                        tagDetails={tagDetails}
                                        setTagDetails={setTagDetails}
                                        tagPicture={tagPicture}
                                        setTagPicture={setTagPicture} />}
            {(tagIndex>=0) && <Button intent="danger" onClick={()=>setShowDeleteDialog(true)}>Delete Tag</Button>}
            <Dialog
                isShown={showDeleteDialog}
                title="Confirm Delete Tag"
                intent="danger"
                onCloseComplete={() => {
                    setShowDeleteDialog(false);
                    deleteTag();}}
                confirmLabel="Delete">
            Are you sure you want to delete this tag? This cannot be undone and will affect any entries using this tag.
            </Dialog>
            <Link to="/dashboard">Go Back (Nothing will be changed)</Link>
        </BasicLayout>
    )
}

export default TagEditPage