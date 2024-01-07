import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavigationComponent = (props) => {
    const {authority} = {...props};
    const navigate = useNavigate()
    const {notifications, setNotifications, jwt, username, displayTransactionsButton, displayImageChangeRequestsButton, displayMyRentalsButton, displayChatButton, displayHomeButton, displayAdminPage, displayRegisterButton, displayLoginButton, setJwt, displayLogoutButton, displayRentScooterButton, displayProfileButton} = {...props};

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
        if (authority === "ROLE_PENDING_REGISTRATION") {
            window.location.reload();
        }
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

    function myRentals() {
        navigate("/my-rentals");
    }

    function imageChangeRequests() {
        navigate("/admin/image-change-requests");
    }

    function transactionPage() {
        navigate("/transactions");
    }

    function displayNotifications() {
        const notificationsDiv = document.querySelector(".notifications-div");
        if (notificationsDiv.classList.contains("hidden")) {
            notificationsDiv.classList.remove("hidden");
            notificationsDiv.classList.add("flex");
        }
        else {
            notificationsDiv.classList.add("hidden");
            notificationsDiv.classList.remove("flex");
        }
    }

    function deleteNotification(notification, index) {
        fetch(`/api/notifications/${notification.id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`,
            },
            method: "DELETE",
        });

        let tmpNotifications = notifications.filter((tmp) => tmp.id !== notification.id);
        setNotifications(tmpNotifications);                                                    

        if (notification.type === "MESSAGE") {
            navigate("/chat");
        }
        if (notification.type === "TRANSACTION") {
            navigate("/transactions");
        }
        if (notification.type === "RATING") {
            navigate("/profile");
        }
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
                        {displayMyRentalsButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={myRentals}>Unajmljeni romobili</button>} 
                        {displayRegisterButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={register}>Registracija</button>} 
                        {displayLoginButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={login}>Prijava</button>}           
                        {displayRentScooterButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={rentScooter}>Iznajmi Romobil</button>}
                        {displayTransactionsButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={transactionPage}>Transackije</button>} 
                        {displayProfileButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={profilePage}>Profil</button>} 
                        {displayChatButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={chatPage}>Razgovori</button>} 
                        {displayAdminPage && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={adminPage}>Admin</button>} 
                        {displayImageChangeRequestsButton && <button className='text-white rounded-3xl hover:text-cyan-400' onClick={imageChangeRequests}>Pregled zamjena slika</button>} 
                        {notifications && !displayLoginButton && 
                        <div className='flex flex-row items-start gap-1 cursor-pointer relative' onClick={displayNotifications}>
                            <p className='text-white rounded-3xl hover:text-cyan-400 cursor-pointer'>Obavijesti</p>
                            <div className='w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full'><p className='text-slate-800 font-bold'>{notifications.length}</p></div>
                            <div className='hidden absolute notifications-div flex-col bg-white z-50 top-7 -left-16 w-[240px] rounded-lg shadow-lg'>
                                {notifications.map((notification, index) => {
                                    return (
                                        <div key={index} className='cursor-pointer border-b-2 border-b-slate-200'>
                                            {notification.type === "MESSAGE" && 
                                                <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Korisnik <span className='font-semibold'>{notification.senderUsername}</span> šalje vam poruku.</p>}
                                            {notification.type === "RENTAL" && 
                                                <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Korisnik <span className='font-semibold'>{notification.senderUsername}</span> je unajmio vaš romobil.</p>}
                                            {(notification.type === "IMAGE_CHANGE_REQUEST" || notification.type === "IMAGE_CHANGE_REQUEST_ADMIN") && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Korisnik <span className='font-semibold'>{notification.senderUsername}</span> je zatražio zamjenu slike romobila.</p>}
                                            {notification.type === "IMAGE_CHANGE_REQUEST_REJECTED" && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Zahtjev za zamjenom slike romobila je odbačen.</p>}
                                            {notification.type === "IMAGE_CHANGE_REQUEST_ACCEPTED" && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Zahtjev za zamjenom slike romobila je prihvaćen.</p>}
                                            {notification.type === "TRANSACTION" && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Transakcija je provedena.</p>}
                                            {notification.type === "NEW_REGISTRATION" && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Nova registracija.</p>}
                                            {notification.type === "RATING" && 
                                            <p className='text-md text-center py-2 px-4 w-full h-full' onClick={() => deleteNotification(notification, index)}>Pristigao je novi komentar za vas.</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>}
                        {displayLogoutButton && <button className='text-white rounded-3xl hover:text-red-500' onClick={logout}>Odjava</button>} 
                    </>
                }
            </div>
        </div>
    );
};

export default NavigationComponent;