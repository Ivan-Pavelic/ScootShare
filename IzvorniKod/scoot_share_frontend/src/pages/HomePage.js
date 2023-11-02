import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import AdComponent from '../components/AdComponent';

const HomePage = (props) => {
    const {isLoggedIn, setIsLoggedIn} = {...props};
    return (
        <>
            <NavigationComponent displayLogoutButton={isLoggedIn} displayRegisterButton={!isLoggedIn} displayLoginButton={!isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>   
            <AdComponent isLoggedIn={isLoggedIn}/>
        </>
    );
};

export default HomePage;