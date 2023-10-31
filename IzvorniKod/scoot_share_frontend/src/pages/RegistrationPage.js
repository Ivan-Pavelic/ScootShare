import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import RegistrationComponent from '../components/RegistrationComponent';

const RegistrationPage = () => {
    return (
        <>
            <NavigationComponent displayRegisterButton={false}/>
            <RegistrationComponent />
        </>
    );
};

export default RegistrationPage;