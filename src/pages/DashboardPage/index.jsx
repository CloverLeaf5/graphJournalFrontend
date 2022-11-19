import { Button } from 'evergreen-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser, setIsAuthenticated } from '../../app/authSlice';
import Navbar from '../../components/Navbar';

function DashboardPage() {

const user = useSelector((state) => state.auth.authUser);
const navigate = useNavigate();
const dispatch = useDispatch();

const logout = async () => {
  const response = await axios
      .get("http://localhost:5000/api/v1/logout", { withCredentials: true })
      .catch((err) => {
        console.log("Something went wrong");
      });

  if (response && response.data) {
    console.log(response.data);
    dispatch(setIsAuthenticated(false));
    dispatch(setAuthUser(null));
    navigate("/");
  }
};


  return (
    <div>
      <Navbar>
        <li>
          <Link to="/tagEntry">Enter a new Tag</Link>
        </li>
        <li>
          <Link to="/tagEdit">Edit or Delete a Tag</Link>
        </li>
      </Navbar>
      <BasicLayout>
        <h3>DASHBOARD FOR { user && user.fullName }</h3>
        <Link to="/viewCreation">Create a New View</Link>
        <Link to="/savedViewsList">See Saved Views</Link>
        <Link to="/mainEntry">Input a new Entry</Link>
        <Link to="/tagEntry">Enter a new Tag</Link>
        <Link to="/personEntry">Enter a new Person</Link>
        <Link to="/groupEntry">Enter a new Group</Link>
        <Link to="/tagEdit">Edit or Delete a Tag</Link>
        <Link to="/personEdit">Edit or Delete a Person</Link>
        <Link to="/groupEdit">Edit or Delete a Group</Link>
        <Link to="/entriesViewer">Edit or Delete an Entry</Link>
        <Button onClick={logout}>Logout</Button>
      </BasicLayout>
    </div>
  );
}

export default DashboardPage;
