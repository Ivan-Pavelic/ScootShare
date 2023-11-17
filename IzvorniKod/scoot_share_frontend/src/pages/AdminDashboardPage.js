import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import AdminUserListComponent from '../components/AdminUserListComponent';


/*Admin can see the list of all users. He can delete users account. He gets a notification when someone registers
and he must check if provided documents are okay. And lastly when user wants to replace scooter pictures with his own
admin must also check that.*/
const AdminDashboardPage = (props) => {
    const {setJwt, jwt} = {...props};


    return (
        <>
            <NavigationComponent displayLogoutButton={true} displayRegisterButton={false} displayLoginButton={false} setJwt={setJwt}/>  
            <AdminUserListComponent jwt={jwt}/>
        </>
    );
};

export default AdminDashboardPage;