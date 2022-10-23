import React from 'react'
import { Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import TagForm from './TagForm'

const TagEntryPage = () => {
    
    
    return (
        <BasicLayout>
            <h2>Input a new Tag</h2>
            <h6>Not everything needs a tag, some things are built in.</h6>
            <h6>Tags are best for combining input types.</h6>
            <TagForm/>
            <Link to="/dashboard">Go Back</Link>
        </BasicLayout>
    )
}

export default TagEntryPage