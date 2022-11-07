import { Button, Checkbox, TextInput, TextInputField } from 'evergreen-ui';
import React from 'react'
import BasicLayout from '../../layouts/BasicLayout';
import ReactQuill from 'react-quill';
import "./quill.snow.css";

const EntryDetailsForm = (props) => {

    const { formFields, setFormFields, pictureFields, setPictureFields, metricsArray, setMetricsArray, showObject } = props;

    const entryType = props.entryType;

    ///////////////////////////////////////////////////////////////////////////////////
    // Eventually will conditionally render the form depending on the type.
    // Check if the type was accounted for, otherwise will need to render a default form
    // const knownTypes = [
    //     "journalEntry", "thought", "otherNote", "movie", "show", 
    //     "song", "album", "band", "book", "restaurant", "trip", 
    //     "relationship", "friendship", "childhoodMilestones", "pet", 
    //     "job", "residence", "school", "eventWedding", "eventSports", 
    //     "eventConcert", "eventParty", "eventSomeoneElse", 
    //     "achievementOrAward", "majorPurchase", "lifeEvent", "picture", 
    //     "ticket", "financialAccount"
    // ];

    // let unknownType = true;
    // let foundType = knownTypes.find((knownType) => {
    //     return knownType === entryType;
    // });

    // if (foundType) unknownType = false;

    ////////////////////////////////////////////////////////////////////////////////
    
    const handleFormChange = (e) => {
        setFormFields((prevState) => {
            return {...prevState, [e.target.name]: e.target.value};
        })
    }

    const handleMetricsNameChange = (e, idx) => {
        const allMetrics = [...metricsArray];
        allMetrics[idx].name = e.target.value;
        setMetricsArray(allMetrics);
    }

    const handleMetricsDataChange = (e, idx) => {
        const allMetrics = [...metricsArray];
        allMetrics[idx].data = e.target.value;
        setMetricsArray(allMetrics);
    }

    const addMetric = () => {
        setMetricsArray([...metricsArray, {name: "", data: ""}])
    }

    const removeMetric = () => {
        const shortenedArray = metricsArray.slice(0,metricsArray.length-1);
        setMetricsArray(shortenedArray);
    }

    const handlePictureLocationChange = (e, idx) => {
        const allPictures = [...pictureFields];
        allPictures[idx].location = e.target.value;
        setPictureFields(allPictures);
    }

    const handlePictureCaptionChange = (e, idx) => {
        const allPictures = [...pictureFields];
        allPictures[idx].caption = e.target.value;
        setPictureFields(allPictures);
    }

    const addPicture = () => {
        setPictureFields([...pictureFields, {location: "", caption: ""}])
    }

    const removePicture = () => {
        const shortenedArray = pictureFields.slice(0,pictureFields.length-1);
        setPictureFields(shortenedArray);
    }

    
    return (
        <BasicLayout>
            <h4>{entryType.text} Details:</h4>
            <TextInputField
                    name='startDate'
                    label='Start Date (or only date). Approximate ok'
                    type='date'
                    required
                    value={formFields.startDate}
                    onChange={handleFormChange}
                    isInvalid={showObject.requiredData} />
            <TextInputField
                    name='endDate'
                    label='End Date (if applicable)'
                    type='date'
                    value={formFields.endDate}
                    onChange={handleFormChange} />
            <TextInputField
                    name='time'
                    label='Approximate time in military time - only numbers are stored! Recommended and used for sorting'
                    placeholder='####'
                    value={formFields.time}
                    onChange={handleFormChange} />
            <TextInputField
                    name='title'
                    label='Title of Entry'
                    placeholder='Title'
                    required
                    value={formFields.title}
                    onChange={handleFormChange}
                    isInvalid={showObject.requiredData} />
            <TextInputField
                    name='subtitle'
                    label='Subtitle (or Author Name, etc.)'
                    placeholder='Subtitle'
                    value={formFields.subtitle}
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
                    name='rating'
                    label='Rating (1-5) - only numbers are stored!'
                    placeholder='#'
                    value={formFields.rating}
                    onChange={handleFormChange} /> 
            <div className='checkboxes'>
                <Checkbox label="Important or Star"
                            checked={props.booleans.isStarred}
                            onChange={e=>props.setBooleans({...props.booleans, isStarred: e.target.checked})} />
                <Checkbox label="Big Achievement"
                            checked={props.booleans.isAchievement}
                            onChange={e=>props.setBooleans({...props.booleans, isAchievement: e.target.checked})} />
            </div>
            <label>Enter metrics that you would like to track across entries. Keep the name consistent!</label>
            {metricsArray.map((metric, idx) => 
                <div key={idx}>
                    <TextInput placeholder='Metric Name' value={metric.name} onChange={(e) => handleMetricsNameChange(e,idx)} />
                    <TextInput placeholder='Metric Data (Numeric Only!)' value={metric.data} onChange={(e)=> handleMetricsDataChange(e,idx)} />
                </div>
            )}
            <Button onClick={addMetric}>Add Metric</Button>
            {metricsArray.length > 0 && <Button onClick={removeMetric}>Remove Metric</Button>}
            <label>Enter pictures as AWS S3 image key at s3://graph-journal. Caption is optional</label>
            {pictureFields.map((picture, idx) => 
                <div key={idx}>
                    <TextInput placeholder='Picture Key' value={picture.location} onChange={(e) => handlePictureLocationChange(e,idx)} />
                    <TextInput placeholder='Picture Caption' value={picture.caption} onChange={(e)=> handlePictureCaptionChange(e,idx)} />
                </div>
            )}
            <Button onClick={addPicture}>Add Picture</Button>
            {pictureFields.length > 0 && <Button onClick={removePicture}>Remove Picture</Button>}
        </BasicLayout>
    )
}

export default EntryDetailsForm