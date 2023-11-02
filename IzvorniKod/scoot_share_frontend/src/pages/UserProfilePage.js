import React from 'react';
import NavigationComponent from '../components/NavigationComponent';

const UserProfilePage = (props) => {
    const {setIsLoggedIn} = {...props};

    return (
        <>
            <NavigationComponent displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setIsLoggedIn={setIsLoggedIn}/>   
        </>
    );
};

export default UserProfilePage;