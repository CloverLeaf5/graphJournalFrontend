import axios from 'axios';
import { Button, TextInputField } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import NameCard from './NameCard';

const GroupEntryPage = () => {

    // personNames is an array of objects
    // Want the object.title for the name
    // Later can add accordion or hover details with object.details
    const [personList, setPersonList] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [groupDetails, setGroupDetails] = useState("");
    const [groupPicture, setGroupPicture] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                console.log(response);
                if (response && response.data){
                    setPersonList(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting People");
            }
        }
        fetchData();
    }, []);


    const postData = async (body) => {
        const response = await axios
        .post("http://localhost:5000/api/v1/group/newGroup", body, { withCredentials: true })
        .catch((err) => {
            console.log("Something went wrong with group creation");
        });
    
        console.log("Response: ", response);
    }

    

    const cardClicked = (idx) => {
        let alreadyIn = selectedPeople.find((person) => {
            return person._id === personList[idx]._id;
        });

        if (alreadyIn) return;

        setSelectedPeople([...selectedPeople, personList[idx]])
    } 

    const selectedCardClicked = (idxToRemove) => {
        setSelectedPeople((prevState) => {
            return prevState.filter((person, idx) => {
                return (idx !== idxToRemove)
            })
        });
    }
    
    const handleChange = (e) => {
        setGroupName(e.target.value);
    }

    const handleChangeDetails = (e) => {
        setGroupDetails(e.target.value);
    }

    const handleChangePicture = (e) => {
        setGroupPicture(e.target.value);
    }

    const submitGroup = () => {
        const selectedPeopleIds = selectedPeople.map((person) => person._id);
        postData({
            title: groupName,
            details: groupDetails,
            people: selectedPeopleIds
        })
        .then(() => {
            setSelectedPeople([]);
            setGroupName("");
            setGroupDetails("");
            setGroupPicture("");
        });
    }
    
    return (
        <BasicLayout>
            <h2>Input a new Group</h2>
            {personList.map((person, idx) => <NameCard title={person.title} key={idx} whenClicked={()=>cardClicked(idx)} />)}
            <TextInputField
                    name='title'
                    label='Group Name (Try to make globally unique)'
                    placeholder='Group Name...'
                    value={groupName}
                    onChange={handleChange} />
            <TextInputField
                    name='details'
                    label='Group Details (Optional, something about the group)'
                    placeholder='Group Details...'
                    value={groupDetails}
                    onChange={handleChangeDetails} />
            <TextInputField
                    name='picture'
                    label='AWS S3 image key at s3://graph-journal'
                    placeholder='Picture key'
                    value={groupPicture}
                    onChange={handleChangePicture} />
            {selectedPeople.length>0 && <h5>Selected people:</h5>}
            {selectedPeople.map((person, idx) => <NameCard title={person.title} key={idx} whenClicked={()=>selectedCardClicked(idx)} />)}
            <Button onClick={submitGroup}>Save Group</Button>
            <Link to="/dashboard">Go Back</Link>
        </BasicLayout>
    )
}

export default GroupEntryPage