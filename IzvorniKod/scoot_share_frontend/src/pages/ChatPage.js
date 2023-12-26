import React, { useEffect, useState } from 'react';
import NavigationComponent from '../components/NavigationComponent';
import ChatComponent from '../components/ChatComponent';

const ChatPage = (props) => {
    const {jwt, username} = {...props};
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        fetch(`/api/messages/getChatRooms/${username}`, {
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
                setChatRooms(data);
            }
          });
    }, []);

    return (
        <div className='bg-blue-50 h-screen'>
            <NavigationComponent displayHomeButton={true} displayLogoutButton={true} displayProfileButton={true}/>
            <ChatComponent chatRooms={chatRooms} username={username} jwt={jwt}/>
        </div>
    );
};

export default ChatPage;