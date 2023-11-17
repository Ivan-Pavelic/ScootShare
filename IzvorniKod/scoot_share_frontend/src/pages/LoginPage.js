import React, { useEffect } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import LoginComponent from '../components/LoginComponent';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const {jwtIsValid, setJwt} = {...props};
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtIsValid) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <NavigationComponent displayLoginButton={false} displayLogoutButton={false} displayRegisterButton={true} setJwt={setJwt}/>
            <LoginComponent setJwt={setJwt}/>
        </>
    )
};


export default LoginPage;
