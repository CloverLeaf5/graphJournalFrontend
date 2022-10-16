import axios from 'axios';
import React from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAuthUser, setIsAuthenticated } from '../../app/authSlice';
import BasicLayout from '../../layouts/BasicLayout';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
      .catch((err) => {
      console.log("Something is wrong with the authentication");
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
      navigate("/login/error");
    });

    if (response && response.data) {
      console.log("User: ", response.data);
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response.data));
      navigate("/dashboard");
    }
  }

  const redirectGoogleSSOAPI = async () => {
    let timer = null;
    const googleLoginURL = "http://localhost:5000/api/v1/login/google";
    const popupWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=650,left=500,top=50"
    );

    if (popupWindow) {
      timer = setInterval(() => {
        if (popupWindow.closed) {
          if (timer) clearInterval(timer);
          //console.log("This should log after closure");
          fetchAuthUser();
        }
      }, 500);
    }
  };

  return (
    <BasicLayout>
      <GoogleButton onClick={redirectGoogleSSOAPI}/>
    </BasicLayout>
  );
}

export default LoginPage;
