import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import RentalComponent from '../components/RentalComponent';

const RegistrationPage = () => {
    return (
        <>
            <NavigationComponent displayRegisterButton={false}  displayLoginButton={false}/>
            <RentalComponent />
        </>
    );
};

export default RegistrationPage;