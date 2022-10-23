import axios from 'axios';
import { Button, Dialog, TextInputField } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import GroupTable from './GroupTable';
import NameCard from './NameCard';
import PeopleInGroupTable from './PeopleInGroupTable';

const GroupEditPage = () => {
    
    const [groupsArray, setGroupsArray] = useState([]);
    const [groupIndex, setGroupIndex] = useState(-1);
    const [groupName, setGroupName] = useState("");
    const [fullPersonList, setFullPersonList] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/group/getGroups", { withCredentials: true })
                if (response && response.data){
                    setGroupsArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the Groups");
            }
            try {
                const response2 = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                if (response2 && response2.data){
                    setFullPersonList(response2.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the People");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idxClicked) => {
        setGroupIndex(idxClicked);
        setGroupName(groupsArray[idxClicked].title);
        setSelectedPeople(groupsArray[idxClicked].people)
        console.log(groupsArray);
    }

    const handleChange = (e) => {
        setGroupName(e.target.value);

    }

    const cardClicked = (idx) => {
        let alreadyIn = selectedPeople.find((person) => {
            return person._id === fullPersonList[idx]._id;
        });
        if (alreadyIn) return;

        setSelectedPeople([...selectedPeople, fullPersonList[idx]])
    } 

    const personInGroupClick = (idxToRemove) => {
        setSelectedPeople((prevState) => {
            return prevState.filter((person, idx) => {
                return (idx !== idxToRemove)
            })
        });
    }

    const submitChanges = async () => {
        const selectedPeopleIds = selectedPeople.map((person) => person._id);
        await axios.post("http://localhost:5000/api/v1/group/updateGroup", {
                        groupId: groupsArray[groupIndex]._id,
                        title: groupName,
                        groupPeople: selectedPeopleIds},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }

    const deleteGroup = async () => {
        await axios.post("http://localhost:5000/api/v1/group/deleteGroup", 
                        {groupId: groupsArray[groupIndex]._id},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }
    
    return (
        <BasicLayout>
            <h2>Select a Group to edit or delete</h2>
            <GroupTable groupsArray={groupsArray} handleClick={(idx)=>handleClick(idx)}/>
            {(groupIndex>=0) && <h5>Full list of People</h5>}
            {(groupIndex>=0) && fullPersonList.map((person, idx) => <NameCard title={person.title}
                                                                                key={idx}
                                                                                whenClicked={()=>cardClicked(idx)} />)}
            {(groupIndex>=0) && <TextInputField
                                    name='titile'
                                    label='Group Name'
                                    placeholder='Group Name...'
                                    value={groupName}
                                    onChange={handleChange} />}
            {(groupIndex>=0) && <PeopleInGroupTable selectedPeople={selectedPeople}
                                                    personInGroupClick={(idx)=>personInGroupClick(idx)} />}
            {(groupIndex>=0) && <Button onClick={submitChanges}>Submit Group Changes</Button>}
            {(groupIndex>=0) && <Button intent="danger" onClick={()=>setShowDeleteDialog(true)}>Delete Group</Button>}
            <Dialog
                isShown={showDeleteDialog}
                title="Confirm Delete Group"
                intent="danger"
                onCloseComplete={() => {
                    setShowDeleteDialog(false);
                    deleteGroup();}}
                confirmLabel="Delete">
            Are you sure you want to delete this Group? This cannot be undone and will affect any entries using this group.
            </Dialog>
            <Link to="/dashboard">Go Back (Nothing will be changed)</Link>
        </BasicLayout>
    )
}

export default GroupEditPage