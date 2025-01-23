import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header'; // Importamos el Header
import Footer from '../components/Footer'; // Importamos el Footer
import '../styles/SpaceInvaders.css';

const SpaceInvaders = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
  };

  // Lógica para el juego
  useEffect(() => {
    if (gameStarted) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      // Definición de la nave y los invasores
      let spaceship = { x: width / 2 - 20, y: height - 50, width: 40, height: 20 };
      let invaders = [];
      let bullets = [];
      let gameInterval;

      // Configurar los invasores
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
          invaders.push({ x: 70 * j + 50, y: 30 * i + 30, width: 30, height: 30 });
        }
      }

      // Lógica del juego
      const moveInvaders = () => {
        invaders.forEach((invader) => {
          invader.y += 0.5; // Velocidad de los invasores
        });
      };

      const moveBullets = () => {
        bullets.forEach((bullet) => {
          bullet.y -= 5;
        });
        bullets = bullets.filter((bullet) => bullet.y > 0);
      };

      const drawGame = () => {
        ctx.clearRect(0, 0, width, height); // Limpiar el canvas

        // Dibuja la nave
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);

        // Dibuja los invasores
        ctx.fillStyle = '#FF0000';
        invaders.forEach((invader) => {
          ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
        });

        // Dibuja las balas
        ctx.fillStyle = '#FFFF00';
        bullets.forEach((bullet) => {
          ctx.fillRect(bullet.x, bullet.y, 5, 10);
        });

        moveInvaders();
        moveBullets();

        // Detección de colisiones
        invaders = invaders.filter((invader) => {
          return !bullets.some((bullet) => {
            if (
              bullet.x < invader.x + invader.width &&
              bullet.x + 5 > invader.x &&
              bullet.y < invader.y + invader.height &&
              bullet.y + 10 > invader.y
            ) {
              return true; // Colisión detectada
            }
            return false;
          });
        });
      };

      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          spaceship.x -= 5;
        }
        if (e.key === 'ArrowRight') {
          spaceship.x += 5;
        }
        if (e.key === ' ') {
          // Disparar
          bullets.push({ x: spaceship.x + spaceship.width / 2 - 2.5, y: spaceship.y });
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      gameInterval = setInterval(() => {
        drawGame();
      }, 1000 / 60); // 60 FPS

      return () => {
        clearInterval(gameInterval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [gameStarted]);

  return (
    <div className="space-invaders-container">
      <Header /> {/* Header añadido */}

      {!gameStarted ? (
        <div className="game-intro card">
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

      <div className="game-description card">
        <h2 className="game-description-title">GAME DESCRIPTION</h2>
        <p>
          Do you love action-packed arcade games? Play Space Invaders at Retro Minigames! Take control of your laser cannon and defend Earth from waves of descending alien invaders. Test your aim and reflexes in this legendary shooter that has captivated players for generations. Enjoy the excitement of chasing high scores and see how long you can survive in one of the most iconic games in arcade history, available to play now at Retro Minigames!
        </p>
        <p className="game-category">Category: Shooter, Action</p>
      </div>

      <div className="comments-section card">
        <h2>Comments</h2>
        <div className="comments">
        </div>
        <div className="new-comment">
          <input type="text" placeholder="Write your comment here" className="comment-input" />
          <button className="post-button">Post</button>
        </div>
      </div>

      <Footer /> {/* Footer añadido */}
    </div>
  );
};

export default SpaceInvaders;
