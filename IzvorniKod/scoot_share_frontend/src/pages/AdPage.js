import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import AdComponent from '../components/AdComponent';

const RegistrationPage = () => {
    return (
        <>
            <NavigationComponent displayRegisterButton={true}  displayLoginButton={true}/>
            <AdComponent />
        </>
    );
};

export default RegistrationPage;