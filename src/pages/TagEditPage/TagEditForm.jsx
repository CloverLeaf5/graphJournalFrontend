import { TextInputField } from 'evergreen-ui'
import React from 'react'

const TagEditForm = (props) => {

    const { tagName, setTagName } = props;

    const handleChange = (e) => {
        setTagName(e.target.value);
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
                <input type='submit' value='Submit Changes' />
            </form>
        </>
    )
}

export default TagEditForm