import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useRef, useState } from 'react';
import PrivateRoute from './components/PrivateRoute';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RentalPage from './pages/RentalPage';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import ListingDetailsPage from './pages/ListingDetailsPage';
import ChatPage from './pages/ChatPage';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
    const cookies = new Cookies();
    const [jwt, setJwt] = useState(cookies.get("jwt") !== undefined ? cookies.get("jwt") : "");
    const [jwtIsValid, setJwtIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authroity, setAuthority] = useState();
    const [username, setUsername] = useState();
    const webSocketComponentRef = useRef();
    const [notification, setNotification] = useState(null);

    // check if token is valid
    useEffect(() => {
      if (jwt !== "") {
        fetch(`/api/auth/validate?token=${jwt}`, {
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
            setUsername(decoded.username);
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

    const onNotificationReceived = (notification) => {
      if (window.location.href.split("/")[3] !== "chat") {
        const newNotification = JSON.parse(notification.body);
        setNotification(newNotification);
      }
    }

  return (

        loading && 
        <>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage username={username} jwt={jwt} jwtIsValid={jwtIsValid} setJwt={setJwt} />} />
              <Route path="/register" element={<RegistrationPage jwtIsValid={jwtIsValid} setJwt={setJwt} />}/> 
              <Route path="/login" element={<LoginPage jwtIsValid={jwtIsValid} setJwt={setJwt} setUsername={setUsername}/>}/> 
              <Route path="/profile" element={
                <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={true} adminRole={false} >
                  <UserProfilePage jwt={jwt} username={username} jwtIsValid={jwtIsValid} setJwt={setJwt}/>
                </PrivateRoute>
              }/>
              <Route path="/rent-scooter" element={
                <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={true} adminRole={false}>
                  <RentalPage jwtIsValid={jwtIsValid} setJwt={setJwt} username={username} jwt={jwt}/>
                </PrivateRoute>
              }/>
              <Route path='/admin' element={
                <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={false} adminRole={true}>
                  <AdminDashboardPage jwt={jwt} setJwt={setJwt}/>
                </PrivateRoute>
              } />
              <Route path='/listing/:id' element={
                <ListingDetailsPage jwt={jwt}/>
              } 
              />
              <Route path='/chat' element={
                <PrivateRoute jwt={jwt} jwtIsValid={jwtIsValid} clientRole={true} adminRole={false}>
                  <ChatPage jwt={jwt} username={username}/>
                </PrivateRoute>
              } 
              />
            </Routes>
          </BrowserRouter>
          <WebSocketComponent onNotificationReceived={onNotificationReceived}
              subscribeNotification={`/user/${username}/queue/notifications`} webSocketComponentRef={webSocketComponentRef}/>
        {notification &&
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className="absolute z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200 bg-opacity-50">
              <div className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          {notification.type === "MESSAGE" && <p className='text-2xl font-semibold text-center'>Nova poruka!</p>}
                          <button 
                            onClick={() => setNotification(null)}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>
                      <div className="p-4 md:p-5 space-y-4">
                      {notification.type === "MESSAGE" && <p className='text-xl'>Korisnik <span className='font-semibold'>{notification.sender}</span> Vam je poslao novu poruku. Klikom na sljedeći link pogledajte poruku. 
                                <span className='font-bold text-xl cursor-pointer text-slate-800'
                                    onClick={() => {window.location.href = "/chat"}}>  Poruka</span></p>}
                        <div className='flex justify-end'>
                          <button className='text-white bg-slate-800 font-semibold text-lg rounded-lg cursor-pointer py-2 px-3'
                            onClick={() => setNotification(null)}>U redu</button>
                        </div>
                      </div>
                  </div>
              </div>
          </div>}
        </>
  );
}

export default App;
