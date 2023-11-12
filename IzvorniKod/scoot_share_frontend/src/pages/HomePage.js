import React, { useEffect, useState } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import AdComponent from '../components/AdComponent';
import { jwtDecode } from 'jwt-decode';

const HomePage = (props) => {
    const {jwtIsValid, setJwt, jwt} = {...props};
    const [authority, setAuthority] = useState(null);

    useEffect(() => {
        if (jwt && jwt !== "") {
            const jwtDecoded = jwtDecode(jwt);
            setAuthority(jwtDecoded.authorities[0].authority);
        }
    }, []);

    return (
        <>
            <NavigationComponent displayAdminPage={jwtIsValid && authority === "ROLE_ADMIN"} displayRentScooterButton={jwtIsValid && authority !== "ROLE_ADMIN"} authority={authority} displayProfileButton={jwtIsValid && authority !== "ROLE_ADMIN"} displayLogoutButton={jwtIsValid} displayRegisterButton={!jwtIsValid} displayLoginButton={!jwtIsValid} setJwt={setJwt}/>
            <AdComponent canReserveScooter={jwtIsValid && authority === "ROLE_CLIENT"} jwtIsValid={jwtIsValid}/>
        </>
    );
};

export default HomePage;