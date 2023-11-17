import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import RentalComponent from "../components//RentalComponent";

const RentalPage = (props) => {
    const {jwtIsValid, setJwt} = {...props};

    return (
        <>
            <NavigationComponent displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt} displayRentScooterButton={false}/>   
            <RentalComponent />   
        </>
    );
};

export default RentalPage;