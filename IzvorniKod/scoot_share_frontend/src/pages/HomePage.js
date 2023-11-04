import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import AdComponent from '../components/AdComponent';

const HomePage = (props) => {
    const {jwtIsValid, setJwt} = {...props};
    return (
        <>
            <NavigationComponent displayLogoutButton={jwtIsValid} displayRegisterButton={!jwtIsValid} displayLoginButton={!jwtIsValid} setJwt={setJwt}/>   
            <AdComponent jwtIsValid={jwtIsValid}/>
        </>
    );
};

export default HomePage;