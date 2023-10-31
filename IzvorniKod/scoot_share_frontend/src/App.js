import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import RentalPage from './pages/RentalPage';
import AdPage from './pages/AdPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage/>}/> 
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/rental" element={<RentalPage/>}/> 
        <Route path="/ad" element={<AdPage/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
