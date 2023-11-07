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
            <NavigationComponent authority={authority} displayLogoutButton={jwtIsValid} displayRegisterButton={!jwtIsValid} displayLoginButton={!jwtIsValid} setJwt={setJwt}/>
            <AdComponent jwtIsValid={jwtIsValid}/>
        </>
    );
};

export default HomePage;