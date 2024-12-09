import './styles/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import SpaceInvaders from './games/SpaceInvaders';
import Header from './components/Header';
import { UserProvider } from './context/UserContext';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching data from the backend!", error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <h1>{message}</h1>
        <button 
          type="button" 
          onClick={() => navigate('/spaceinvaders')}
          className="spaceinvaders-button" 
        >
          Space Invaders
        </button>
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/spaceinvaders" element={<SpaceInvaders />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
