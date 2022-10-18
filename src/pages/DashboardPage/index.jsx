import { Button } from 'evergreen-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser, setIsAuthenticated } from '../../app/authSlice';

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
    <BasicLayout>
      <h3>DASHBOARD FOR { user && user.fullName }</h3>
      <Link to="/tagEntry">Enter a new Tag</Link>
      <Button onClick={logout}>Logout</Button>
    </BasicLayout>
  );
}

export default DashboardPage;
