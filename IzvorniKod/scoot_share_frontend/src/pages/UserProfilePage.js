import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import UpdateProfileComponent from '../components/UpdateProfileComponent';

const UserProfilePage = (props) => {
    const {jwtIsValid, setJwt, email, jwt} = {...props};

    return (
        <>
            <NavigationComponent displayRentScooterButton={true}  displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt}/>   
            <UpdateProfileComponent email={email} jwt={jwt}/>
        </>
    );
};

export default UserProfilePage;