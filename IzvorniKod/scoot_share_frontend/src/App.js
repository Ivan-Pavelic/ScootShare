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
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

function App() {
    const cookies = new Cookies();
    const [jwt, setJwt] = useState(cookies.get("jwt") !== undefined ? cookies.get("jwt") : "");
    const [jwtIsValid, setJwtIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    // check if token is valid
    useEffect(() => {
      if (jwt !== "") {
        fetch(`api/auth/validate?token=${jwt}`, {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
          },
          method: "GET",
        })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          setJwtIsValid(data);
          if (data) {
            const decoded = jwtDecode(jwt);
            cookies.set("jwt", jwt, {
              expires: new Date(decoded.exp * 1000)
            })
          }
          else {
            cookies.remove("jwt");
            setJwt("");
          }
          setLoading(true);
        })
      }
      else {
        setJwtIsValid(false);
        setLoading(true);
      }
    })

  return (
        loading && <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage jwtIsValid={jwtIsValid} setJwt={setJwt} />} />
          <Route path="/register" element={<RegistrationPage jwtIsValid={jwtIsValid} setJwt={setJwt} />}/> 
          <Route path="/login" element={<LoginPage jwtIsValid={jwtIsValid} setJwt={setJwt}/>}/> 
          <Route path="/profile" element={
            <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={true} adminRole={false} >
              <UserProfilePage jwtIsValid={jwtIsValid} setJwt={setJwt}/>
            </PrivateRoute>
          }/>
          <Route path="/rent-scooter" element={
            <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={true} adminRole={false}>
              <RentalPage jwtIsValid={jwtIsValid} setJwt={setJwt}/>
            </PrivateRoute>
          }/>
          <Route path='/admin' element={
            <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={false} adminRole={true}>
              <AdminDashboardPage jwt={jwt} setJwt={setJwt}/>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
