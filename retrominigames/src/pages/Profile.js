import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/Profile.css';
import myAvatar from '../images/pfp.png';
import Header from '../components/Header.js';

function Profile() {
  const { user } = useUser();
  const [likedGames, setLikedGames] = useState(user?.likedGames || []);
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([
    { id: 1, name: '50 Shades of Pink', image: 'https://via.placeholder.com/50x50' },
    { id: 2, name: 'Alien Exterminator', image: 'https://via.placeholder.com/50x50' },
  ]);

  const games = [
    { id: 1, name: 'Space Invaders', image: 'https://via.placeholder.com/50x50' },
    { id: 2, name: 'Tetris', image: 'https://via.placeholder.com/50x50' },
  ];

  const handleLikeGame = (gameId) => {
    setLikedGames((prevLikes) => {
      if (prevLikes.includes(gameId)) {
        return prevLikes.filter(id => id !== gameId);
      } else {
        return [...prevLikes, gameId];
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={user?.avatar || myAvatar}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2 className="username">{user?.username || 'Candela Ackerman'}</h2>
        </div>

        <div className="achievements">
          <h3>ACHIEVEMENTS</h3>
          <div className="achievements-list">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-item">
                <img
                  src={achievement.image}
                  alt={achievement.name}
                  className="achievement-image"
                />
                <p className="achievement-name">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="liked-games">
          <h3>LIKED GAMES</h3>
          <div className="games-list">
            {games.map((game) => (
              <div key={game.id} className="game-item">
                <img
                  src={game.image}
                  alt={game.name}
                  className="game-image"
                />
                <p className="game-name">{game.name}</p>
                <button
                  onClick={() => handleLikeGame(game.id)}
                  className={likedGames.includes(game.id) ? 'liked' : 'like-button'}
                >
                  {likedGames.includes(game.id) ? 'Liked' : 'Like'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="points">
          <h3>POINTS</h3>
          <p className="points-value">{points}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;