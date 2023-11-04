import React from 'react';
import NavigationComponent from '../components/NavigationComponent';

const UserProfilePage = (props) => {
    const {jwtIsValid, setJwt} = {...props};

    return (
        <>
            <NavigationComponent displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt}/>   
        </>
    );
};

export default UserProfilePage;