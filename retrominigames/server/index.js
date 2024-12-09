const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Para generar el token de autenticación

const app = express();
const port = 5000;

// Database configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'retrominigames',
});

app.use(cors());
app.use(express.json());

// Sign up endpoint
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword, profilePicture = 'default.jpg' } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await pool.execute(
      'INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, profilePicture]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error details:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already in use' });
    }

    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email }); // Log intento de login

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Buscar al usuario en la base de datos
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Database query result:', rows); // Log resultado de la query

    if (rows.length === 0) {
      console.log('No user found for this email: ', email); 
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    // Depuración: Mostrar el hash de la contraseña almacenada
    console.log('Stored hash password: ', user.password);

    // Comparar la contraseña proporcionada con la almacenada (hash)
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log('Password mismatch for email: ', email); 
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile_picture: user.profile_picture,
      },
      token,
    });

  } catch (error) {
    console.error('Error details:', error.message);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Welcome!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function validateEmail(email) {
  // Simple email validation regex
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}