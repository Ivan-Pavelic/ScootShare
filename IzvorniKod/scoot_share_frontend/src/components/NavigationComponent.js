import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationComponent = (props) => {
    const navigate = useNavigate()
    const {displayRegisterButton} = {...props}
    const {displayLoginButton} = {...props}

    function register() {
        navigate("/register")
    }
    function login() {
        navigate("/login")
    }

    return (
        <div className='flex justify-between items-center bg-slate-800 py-6 px-28'>
            <div className=''>
                <p className='text-4xl text-white font-bold'>ScootShare</p>
            </div>
            <div className='flex space-x-4'>
                { displayRegisterButton && <button className='text-white bg-cyan-600 rounded-3xl py-3 px-8' onClick={register}>Registracija</button> }
                { displayLoginButton && <button className='text-white bg-cyan-600 rounded-3xl py-3 px-8' onClick={login}>Prijava</button> }
            </div>
        </div>
    );
};

export default NavigationComponent;