import { TextInputField } from 'evergreen-ui'
import React from 'react'

const PersonEditForm = (props) => {

    const { personName, setPersonName } = props;
    const { personDetails, setPersonDetails } = props;
    const { personPicture, setPersonPicture } = props;

    const handleChange = (e) => {
        setPersonName(e.target.value);
    }

    const handleDetailsChange = (e) => {
        setPersonDetails(e.target.value);
    }

    const handlePictureChange = (e) => {
        setPersonPicture(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.submitChanges();
    }

    return (
        <>
            <form className='person-form' onSubmit={submitForm}>
                <TextInputField
                    name='person-name'
                    label='Person Name'
                    placeholder='Person Name...'
                    value={personName}
                    onChange={handleChange} />
                <TextInputField
                    name='details'
                    label='Optional details (like relation, etc.)'
                    placeholder='Details...'
                    value={personDetails}
                    onChange={handleDetailsChange} />
                <TextInputField
                    name='picture'
                    label='AWS S3 image key at s3://graph-journal'
                    placeholder='Picture Key'
                    value={personPicture}
                    onChange={handlePictureChange} />
                <input type='submit' value='Submit Changes' />
            </form>
        </>
    )
}

export default PersonEditForm