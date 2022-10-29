import { TextInputField } from 'evergreen-ui'
import React from 'react'

const TagEditForm = (props) => {

    const { tagName, setTagName } = props;
    const { tagDetails, setTagDetails } = props;
    const { tagPicture, setTagPicture } = props;

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
        props.submitChanges();
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
                <input type='submit' value='Submit Changes' />
            </form>
        </>
    )
}

export default TagEditForm