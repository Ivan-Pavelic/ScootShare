import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationComponent from './components/RegistrationComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationComponent/>}/> 
        <Route path="/login" element={<LoginComponent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
