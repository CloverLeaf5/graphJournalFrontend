import { TextInputField } from 'evergreen-ui';
import React from 'react'
import BasicLayout from '../../layouts/BasicLayout';
import ReactQuill from 'react-quill';
import "./quill.snow.css";

const EntryDetailsForm = (props) => {

    const { formFields, setFormFields } = props;

    const entryType = props.entryType;

    ///////////////////////////////////////////////////////////////////////////////////
    // Eventually will conditionally render the form depending on the type.
    // Check if the type was accounted for, otherwise will need to render a default form
    const knownTypes = [
        "journalEntry", "thought", "otherNote", "movie", "show", 
        "song", "album", "band", "book", "restaurant", "trip", 
        "relationship", "friendship", "childhoodMilestones", "pet", 
        "job", "residence", "school", "eventWedding", "eventSports", 
        "eventConcert", "eventParty", "eventSomeoneElse", 
        "achievementOrAward", "majorPurchase", "lifeEvent", "picture", 
        "ticket", "financialAccount"
    ];

    let unknownType = true;
    let foundType = knownTypes.find((knownType) => {
        return knownType === entryType;
    });

    if (foundType) unknownType = false;

    ////////////////////////////////////////////////////////////////////////////////
    
    const handleFormChange = (e) => {
        setFormFields((prevState) => {
            return {...prevState, [e.target.name]: e.target.value};
        })
    }


    const handlePictureChange = (e) => {
        props.setPictureField(e.target.value);
    }

    
    return (
        <BasicLayout>
            <h4>{entryType.text} Details:</h4>
            <TextInputField
                    name='startDate'
                    label='Start Date (or only date). Approximate ok'
                    type='date'
                    value={formFields.startDate}
                    onChange={handleFormChange} />
            <TextInputField
                    name='endDate'
                    label='End Date (if applicable)'
                    type='date'
                    value={formFields.endDate}
                    onChange={handleFormChange} />
            <TextInputField
                    name='title'
                    label='Title of Entry'
                    placeholder='Title'
                    value={formFields.title}
                    onChange={handleFormChange} />
            <label>Details</label>
            <ReactQuill theme="snow" value={props.quillArea} onChange={props.setQuillArea} />
            <TextInputField
                    name='location'
                    label='Location of Entry (if applicable)'
                    placeholder='Location'
                    value={formFields.location}
                    onChange={handleFormChange} />
            <TextInputField
                    name='time'
                    label='Approximate time (if applicable) in military time'
                    placeholder='####'
                    value={formFields.time}
                    onChange={handleFormChange} /> 
            <TextInputField
                    name='picture'
                    label='AWS S3 image key at s3://graph-journal'
                    placeholder='Picture Key'
                    value={props.pictureField}
                    onChange={handlePictureChange} /> 
        </BasicLayout>
    )
}

export default EntryDetailsForm