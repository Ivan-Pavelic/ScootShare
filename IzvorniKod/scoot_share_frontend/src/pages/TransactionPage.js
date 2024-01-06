import React, { useState } from 'react';
import NavigationComponent from '../components/NavigationComponent';
 
const TransactionPage = (props) => {
   const {jwt, username, setJwt, notifications, setNotifications, jwtIsValid} = {...props};
   const [transactions,setTransactions]=useState([]);
   useEffect(() => {}, [])
    return (
        <div>
           <NavigationComponent displayMyRentalsButton={jwtIsValid} setNotifications={setNotifications} notifications={notifications} jwt={jwt} username={username} setJwt={setJwt} displayHomeButton={true} displayLogoutButton={true} displayProfileButton={true}  displayRentScooterButton={jwtIsValid} />
        </div>
    );
};
 
export default TransactionPage;