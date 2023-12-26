import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavigationComponent = (props) => {
    const {authority} = {...props};
    const navigate = useNavigate()
    const {displayChatButton, displayHomeButton, displayAdminPage, displayRegisterButton, displayLoginButton, setJwt, displayLogoutButton, displayRentScooterButton, displayProfileButton} = {...props};
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
        window.location.reload();
    }

    function rentScooter() {
        navigate("/rent-scooter");
    }

    function profilePage() {
        navigate("/profile");
    }

    function adminPage() {
        navigate("/admin");
    }

    function home() {
        navigate("/");
    }

    function chatPage() {
        navigate("/chat");
    }

    return (
        <div className='flex justify-between items-center bg-slate-800 py-6 px-28'>
            <div className=''>
                <p className='text-4xl text-white font-bold'>ScootShare</p>
            </div>
            <div className='flex gap-6'>
                {
                    authority === "ROLE_PENDING_REGISTRATION" ? 
                    <div className='flex items-center gap-8'>
                        <p className='text-2xl text-white'>Vaš račun je u izradi</p> 
                        {displayLogoutButton && <button className='text-white hover:text-red-500' onClick={logout}>Odjava</button>} 
                    </div>
                    :
                    <>
                        {displayHomeButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={home}>Početna stranica</button>} 
                        {displayRegisterButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={register}>Registracija</button>} 
                        {displayLoginButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={login}>Prijava</button>}           
                        {displayRentScooterButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={rentScooter}>Iznajmi Romobil</button>}
                        {displayProfileButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={profilePage}>Profil</button>} 
                        {displayChatButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={chatPage}>Razgovori</button>} 
                        {displayAdminPage && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={adminPage}>Admin</button>} 
                        {displayLogoutButton && <button className='text-white rounded-3xl hover:text-red-500' onClick={logout}>Odjava</button>} 
                    </>
                }
            </div>
        </div>
    );
};

export default NavigationComponent;