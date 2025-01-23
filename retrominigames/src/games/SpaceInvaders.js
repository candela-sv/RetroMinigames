import React, { useEffect, useState, useRef } from 'react';
import '../styles/SpaceInvaders.css';

const SpaceInvaders = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null);
  const rightPressed = useRef(false);
  const leftPressed = useRef(false);
  const upPressed = useRef(false);

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    // Lógica del juego
  }, [gameStarted]);

  return (
    <div className="space-invaders-container">
      {!gameStarted ? (
        <div className="game-intro">
          <h1>Space Invaders</h1>
          <button className="play-button" onClick={startGame}>
            Play
          </button>
        </div>
      ) : (
        <div className="game-canvas">
          <canvas ref={canvasRef} width="800" height="600"></canvas>
        </div>
      )}
      <div className="game-description">
        Do you love action-packed arcade games? Play Space Invaders at Retro Minigems! Take control of your laser cannon and defend Earth from waves of descending alien invaders. Test your aim and reflexes in the legendary game that has captivated gamers for generations. Enjoy the excitement of chasing high scores and see how long you can survive in one of the most iconic games in arcade history.
      </div>
      <div className="comments-section">
        <div className="comments">
          <div className="comment">
            <div className="username">Random_username</div>
            <div className="comment-text">Very good game, this one is my favorite of all time.</div>
          </div>
          <div className="comment">
            <div className="username">User4282</div>
            <div className="comment-text">I love shooting the aliens!</div>
          </div>
        </div>
        <div className="new-comment">
          <textarea placeholder="Write your comment here"></textarea>
          <button className="post-button">Post</button>
        </div>
      </div>
    </div>
  );
};

export default SpaceInvaders;