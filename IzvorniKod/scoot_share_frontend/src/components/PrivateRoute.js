import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const {children, isLoggedIn, requiresAdminRole, requiresClinetRole, role} = {...props};
    const navigate = useNavigate();

    if (isLoggedIn) {
        if (requiresAdminRole) {
            if (role === "ROLE_ADMIN") {
                return (
                    children
                );
            }
            else {
                return (
                    <Navigate to={"/"}></Navigate>
                ); 
            }
        }
        else if (requiresClinetRole) {
           if (role === "ROLE_CLIENT") {
                return (
                    children
                );
           }
           else {
            return (
                <Navigate to={"/"}></Navigate>
            );
           }
        }
    }
    else {
       return (
            <Navigate to={"/login"}></Navigate>
       );
    }
};

export default PrivateRoute;