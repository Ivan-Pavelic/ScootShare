import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import UpdateProfileComponent from '../components/UpdateProfileComponent';

const UserProfilePage = (props) => {
    const {jwtIsValid, setJwt, username, jwt} = {...props};

    return (
        <div className='h-fit bg-blue-50 pb-20'>
            <NavigationComponent displayChatButton={true} displayHomeButton={true} displayRentScooterButton={true}  displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt}/>   
            <UpdateProfileComponent username={username} jwt={jwt}/>
        </div>
    );
};

export default UserProfilePage;