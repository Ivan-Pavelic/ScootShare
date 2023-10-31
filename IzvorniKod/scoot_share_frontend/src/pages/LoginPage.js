import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import LoginComponent from '../components/LoginComponent';

const LoginPage = () => {
    return (
        <>
            <NavigationComponent displayLoginButton={false} displayRegisterButton/>
            <LoginComponent />
        </>
    )
};


export default LoginPage;
