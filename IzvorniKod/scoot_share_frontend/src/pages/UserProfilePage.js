import React, { useEffect, useState } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import UpdateProfileComponent from '../components/UpdateProfileComponent';

const UserProfilePage = (props) => {
    const {jwtIsValid, setJwt, username, jwt, notifications, setNotifications} = {...props};

    return (
        <div className='min-h-screen bg-blue-50 pb-20'>
            <NavigationComponent displayMyRentalsButton={jwtIsValid} setNotifications={setNotifications} notifications={notifications} jwt={jwt} username={username} displayChatButton={true} displayHomeButton={true} displayRentScooterButton={true}  displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt}/>   
            <UpdateProfileComponent username={username} jwt={jwt}/>
        </div>
    );
};

export default UserProfilePage;