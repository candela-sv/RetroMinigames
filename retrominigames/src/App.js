import './styles/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import SpaceInvaders from './games/SpaceInvaders';
import Header from './components/Header';
import Profile from './pages/Profile'; 
import { UserProvider } from './context/UserContext';
import Footer from './components/Footer';
import spaceInvadersImage from './images/space-invaders.png';
import tetrisImage from './images/tetris.png';
import tikTakToeImage from './images/tik-tak-toe.png';
import fixItFelixImage from './images/fix-it-felix.png';

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
        <div className="game-container">
          <div className="game-card">
            <button 
              type="button" 
              onClick={() => navigate('/spaceinvaders')}
              className="spaceinvaders-button" 
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <img 
                src={spaceInvadersImage} 
                alt="Space Invaders" 
                style={{ width: '150px', height: 'auto', display: 'block' }}
              />
            </button>
            <div className="game-info">
              <p>Space Invaders</p>
            </div>
          </div>

          <div className="game-card">
            <button 
              type="button" 
              onClick={() => navigate('/tetris')}
              className="tetris-button" 
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <img 
                src={tetrisImage} 
                alt="Tetris" 
                style={{ width: '150px', height: 'auto', display: 'block' }}
              />
            </button>
            <div className="game-info">
              <p>Tetris</p>
            </div>
          </div>

          <div className="game-card">
            <button 
              type="button" 
              onClick={() => navigate('/tiktaktoe')}
              className="tik-tak-toe-button" 
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <img 
                src={tikTakToeImage} 
                alt="Tik Tak Toe" 
                style={{ width: '150px', height: 'auto', display: 'block' }}
              />
            </button>
            <div className="game-info">
              <p>Tik Tak Toe</p>
            </div>
          </div>

          <div className="game-card">
            <button 
              type="button" 
              onClick={() => navigate('/fixitfelix')}
              className="fix-it-felix-button" 
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <img 
                src={fixItFelixImage} 
                alt="Fix It Felix Jr." 
                style={{ width: '150px', height: 'auto', display: 'block' }}
              />
            </button>
            <div className="game-info">
              <p>Fix It Felix Jr.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/tetris" element={<div>Tetris Game Placeholder</div>} />
          <Route path="/tiktaktoe" element={<div>Tik Tak Toe Game Placeholder</div>} />
          <Route path="/fixitfelix" element={<div>Fix It Felix Jr. Game Placeholder</div>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
