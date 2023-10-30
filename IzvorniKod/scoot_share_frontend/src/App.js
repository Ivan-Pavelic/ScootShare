import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationComponent from './components/RegistrationComponent';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<RegistrationComponent/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
