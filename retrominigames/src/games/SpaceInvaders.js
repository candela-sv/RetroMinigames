import React, { useEffect, useState, useRef } from 'react';
import '../styles/SpaceInvaders.css';

function SpaceInvaders() {
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null); // Crear una referencia al canvas
  const rightPressed = useRef(false); // Usamos useRef para manejar el estado de las teclas
  const leftPressed = useRef(false);
  const upPressed = useRef(false); // Cambiar spacePressed por upPressed para la flecha hacia arriba

  // Función para iniciar el juego
  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return; // Si el juego no ha comenzado, no hacer nada

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 800;
    const height = canvas.height = 600;

    // Variables del jugador
    let playerX = width / 2 - 25;
    const playerY = height - 50;
    const playerWidth = 50;
    const playerHeight = 30;
    let playerSpeed = 5;

    // Variables de los disparos
    const bulletWidth = 5;
    const bulletHeight = 10;
    let bullets = [];

    // Variables de los enemigos
    const enemyWidth = 50;
    const enemyHeight = 30;
    const enemySpeed = 1;
    let enemies = [];

    // Crear enemigos
    function createEnemies() {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
          enemies.push({ x: j * 60 + 50, y: i * 50 + 30, alive: true });
        }
      }
    }

    // Dibuja al jugador
    function drawPlayer() {
      ctx.fillStyle = 'green';
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }

    // Dibuja los disparos
    function drawBullets() {
      ctx.fillStyle = 'white';
      bullets.forEach((bullet, index) => {
        if (bullet.y <= 0) {
          bullets.splice(index, 1); // Eliminar balas fuera de la pantalla
        } else {
          ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
          bullet.y -= 5; // Velocidad del disparo
        }
      });
    }

    // Dibuja los enemigos
    function drawEnemies() {
      ctx.fillStyle = 'red';
      enemies.forEach((enemy) => {
        if (enemy.alive) {
          ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
        }
      });
    }

    // Movimiento del jugador
    function movePlayer() {
      if (rightPressed.current && playerX < width - playerWidth) {
        playerX += playerSpeed;
      }
      if (leftPressed.current && playerX > 0) {
        playerX -= playerSpeed;
      }
    }

    // Colisiones entre los disparos y los enemigos
    function checkCollisions() {
      bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
          if (
            bullet.x >= enemy.x && 
            bullet.x <= enemy.x + enemyWidth &&
            bullet.y >= enemy.y && 
            bullet.y <= enemy.y + enemyHeight &&
            enemy.alive
          ) {
            enemy.alive = false;
            bullets.splice(bIndex, 1);
          }
        });
      });
    }

    // Mueve los enemigos
    function moveEnemies() {
      enemies.forEach((enemy) => {
        if (enemy.alive) {
          enemy.y += enemySpeed;
        }
      });
    }

    // Dibuja todo
    function draw() {
      ctx.clearRect(0, 0, width, height); // Limpiar el canvas en cada frame
      drawPlayer();
      drawBullets();
      drawEnemies();
      movePlayer();
      checkCollisions();
      moveEnemies();

      requestAnimationFrame(draw);
    }

    // Inicia el juego (crear enemigos y comenzar el ciclo de dibujo)
    createEnemies();
    draw();

    // Funciones para manejo de teclas
    function keyDownHandler(e) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed.current = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed.current = true;
      } else if (e.key === 'ArrowUp' && !upPressed.current) { // Cambiar a ArrowUp
        upPressed.current = true;
        bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY });
      }
    }

    function keyUpHandler(e) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed.current = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed.current = false;
      } else if (e.key === 'ArrowUp') { // Cambiar a ArrowUp
        upPressed.current = false;
      }
    }

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
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
    </div>
  );
}

export default SpaceInvaders;
