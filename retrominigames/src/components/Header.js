import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import titleimage from '../title.png';
import myAvatar from '../images/pfp.png';
import MenuProfile from './MenuProfile'; // Importa el componente del menú
import '../styles/App.css';

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú está abierto

  return (
    <header className="App-header">
      <img src={titleimage} alt="Title" className="title" />
      {user ? (
        <div className="user-menu">
          <div className="avatar-container" style={{ position: 'relative' }}>
            <img
              src={user.avatar || myAvatar}
              alt="User Avatar"
              className="user-avatar-small"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0 }}>
                <MenuProfile />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            onClick={() => navigate('/signup')}
            className="signup-button"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="login-button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
