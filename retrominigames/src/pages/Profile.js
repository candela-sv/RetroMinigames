import React from 'react';
import { useUser } from '../context/UserContext';
import '../styles/Profile.css';
import myAvatar from '../images/pfp.png';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

function Profile() {
  const { user } = useUser();

  const achievements = [
    {
      id: 1,
      name: '50 Shades of Pink',
      description: 'Place 50 pink pieces in a single game of Tetris.',
      image: 'https://via.placeholder.com/50x50/fc0/fc0.png?text=P',
    },
    {
      id: 2,
      name: 'Alien Exterminator',
      description: 'Destroy 100 alien invaders in a single game.',
      image: 'https://via.placeholder.com/50x50/0f0/0f0.png?text=A',
    },
  ];

  const likedGames = [
    {
      id: 1,
      name: 'Space Invaders',
      rating: '9.4★',
      image: 'https://via.placeholder.com/100x100?text=SI',
    },
    {
      id: 2,
      name: 'Tetris',
      rating: '8.2★',
      image: 'https://via.placeholder.com/100x100?text=T',
    },
  ];

  const points = 0;

  return (
    <div>
      <Header />
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <img
            src={user?.avatar || myAvatar}
            alt="User Avatar"
            className="profile-avatar"
          />
          <span className="profile-username">{user?.username || 'Candela Ackerman'}</span>
        </div>

        {/* Achievements Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">ACHIEVEMENTS · {achievements.length}</h2>
          <div className="profile-achievements">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement">
                <img
                  src={achievement.image}
                  alt={achievement.name}
                  className="achievement-icon"
                />
                <div className="achievement-details">
                  <h3 className="achievement-title">{achievement.name}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liked Games Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">LIKED GAMES · {likedGames.length}</h2>
          <div className="profile-games">
            {likedGames.map((game) => (
              <div key={game.id} className="game">
                <img src={game.image} alt={game.name} className="game-image" />
                <div className="game-details">
                  <h3 className="game-title">{game.name}</h3>
                  <span className="game-rating">{game.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">POINTS · {points}</h2>
          <div className="profile-points">
            <span className="points-value">{points}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
