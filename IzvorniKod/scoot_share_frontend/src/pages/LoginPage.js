import React, { useEffect } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import LoginComponent from '../components/LoginComponent';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const {isLoggedIn, setIsLoggedIn} = {...props};
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <NavigationComponent displayLoginButton={false} displayLogoutButton={false} displayRegisterButton={true} setIsLoggedIn={setIsLoggedIn}/>
            <LoginComponent setIsLoggedIn={setIsLoggedIn}/>
        </>
    )
};


export default LoginPage;
