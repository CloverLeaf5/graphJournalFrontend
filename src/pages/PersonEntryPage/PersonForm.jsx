import axios from 'axios';
import { TextInputField } from 'evergreen-ui'
import React, { useState } from 'react'


const postData = async (body) => {
    await axios
    .post("http://localhost:5000/api/v1/person/newPerson", body, { withCredentials: true })
    .catch((err) => {
        console.log("Something went wrong with person creation");
    });
}


const PersonForm = () => {

    const [personDetails, setPersonDetails] = useState({
        title: "",
        details: "",
        picture: ""
    });

    const handleChange = (e) => {
        setPersonDetails({
            ...personDetails,
            [e.target.name]: e.target.value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        postData(personDetails)
        .then(() => setPersonDetails({
            title: "",
            details: "",
            picture: ""
        }));
    }

    return (
        <>
            <form className='person-form' onSubmit={submitForm}>
                <TextInputField
                    name='title'
                    label='Person Name (full name recommended to keep them unique)'
                    placeholder='Person Name...'
                    value={personDetails.title}
                    onChange={handleChange} />
                <TextInputField
                    name='details'
                    label='Optional details (like relation, etc.)'
                    placeholder='Details...'
                    value={personDetails.details}
                    onChange={handleChange} />
                <TextInputField
                    name='picture'
                    label='AWS S3 image key at s3://graph-journal'
                    placeholder='Picture Key'
                    value={personDetails.picture}
                    onChange={handleChange} />
                <input type='submit' value='Save Person' />
            </form>
        </>
    )
}

export default PersonForm