import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import RentalComponent from "../components//RentalComponent";

const RentalPage = (props) => {
    const {setIsLoggedIn} = {...props};

    return (
        <>
            <NavigationComponent displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setIsLoggedIn={setIsLoggedIn} displayRentScooterButton={false}/>   
            <RentalComponent />   
        </>
    );
};

export default RentalPage;