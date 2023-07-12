import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthUser, setIsAuthenticated } from '../../app/authSlice';
import "../../styles/general.css";

function HomePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Check if someone is signed in and push to the dashboard if so
  // For some reason, the state is resetting if a route is typed into the browser rather than clicked
  // Perhaps this is the expected behavior with redux and react-router-dom
  useEffect(() => {
    const fetchAuthUser = async () => {
      const response = await axios
        .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
        .catch((err) => {
        console.log("Something is wrong with the authentication");
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser(null));
      });
  
      if (response && response.data) {
        console.log("User: ", response.data);
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(response.data));
        navigate("/dashboard");
      }
    }
    fetchAuthUser()
  }, [])
  

  return (
    <BasicLayout>
      <div className="homepage general">
        <h3>Graph Journal</h3>
        <Link to="/login" className="dash-link">Login</Link>
      </div>
    </BasicLayout>
  );
}

export default HomePage;
