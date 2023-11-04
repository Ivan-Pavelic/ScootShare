import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavigationComponent = (props) => {
    const navigate = useNavigate()
    const {displayRegisterButton, displayLoginButton, setJwt, displayLogoutButton, displayRentScooterButton} = {...props};
    
    function register() {
        navigate("/register")
    }
    function login() {
        navigate("/login")
    }

    function logout() {
        setJwt("");
        const cookies = new Cookies();
        cookies.remove("jwt");
        navigate("/");
    }

    function rentScooter() {
        navigate("/rent-scooter");
    }

    return (
        <div className='flex justify-between items-center bg-slate-800 py-6 px-28'>
            <div className=''>
                <p className='text-4xl text-white font-bold'>ScootShare</p>
            </div>
            <div className='flex space-x-4'>
                { displayRegisterButton && <button className='text-white bg-cyan-600 rounded-3xl py-3 px-8' onClick={register}>Registracija</button> }
                { displayLoginButton && <button className='text-white bg-cyan-600 rounded-3xl py-3 px-8' onClick={login}>Prijava</button> }
                { displayRentScooterButton === undefined ? 
                    displayLogoutButton && <button className='text-white bg-teal-400 rounded-3xl py-3 px-8' onClick={rentScooter}>Iznajmi Romobil</button>
                    : <></>}
                { displayLogoutButton && <button className='text-white bg-red-500 rounded-3xl py-3 px-8' onClick={logout}>Odjava</button> }
            </div>
        </div>
    );
};

export default NavigationComponent;