import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RentalPage from './pages/RentalPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggStateChanged, setLogStateChanged] = useState(false);
    const [userRole, setUserRole] = useState("ROLE_ADMIN"); // can be unregistered, client (renter), admin

    useEffect(() => {
      setLogStateChanged(false);
      const value = localStorage.getItem("isLoggedIn");
      if (value !== null) {
        if (value === "false") {
          setIsLoggedIn(false);
        }
        else {
          setIsLoggedIn(true);
        }
        setLogStateChanged(true);
      }
    }, []);

  return (
    
      loggStateChanged ? 
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<RegistrationPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/> 
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/> 
          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn} requiresAdminRole={false} requiresClinetRole={true} role={userRole}>
              <UserProfilePage setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }/>
          <Route path="/rent-scooter" element={
            <PrivateRoute isLoggedIn={isLoggedIn} requiresAdminRole={false} requiresClinetRole={true} role={userRole}>
              <RentalPage setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }/>
          <Route path='/admin' element={
            <PrivateRoute isLoggedIn={isLoggedIn} requiresAdminRole={true} role={userRole}>
              <AdminDashboardPage setIsLoggedIn={setIsLoggedIn}/>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter> : 
      <></>
    
  );
}

export default App;
