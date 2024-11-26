const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

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

app.post('/signup', async (req, res) => {
    try {
      const { username, email, password, confirmPassword, profilePicture = 'default.jpg' } = req.body;
  
      // Validate required fields
      if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Validate email format
      if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user into the database
      await pool.execute(
        'INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, profilePicture]
      );
  
      // Send success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error details:', error.message);
  
      // Check for duplicate email error (MySQL specific error code)
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  
  // Login endpoint
  app.post('/login', async (req, res) => {
    // Code for login endpoint
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