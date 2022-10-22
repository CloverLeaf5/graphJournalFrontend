import React from 'react'
import { Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import PersonForm from './PersonForm'


const PersonEntryPage = () => {
    
    return (
        <BasicLayout>
            <h2>Input a new Person</h2>
            <PersonForm />
            <Link to="/dashboard">Go Back</Link>
        </BasicLayout>
    )
}

export default PersonEntryPage