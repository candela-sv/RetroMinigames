import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header'; // Importamos el Header
import Footer from '../components/Footer'; // Importamos el Footer
import '../styles/Tetris.css';

const Tetris = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
  };

  // Lógica para el juego de Tetris
  useEffect(() => {
    if (gameStarted) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = 300; // Ancho del canvas
      const height = 600; // Alto del canvas
      const rows = 20; // Filas
      const cols = 10; // Columnas
      const blockSize = 30; // Tamaño del bloque

      // Definimos el tablero de juego
      let board = Array.from({ length: rows }, () => Array(cols).fill(null));

      // Las piezas de Tetris y sus colores
      const pieces = [
        { shape: [[1, 1, 1], [null, 1, null]], color: '#FF5733' }, // T
        { shape: [[1, 1, 1, 1]], color: '#33C1FF' }, // I
        { shape: [[1, 1], [1, 1]], color: '#FFDD33' }, // O
        { shape: [[1, 1, null], [null, 1, 1]], color: '#75FF33' }, // S
        { shape: [[null, 1, 1], [1, 1, null]], color: '#FF33A2' }, // Z
        { shape: [[1, null, null], [1, 1, 1]], color: '#33C1FF' }, // L
        { shape: [[null, null, 1], [1, 1, 1]], color: '#FF9F33' }, // J
      ];

      // Estado de la pieza actual
      let currentPiece = null;
      let currentPosition = { x: 4, y: 0 };

      // Función para dibujar el tablero
      const drawBoard = () => {
        ctx.clearRect(0, 0, width, height); // Limpiar el canvas

        // Dibuja las celdas ocupadas
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (board[y][x]) {
              ctx.fillStyle = board[y][x];
              ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
          }
        }

        // Dibuja la pieza actual
        if (currentPiece) {
          currentPiece.shape.forEach((row, yOffset) => {
            row.forEach((block, xOffset) => {
              if (block) {
                ctx.fillStyle = currentPiece.color;
                ctx.fillRect(
                  (currentPosition.x + xOffset) * blockSize,
                  (currentPosition.y + yOffset) * blockSize,
                  blockSize,
                  blockSize
                );
              }
            });
          });
        }
      };

      // Función para manejar la caída de la pieza
      const dropPiece = () => {
        currentPosition.y += 1;

        if (checkCollision()) {
          currentPosition.y -= 1; // Retrocedemos la pieza
          placePiece(); // Colocamos la pieza en el tablero
          currentPiece = generatePiece(); // Generamos una nueva pieza
          currentPosition = { x: 4, y: 0 }; // Reiniciamos la posición
        }
      };

      // Función para verificar si hay colisiones
      const checkCollision = () => {
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
              const newX = currentPosition.x + x;
              const newY = currentPosition.y + y;
              if (newX < 0 || newX >= cols || newY >= rows || board[newY] && board[newY][newX]) {
                return true; // Colisión detectada
              }
            }
          }
        }
        return false;
      };

      // Función para colocar una pieza en el tablero
      const placePiece = () => {
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
              board[currentPosition.y + y][currentPosition.x + x] = currentPiece.color; // Coloca la pieza en el tablero
            }
          }
        }
        clearFullRows(); // Verificar y eliminar filas completas
      };

      // Función para generar una nueva pieza
      const generatePiece = () => {
        const randomIndex = Math.floor(Math.random() * pieces.length);
        return pieces[randomIndex];
      };

      // Función para eliminar filas completas
      const clearFullRows = () => {
        for (let y = rows - 1; y >= 0; y--) {
          if (board[y].every(cell => cell !== null)) {
            board.splice(y, 1);
            board.unshift(Array(cols).fill(null)); // Añadimos una nueva fila vacía arriba
          }
        }
      };

      // Función para mover la pieza a la izquierda
      const moveLeft = () => {
        currentPosition.x -= 1;
        if (checkCollision()) {
          currentPosition.x += 1; // Deshacer el movimiento si hay colisión
        }
      };

      // Función para mover la pieza a la derecha
      const moveRight = () => {
        currentPosition.x += 1;
        if (checkCollision()) {
          currentPosition.x -= 1; // Deshacer el movimiento si hay colisión
        }
      };

      // Función para rotar la pieza
      const rotatePiece = () => {
        const rotatedPiece = currentPiece.shape[0].map((_, index) => currentPiece.shape.map(row => row[index])).reverse();
        const originalPiece = currentPiece;
        currentPiece = { shape: rotatedPiece, color: currentPiece.color };
        if (checkCollision()) {
          currentPiece = originalPiece; // Deshacer la rotación si hay colisión
        }
      };

      // Configurar controles
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          moveLeft();
        }
        if (e.key === 'ArrowRight') {
          moveRight();
        }
        if (e.key === 'ArrowDown') {
          dropPiece();
        }
        if (e.key === 'ArrowUp') {
          rotatePiece();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Iniciar el juego
      currentPiece = generatePiece();
      const gameInterval = setInterval(() => {
        dropPiece();
        drawBoard();
      }, 1000 / 2); // Caída más lenta para las piezas (0.5s por paso)

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
          <h1>Tetris</h1>
          <button className="play-button" onClick={startGame}>
            Play
          </button>
        </div>
      ) : (
        <div className="game-canvas">
          <canvas ref={canvasRef} width="300" height="600"></canvas>
        </div>
      )}

      <div className="game-description card">
        <h2 className="game-description-title">GAME DESCRIPTION</h2>
        <p>
        Do you love fast-paced puzzle games? Play Tetris at Retro Minigames! Stack and rotate falling blocks to clear lines and keep the board from filling up. Test your reflexes and strategy in this timeless classic that has entertained millions of players worldwide. Enjoy the thrill of high scores and see how long you can last in one of the most iconic games ever, available to play now at Retro Minigames!
        </p>
        <p className="game-category">Category: Puzzle, Arcade</p>
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

export default Tetris;
