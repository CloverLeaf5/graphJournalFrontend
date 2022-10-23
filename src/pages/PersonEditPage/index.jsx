import axios from 'axios';
import { Button, Dialog } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'
import PersonEditForm from './PersonEditForm';
import PersonTable from './PersonTable';

const PersonEditPage = () => {
    
    const [peopleArray, setPeopleArray] = useState([]);
    const [personIndex, setPersonIndex] = useState(-1);
    const [personName, setPersonName] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/person/getPeople", { withCredentials: true })
                if (response && response.data){
                    setPeopleArray(response.data);
                }
            } catch(err) {
                console.log("Something went wrong with getting the People");
            }
        }
        fetchData();
    }, [])

    const handleClick = (idxClicked) => {
        setPersonIndex(idxClicked);
        setPersonName(peopleArray[idxClicked].title);
    }

    const submitChanges = async () => {
        await axios.post("http://localhost:5000/api/v1/person/updatePerson", {
                        personId: peopleArray[personIndex]._id,
                        title: personName},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }

    const deletePerson = async () => {
        await axios.post("http://localhost:5000/api/v1/person/deletePerson", 
                        {personId: peopleArray[personIndex]._id},
                        { withCredentials: true })
                    .catch((err) => console.log(err));
        navigate("/dashboard");
    }
    
    return (
        <BasicLayout>
            <h2>Select a Person to edit or delete</h2>
            <PersonTable peopleArray={peopleArray} handleClick={(idx)=>handleClick(idx)}/>
            {(personIndex>=0) && <PersonEditForm personName={personName} setPersonName={setPersonName} submitChanges={submitChanges} />}
            {(personIndex>=0) && <Button intent="danger" onClick={()=>setShowDeleteDialog(true)}>Delete Person</Button>}
            <Dialog
                isShown={showDeleteDialog}
                title="Confirm Delete Person"
                intent="danger"
                onCloseComplete={() => {
                    setShowDeleteDialog(false);
                    deletePerson();}}
                confirmLabel="Delete">
            Are you sure you want to delete this person? This cannot be undone and will affect any entries using this person.
            </Dialog>
            <Link to="/dashboard">Go Back (Nothing will be changed)</Link>
        </BasicLayout>
    )
}

export default PersonEditPage