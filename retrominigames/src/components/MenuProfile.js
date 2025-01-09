import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Award, Edit } from 'react-feather'; 
import { useUser } from '../context/UserContext';
import '../styles/MenuProfile.css';

function MenuProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); 
    navigate('/login');
  };

  return (
    <div className="menu-container">
      <div className="menu-title">
        {user.username || 'Username'}
      </div>

      <div
        onClick={() => navigate('/profile')}
        className="menu-item"
      >
        <Award size={20} style={{ marginRight: '10px' }} />
        Achievements
      </div>

      <div
        onClick={() => navigate('/profile')}
        className="menu-item"
      >
        <User size={20} style={{ marginRight: '10px' }} />
        My profile
      </div>

      <div
        onClick={() => navigate('/edit-profile')}
        className="menu-item"
      >
        <Edit size={20} style={{ marginRight: '10px' }} />
        Edit profile
      </div>

      <div
        onClick={handleLogout}
        className="menu-item logout-item"
      >
        <LogOut size={20} style={{ marginRight: '10px' }} />
        Log out
      </div>
    </div>
  );
}

export default MenuProfile;