import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuth)

    return (
        isAuth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoutes