import { TextInputField } from 'evergreen-ui'
import React from 'react'

const PersonEditForm = (props) => {

    const { personName, setPersonName } = props;

    const handleChange = (e) => {
        setPersonName(e.target.value);
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
                <input type='submit' value='Submit Changes' />
            </form>
        </>
    )
}

export default PersonEditForm