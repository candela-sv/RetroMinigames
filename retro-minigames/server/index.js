const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Arranca el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
