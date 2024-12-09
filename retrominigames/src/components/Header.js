import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import titleimage from '../title.png';
import myAvatar from '../images/pfp.png';
import '../styles/App.css';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="App-header">
      <img src={titleimage} alt="Title" className="title" />
      <div className="user-menu">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <div className="avatar-container">
          <img
            src={user.avatar || myAvatar}
            alt="User Avatar"
            className="user-avatar-small"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;