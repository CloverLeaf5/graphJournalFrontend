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

    const handleChange = (e) => {
        setTagName(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        postData({title: tagName})
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
                <input type='submit' value='Save Tag' />
            </form>
        </>
    )
}

export default TagForm