import React from 'react';
import { useNavigate } from 'react-router-dom';
import titleimage from '../title.png';
import '../styles/App.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="App-header">
      <img src={titleimage} alt="Title" className="title" />
      <button 
        type="signup" 
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
      <button 
        type="login" 
        onClick={() => navigate('/login')}
      >
        Log In
      </button>
    </header>
  );
}

export default Header;
