import React, { useEffect, useState } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import { useNavigate } from 'react-router-dom';

const ListingDetailsPage = (props) => {
    const {jwt} = {...props};
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [newChatRoomUser, setNewChatRoomUser] = useState(null);

    useEffect(() => {
        const listingId = window.location.href.split("/")[4];
        fetch(`/api/listings/getOneListing/2`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
          })
          .then((data) => {
            if (data) {
                setListing(data);
            }
          });
    }, []);

    const navigateAndCreateChatRoom = () => {
        fetch(`/api/scooters/getOwnerUsername/${listing.scooterId}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
          })
          .then((data) => {
            setNewChatRoomUser(data.username);
          });
    }

    useEffect(() => {
        if (newChatRoomUser) {
            fetch(`/api/messages/createChatRoom/${newChatRoomUser}`, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${jwt}`
                },
                method: "GET",
              });
            navigate("/chat");
        }
    }, [newChatRoomUser, setNewChatRoomUser]);

    return (
        <div className='bg-blue-50 h-screen'>
            <NavigationComponent displayChatButton={true} displayHomeButton={true} displayLogoutButton={true} displayProfileButton={true} />   
            <button 
                onClick={() => navigateAndCreateChatRoom()}
                className='bg-slate-800 text-white font-semibold text-xl rounded-lg py-2 px-3 m-16'>Pošalji poruku</button>
        </div>
    );
};

export default ListingDetailsPage;