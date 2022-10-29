import axios from 'axios';
import { TextInputField } from 'evergreen-ui'
import React, { useState } from 'react'


const postData = async (body) => {
    const response = await axios
    .post("http://localhost:5000/api/v1/tag/newTag", body, { withCredentials: true })
    .catch((err) => {
        console.log("Something went wrong with tag creation");
    });

    console.log("Response: ", response);
}


const TagForm = () => {

    const [tagName, setTagName] = useState("");
    const [tagDetails, setTagDetails] = useState("");
    const [tagPicture, setTagPicture] = useState("");

    const handleChange = (e) => {
        setTagName(e.target.value);
    }

    const handleDetailsChange = (e) => {
        setTagDetails(e.target.value);
    }

    const handlePictureChange = (e) => {
        setTagPicture(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        postData({title: tagName, details: tagDetails, picture: tagPicture})
        .then(() => setTagName(""));
    }

    return (
        <>
            <form className='tag-form' onSubmit={submitForm}>
                <TextInputField
                    name='tag-name'
                    label='Tag Name'
                    placeholder='Tag Name...'
                    value={tagName}
                    onChange={handleChange} />
                <TextInputField
                    name='tag-details'
                    label='Tag Details (Optional, something about the tag)'
                    placeholder='Tag Details...'
                    value={tagDetails}
                    onChange={handleDetailsChange} />
                <TextInputField
                    name='tag-picture'
                    label='AWS S3 image key at s3://graph-journal'
                    placeholder='Picture Key'
                    value={tagPicture}
                    onChange={handlePictureChange} />
                <input type='submit' value='Save Tag' />
            </form>
        </>
    )
}

export default TagForm