// EditProfileWindow.js
import React, { useState } from 'react';
import '../styles/EditProfile.css';

const EditProfileWindow = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    // Placeholder for save functionality
    alert('Changes saved!');
    onClose();
  };

  return (
    <div className="window-container">
      <div className="window-content">
        <div className="window-header">
          <h2>Edit Profile</h2>
          <button className="close-window" onClick={onClose}>×</button>
        </div>
        <hr />
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Change password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="photo-section">
          <div className="photo-preview">
            <img 
              src="https://via.placeholder.com/100x100" 
              alt="profile preview" 
            />
          </div>
          <div className="photo-options">
            <button className="upload">+ Upload photo</button>
            <button className="delete">Delete photo</button>
          </div>
        </div>
        <button className="save-changes" onClick={handleSaveChanges}>save changes</button>
      </div>
    </div>
  );
};

export default EditProfileWindow;

/* EditProfile.css */

/* General container styling */
