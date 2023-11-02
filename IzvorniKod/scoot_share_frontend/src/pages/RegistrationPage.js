import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import RegistrationComponent from '../components/RegistrationComponent';

const RegistrationPage = (props) => {
    const {isLoggedIn, setIsLoggedIn} = {...props};
    return (
        <>
            <NavigationComponent displayLogoutButton={isLoggedIn} displayRegisterButton={false}  displayLoginButton={!isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <RegistrationComponent />
        </>
    );
};

export default RegistrationPage;